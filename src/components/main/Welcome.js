import React, { useState, useEffect } from "react";
import { Button, Typography, Image, Space, Spin } from "antd";
import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";

import { firestore } from "../../utils/fbConfig";

import ReactPlayer from "react-player";

const { Title, Text } = Typography;

function Welcome(props) {
	const [courseData, setCourseData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			await firestore
				.collection(props.dataCollection)
				.get()
				.then((dataRef) => {
					setCourseData(dataRef.docs.map((doc) => doc.data()));
				})
				.catch(() => {});
			return () => {
				setCourseData([]);
			};
		};
		getData();
	}, [props.dataCollection]);

	const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

	if (!courseData.length)
		return (
			<div
				style={{
					textAlign: "center",
				}}
			>
				<Spin indicator={antIcon} />
				<br />
				Loading...
			</div>
		);

	return (
		<div className="course-welcome">
			<Space direction="vertical" size={30}>
				{courseData.map((item, index) => {
					switch (item.type) {
						case "title":
							return (
								<Title key={index} level={2}>
									{item.content}
								</Title>
							);
						case "text":
							if (
								props.userData.learner_type === "visual" ||
								props.userData.learner_type === "reading"
							)
								return <Text key={index}>{item.content}</Text>;
							else return null;
						case "bold":
							if (
								props.userData.learner_type === "visual" ||
								props.userData.learner_type === "reading"
							)
								return (
									<Title level={5} key={index}>
										{item.content}
									</Title>
								);
							else return null;
						case "image":
							if (
								props.userData.learner_type === "visual" ||
								props.userData.learner_type === "kinesthetic" ||
								props.userData.learner_type === "reading"
							) {
								return (
									<div key={index}>
										<Image
											src={require(`../course/Images/${item.content}`)}
											style={{ maxWidth: "100%" }}
										/>
										<br />
										<Text type="secondary">{item.description}</Text>
									</div>
								);
							} else return null;
						case "video":
							if (
								props.userData.learner_type === "auditory" ||
								props.userData.learner_type === "visual" ||
								props.userData.learner_type === "kinesthetic"
							)
								return (
									<ReactPlayer
										key={index}
										url={item.content}
										controls={true}
										stopOnUnmount={true}
									/>
								);
							else return null;
						default:
							return null;
					}
				})}
				<Button
					type="primary"
					onClick={() =>
						props.trackerNavProg(props.nextKey, props.updatedStats)
					}
				>
					{props.userData.progress < props.updatedStats.progress ? (
						<>Begin</>
					) : (
						<>
							Completed <CheckCircleFilled style={{ color: "#2ce16a" }} />
						</>
					)}
				</Button>
			</Space>
		</div>
	);
}

export default Welcome;
