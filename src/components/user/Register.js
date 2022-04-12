import React, { useState, useCallback } from "react";

import {
	Form,
	Input,
	Radio,
	Button,
	Card,
	Layout,
	Typography,
	Space,
	message,
	Modal,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { Link, withRouter } from "react-router-dom";
import firebaseConfig, { firestore } from "../../utils/fbConfig";
import { updateUserDetails } from "../../utils/firebaseActions";

import Blue from "../../utils/Blue.png";

const { Header, Content } = Layout;

const { Title } = Typography;

const OptimizeForm = ({ questions, visible, onSave, onCancel }) => {
	const [form] = Form.useForm();

	return (
		<Modal
			visible={visible}
			title="Before you begin"
			okText="Submit"
			cancelText="Dismiss"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onSave(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<p>
				Please answer the questions below. They will adjust the application to
				your current knowledge.
			</p>
			<Form form={form} layout="vertical" name="form_in_modal">
				{questions.map(function (object, i) {
					return (
						<Form.Item
							name={object.questionId}
							label={object.question}
							key={i}
							rules={[
								{
									required: true,
									message: "You forgot to answer this question.",
								},
							]}
						>
							<Radio.Group buttonStyle="solid" key={i}>
								<Space size="large">
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
			</Form>
		</Modal>
	);
};

function Register({ history }) {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [questions] = useState(qBank);

	const onFinish = useCallback(
		async (event) => {
			if (event.password === event.confirm) {
				const { firstName, lastName, email, password } = event;

				try {
					await firebaseConfig
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then(() => {
							//create custom list of users
							firestore
								.collection("users")
								.doc(firebaseConfig.auth().currentUser.uid)
								.set({
									firstName: firstName,
									lastName: lastName,
									email: email,
									learner_type: "visual",
									dark_mode: false,
									progress: 0,
									quiz1: 0,
									quiz1_attempts: 3,
									quiz1_last_attempt: 0,
									quiz2: 0,
									quiz2_attempts: 3,
									quiz2_last_attempt: 0,
									quiz3: 0,
									quiz3_attempts: 3,
									quiz3_last_attempt: 0,
								})
								.catch((error) => {
									console.log(
										"Something went wrong with added user to firestore: ",
										error
									);
								});
						});
					form.resetFields();
					setVisible(true);
				} catch (error) {
					message.error("Email already exists.");
				}
			} else {
				message.error("Passwords do not match.");
			}
		},
		[form]
	);

	const onSave = (values) => {
		var answers = Object.values(values);
		var correctAnswers = 0;
		for (var i = 0; i < questions.length - 1; i++) {
			if (questions[i].correct === answers[i]) correctAnswers++;
		}

		var updatedStats = {
			progress: correctAnswers * 25,
			learner_type: answers[4],
		};

		updateUserDetails(updatedStats);
		message.success("Your account has been created!");
		setVisible(false);
		history.push("/");
	};

	const onCancel = () => {
		setVisible(false);
		message.success("Your account has been created!");
		history.push("/");
	};

	const mode = localStorage.getItem("TYPE_OF_THEME");

	return (
		<Layout className="site-layout">
			<Header
				className={
					mode === "DARK_MODE"
						? "site-layout-header-dark"
						: "site-layout-header"
				}
			>
				<Title style={{ textAlign: "center", color: "#1890ff" }}>
					<img src={Blue} alt="" style={{ width: 60 }} />
					Knowledge Seekers
				</Title>
			</Header>
			<Content
				className={
					mode === "DARK_MODE"
						? "site-layout-content-login-dark"
						: "site-layout-content-login"
				}
			>
				<Card title="Register" className="login-card">
					<Form
						name="normal_register"
						className="login-form"
						form={form}
						onFinish={onFinish}
					>
						<Form.Item
							name="firstName"
							rules={[
								{
									required: true,
									message: "This field is required!",
								},
							]}
						>
							<Input placeholder="First Name" />
						</Form.Item>
						<Form.Item
							name="lastName"
							rules={[
								{
									required: true,
									message: "This field is required!",
								},
							]}
						>
							<Input placeholder="Last Name" />
						</Form.Item>
						<Form.Item
							name="email"
							rules={[
								{
									type: "email",
									required: true,
									message: "Please input a valid E-mail!",
								},
							]}
						>
							<Input
								prefix={<MailOutlined className="site-form-item-icon" />}
								placeholder="E-mail"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "This field is required!",
								},
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item
							name="confirm"
							rules={[
								{
									required: true,
									message: "This field is required!",
								},
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Confirm"
							/>
						</Form.Item>
						<Form.Item>
							<Link to="/">Go back</Link>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								Register
							</Button>
						</Form.Item>
					</Form>
				</Card>
				<OptimizeForm
					questions={questions}
					visible={visible}
					onSave={onSave}
					onCancel={onCancel}
				/>
			</Content>
		</Layout>
	);
}

export default withRouter(Register);

const qBank = [
	{
		question: "Is the following statement true: “Hands clenched in center position reveals a high level of frustration from an individual.”",
		answers: ["True", "False"],
		correct: "True",

		questionId: 0
	},
	{
		question: "Is the following statement true: “In a game of poker the player wearing dark glasses has a lower chance of winning than one without glasses.”",
		answers: ["True", "False"],
		correct: "False",
		questionId: 1
	},
	{
		question: "Is the following statement true: “If you are surrounded by miserable, unhappy people you are also likely to mirror their expressions and become morose or depressed.”",
		answers: ["True", "False"],
		correct: "True",
		questionId: 2
	},
	{
		question: "The way to get things done is to stimulate competition and have a price of high value as a price.",
		answers: ["True", "False"],
		correct: "False",
			
		questionId: 3
	},
	{
		question: "What type of learner are you?",
		answers: ["visual", "reading"],
		questionId: 4,
	},
];
