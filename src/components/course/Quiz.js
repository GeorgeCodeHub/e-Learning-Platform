import React from "react";
import {
	Form,
	Radio,
	Button,
	Space,
	Divider,
	Statistic,
	Popconfirm,
	Typography 
} from "antd";

//Redux libraries
import { connect } from "react-redux";
import {
	setUserData,
	setMenuKey,
	setTypeTheme,
} from "../../actions/userActions";

import { firestore } from "../../utils/fbConfig";
import { updateUserDetails } from "../../utils/firebaseActions";

import { success, warning, error } from "../../utils/modalWindows";

const { Title,Text } = Typography;

const { Countdown } = Statistic;

const QuizQuestions = ({ questions, onFinish }) => {
	const [form] = Form.useForm();

	const renderQuiz = () => {
		return (
			<>
				{questions.map(function (object, i) {
				
					return (
						<Form.Item
							name={object.questionId}
							label={<Title level={4}>{object.question}</Title>}
							key={i}
							rules={[
								{
									required: true,
									message: "You forgot to answer this question.",
								},
							]}
						>
							<Radio.Group buttonStyle="solid">
								<Space size="small" direction="vertical">
									{object.answers.map((item) => (
										<Radio.Button value={item} key={item}>
											{item}
										</Radio.Button>
									))}
								</Space>
							</Radio.Group>
						</Form.Item>
					);
				})}
			</>
		);
	};

	return (
		<Form
			name="Quiz1"
			layout="vertical"
			form={form}
			onFinish={onFinish}
			requiredMark={false}
		>
			{renderQuiz()}
			<Form.Item>
				<Button type="primary" htmlType="submit" style={{ float: "right" }}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

class Quiz extends React.Component {
	state = {
		visible: false,
		questions: [],
		deadline: 0,
		time_remaining: null,
		attempts: null,
		last_attempt: null
	};

	async componentDidMount() {
			await firestore
				.collection(this.props.dataCollection)
				.get()
				.then((dataRef) => {
					this.setState({
						questions: dataRef.docs.map((doc) => doc.data()),
					});

					if ("quiz1" in this.props.updatedStats) {
						this.calculateTimeLimit(this.props.userData.quiz1_attempts, this.props.userData.quiz1_last_attempt)
					}
					if ("quiz2" in this.props.updatedStats) {
						this.calculateTimeLimit(this.props.userData.quiz2_attempts, this.props.userData.quiz2_last_attempt)
					}
					if ("quiz3" in this.props.updatedStats) {
						this.calculateTimeLimit(this.props.userData.quiz3_attempts, this.props.userData.quiz3_last_attempt)
					}

					var resetScrollPosition = document.getElementById("site-content");
					resetScrollPosition.scrollTop = 0;
				})
				.catch(() => {});
			return () => {
				this.setState({
					questions: [],
				});
			};
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.visible !== prevState.visible)
		this.calculateTimeLimit(this.state.attempts, this.state.last_attempt)
	}

	calculateTimeLimit = (attempts, last_attempt) => {
		var currentTime = Date.now();

		var difference = last_attempt - currentTime

		if(difference < 0)
		{
			if ("quiz1" in this.props.updatedStats) updateUserDetails({quiz1_attempts: 3, quiz1_last_attempt: Date.now()})
			if ("quiz2" in this.props.updatedStats) updateUserDetails({quiz2_attempts: 3, quiz2_last_attempt: Date.now()})
			if ("quiz3" in this.props.updatedStats) updateUserDetails({quiz3_attempts: 3, quiz3_last_attempt: Date.now()})
		}

		this.setState({time_remaining: last_attempt + difference, attempts: attempts, last_attempt: last_attempt })

	}

	startQuiz = () => {
		this.setState({
			visible: true,
			deadline: Date.now() + 900000,
			questions: this.state.questions.sort(() => 0.5 - Math.random()).slice(0, 10)
		});

		var updated_attempt = this.props.updated_attempt

		if ("quiz1" in this.props.updatedStats) {
			updated_attempt.quiz1_last_attempt = Date.now()  + 1000 * 60 * 60 * 4;
			updated_attempt.quiz1_attempts = this.state.attempts - 1 
			this.setState({ attempts: updated_attempt.quiz1_attempts, last_attempt: updated_attempt.quiz1_last_attempt })
			updateUserDetails(updated_attempt)
		}
		else if ("quiz2" in this.props.updatedStats) {
			updated_attempt.quiz2_last_attempt = Date.now()  + 1000 * 60 * 60 * 4;
			updated_attempt.quiz2_attempts = this.state.attempts - 1 
			this.setState({ attempts: updated_attempt.quiz2_attempts, last_attempt: updated_attempt.quiz2_last_attempt })
			updateUserDetails(updated_attempt)
			}
		else if ("quiz3" in this.props.updatedStats) {
			updated_attempt.quiz3_last_attempt = Date.now()  + 1000 * 60 * 60 * 4;
			updated_attempt.quiz3_attempts = this.state.attempts - 1 
			this.setState({ attempts: updated_attempt.quiz3_attempts, last_attempt: updated_attempt.quiz3_last_attempt })
			updateUserDetails(updated_attempt)
			}
		else console.log("error");
		
	};

	onFinish = (answers) => {
		var chaptersRevision = [];
		var correctAnswers = 0;

		this.state.questions.forEach((item) =>{
			if(item.correct === answers[item.questionId])
			correctAnswers++;
			else
			chaptersRevision.push(item.fromChapter);
		})
		chaptersRevision = [...new Set(chaptersRevision)];

		this.setState({ visible: false });
		if (correctAnswers >= 7) {
			var updatedStats = this.props.updatedStats;

			if ("quiz1" in updatedStats) updatedStats.quiz1 = correctAnswers;
			else if ("quiz2" in updatedStats) updatedStats.quiz2 = correctAnswers;
			else if ("quiz3" in updatedStats) updatedStats.quiz3 = correctAnswers;
			else console.log("error");

			var successMessage = `Congratulations you scored ${correctAnswers}/10!`;
			if (chaptersRevision.length) {
				var revisionText = ` If you want to get a higher score revision ${chaptersRevision.toString()}.`;
				successMessage = successMessage.concat(revisionText);
			}

			success(successMessage);
			this.props.trackerNavProg(this.props.nextKey, updatedStats);
		} else
			warning(
				`You only scored ${correctAnswers}/10. Try to revision ${chaptersRevision.toString()}.`
			);
	};

	render() {
		return (
			<>
				{!this.state.visible ? (
					<Space direction="vertical">
						<Title level={2}>
									{this.props.title}
						</Title>
						<Text>
							Whenever you are ready to start the quiz click the button below.
							You have 15 minutes to answer 10 questions related to the previous
							chapters.
						</Text>
						<p>
						<Text strong>
								In order to pass the test you must answer 7/10 questions
								correct.
							</Text>
							
						</p>
						<p>
							<Text strong>You have {this.state.attempts}/3 attempts. </Text>
						</p>
						{this.state.attempts === 0 ? <Text strong>You can try again in <Countdown value={this.state.time_remaining}/></Text>:<></>}
						{this.props.quiz ? (
							<p>
								<Text strong>Your current score is: {this.props.quiz}/10</Text>
							</p>
						) : (
							<></>
						)}
						<Button type="primary" onClick={this.startQuiz} disabled={this.state.attempts === 0}>
							Start
						</Button>
					</Space>
				) : (
					<div>
						<Popconfirm
							title="Are you sure you want to cancel?"
							placement="right"
							onConfirm={() => {
								this.setState({ visible: false });
							}}
							okText="Yes"
							cancelText="No"
						>
							<Button>Cancel</Button>
						</Popconfirm>
						<Countdown
							value={this.state.deadline}
							format="mm:ss"
							style={{ float: "right" }}
							onFinish={() => {
								this.setState({ visible: false });
								error("Time out", "You ran out of time! Try again.");
							}}
						/>
						<Divider />
						<QuizQuestions
							questions={this.state.questions}
							onFinish={this.onFinish}
						/>
					</div>
				)}
			</>
		);
	}
}

//Used to get state from global store
const mapStateToProps = (state) => {
	return {
		typeTheme: state.userReducer.typeTheme,
		userData: state.userReducer.userData,
		menuKey: state.userReducer.menuKey,
	};
};

export default connect(mapStateToProps, {
	setTypeTheme,
	setUserData,
	setMenuKey,
})(Quiz);
