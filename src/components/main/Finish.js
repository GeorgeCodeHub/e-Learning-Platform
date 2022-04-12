import React from "react";
import { Typography } from "antd";

import SinglePage from "./printComponents/SinglePage";
import PrintButton from "./printComponents/PrintButton";

const { Title } = Typography;

function Finish(props) {
	const updateTrack = () => {
		props.trackerNavProg(props.nextKey, props.updatedStats)
	}
	return (
		<div className="course-finish">
			<Title>
				Congratulations! You have completed the Mastering Communication Skills
				course.
			</Title>
			<p>Your current average score is {props.averageScore}/10</p>
			{props.averageScore < 10 ? (
				<p>
					You can still try to earn a higher score before getting your
					certificate. (Note: Your score is visible to your certificate!)
				</p>
			) : (
				<Title level={3}>
					You got the best score possible! Click below to get your certificate.
				</Title>
			)}
			{/* <Button
				type="primary"
				onClick={() => props.trackerNavProg(props.nextKey, props.updatedStats)}
			>
				Print
			</Button> */}
			<PrintButton id={"singlePage"} label={"Print single page"} updateTrack={updateTrack}/>
			<div style={{borderStyle: "solid"}}>
  			<SinglePage id={"singlePage"} userData={props.userData} score={props.averageScore}/>
			  </div>
		</div>
	);
}

export default Finish;
