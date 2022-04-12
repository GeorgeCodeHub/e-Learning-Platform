import React, { useEffect, useCallback, useContext } from "react";

import {
	Form,
	Input,
	Button,
	Typography,
	Checkbox,
	Card,
	Layout,
	message,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { Link, Redirect } from "react-router-dom";

import { AuthContext } from "../../utils/auth";
import firebaseConfig from "../../utils/fbConfig";

import Blue from "../../utils/Blue.png";

const { Header, Content } = Layout;

const { Title } = Typography;

function Login({ history }) {
	const [form] = Form.useForm();

	useEffect(() => {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user) form.setFieldsValue(user);
	}, [form]);

	const onFinish = useCallback(
		async (event) => {
			const { email, password, remember } = event;

			try {
				await firebaseConfig.auth().signInWithEmailAndPassword(email, password);

				if (remember)
					localStorage.setItem("user", JSON.stringify({ email, password }));

				form.resetFields();
				history.push("/home");
				message.success("Logged in successfully!");
			} catch (error) {
				message.error("Invalid inputs.");
			}
		},
		[history, form]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/home" />;
	}

	const textStye = {
		width: "75%",
		margin: "auto",
		textAlign: "center",
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
				<br />
				<Title level={3} style={{ textAlign: "center" }}>
					Welcome to the Mastering Communication Skills course.
				</Title>
				<p style={textStye}>
					In this course you will be able to learn how to comprehend verbal and
					nonverbal signals from your peers both in your personal and
					professional environments. More specifically, subjects such as
					body-language, project-presentation and word strategy in conversations
					will be explored. Log in below to begin!
				</p>
				<Card title="Login" className="login-card">
					<Form
						name="normal_login"
						className="login-form"
						form={form}
						onFinish={onFinish}
					>
						<Form.Item
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your Email!",
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
									message: "Please input your Password!",
								},
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item>
							<Form.Item name="remember" valuePropName="checked" noStyle>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Link to="/reset" className="login-form-forgot">
								Forgot password
							</Link>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								Log in
							</Button>
						</Form.Item>
						Or <Link to="/register">Register</Link>
					</Form>
				</Card>
			</Content>
		</Layout>
	);
}

export default Login;
