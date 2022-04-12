import React, { useCallback } from "react";

import { Form, Input, Button, Card, Layout, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { Link, withRouter } from "react-router-dom";
import firebaseConfig from "../../utils/fbConfig";

import { success } from "../../utils/modalWindows";

import Blue from "../../utils/Blue.png";

const { Header, Content } = Layout;

const { Title } = Typography;

function ForgotPassword({ history }) {
	const [form] = Form.useForm();

	const onFinish = useCallback(
		async (event) => {
			const { email } = event;

			try {
				await firebaseConfig
					.auth()
					.sendPasswordResetEmail(email)
					.then(() => {
						//create custom list of users
						form.resetFields();
						success("A mail has been sent. Check your inbox!");
						history.push("/");
					})
					.catch((error) => {
						message.error("Something went wrong. Try again later!");
					});
			} catch (error) {
				message.error("Invalid inputs.");
			}
		},
		[form, history]
	);

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
				<Card title="Forgot your password?" className="login-card">
					<Form
						name="normal_forgot_password"
						className="login-form"
						layout="vertical"
						requiredMark={false}
						form={form}
						onFinish={onFinish}
					>
						<Form.Item
							label="Please give your e-mail below."
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
						<Form.Item>
							<Link to="/">Go back</Link>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Content>
		</Layout>
	);
}

export default withRouter(ForgotPassword);
