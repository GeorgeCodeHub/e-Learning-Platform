import React, { useEffect } from "react";
import {
	Layout,
	Menu,
	Space,
	Button,
	Switch,
	Divider,
	Form,
	Input,
	Radio,
	message,
} from "antd";
import {
	UserOutlined,
	SettingOutlined,
	InfoCircleOutlined,
	LogoutOutlined,
	KeyOutlined,
	AliwangwangOutlined,
	LeftOutlined,
} from "@ant-design/icons";

//Redux libraries
import { connect } from "react-redux";
import { setUserData, setTypeTheme } from "../../actions/userActions";
import store from "../../store";

import firebaseConfig from "../../utils/fbConfig";
import {
	updateUserDetails,
	updateUserPassword,
} from "../../utils/firebaseActions";

import About from "./About";

import White from "../../utils/White.png";

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

const layout = {
	labelCol: {
		span: 7,
	},
	wrapperCol: {
		span: 11,
	},
};
const tailLayout = {
	labelCol: {
		span: 7,
	},
	wrapperCol: {
		span: 11,
		offset: 7,
	},
};

const UserSettings = ({ userData, triggerReload }) => {
	const [form] = Form.useForm();

	useEffect(() => form.setFieldsValue(userData), [userData, form]);

	const onFinish = (values) => {
		message.success("Your settings have been updated.");
		updateUserDetails(values);

		if (values.dark_mode) localStorage.setItem("TYPE_OF_THEME", "DARK_MODE");
		else localStorage.setItem("TYPE_OF_THEME", "LIGHT_MODE");
	};

	const onFinishFailed = (errorInfo) => {
		message.error("Something went wrong. Please try again later.");
	};

	return (
		<Form
			{...layout}
			form={form}
			name="UserSettings"
			requiredMark={false}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label="First name"
				name="firstName"
				rules={[
					{
						required: true,
						message: "Please don't leave empty.",
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Last name"
				name="lastName"
				rules={[
					{
						required: true,
						message: "Please don't leave empty.",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item name="learner_type" label="Type of learner">
				<Radio.Group buttonStyle="solid">
					<Space size={29}>
						<Radio.Button value="visual">Visual</Radio.Button>
						<Radio.Button value="reading">Reading</Radio.Button>
					</Space>
				</Radio.Group>
			</Form.Item>

			<Form.Item name="dark_mode" label="Dark Mode" valuePropName="checked">
				<Switch />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit" style={{ float: "right" }}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

const ChangePass = () => {
	const onFinish = (values) => {
		if (values.new === values.confirm) {
			updateUserPassword(values.new);
			message.success("New password has been set up.");
		} else message.error("Passwords are not the same.");
	};

	const onFinishFailed = (errorInfo) => {
		message.error("Something went wrong. Try again later.");
	};

	return (
		<Form
			{...layout}
			name="ChangePassword"
			requiredMark={false}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label="New Password"
				name="new"
				rules={[
					{
						required: true,
						message: "Please give a valid password.",
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				label="Confirm Password"
				name="confirm"
				rules={[
					{
						required: true,
						message: "Please give a valid password.",
					},
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit" style={{ float: "right" }}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

class Settings extends React.Component {
	state = { menuKey: "User", reload: false };

	componentDidMount() {
		store.dispatch(setTypeTheme(localStorage.getItem("TYPE_OF_THEME")));
	}

	handleMenu = (e) => {
		this.setState({ menuKey: e.key });
	};

	render() {
		return (
			<Layout>
				<Sider
					trigger={null}
					theme={this.props.typeTheme === "DARK_MODE" ? null : "light"}
				>
					<h3 className="logo">
						<img src={White} alt="" style={{ width: 30 }} />
						Guide
					</h3>
					<Menu
						mode="inline"
						onClick={this.handleMenu}
						selectedKeys={[this.state.menuKey]}
					>
						<Menu.Item key="User" icon={<AliwangwangOutlined />}>
							Change User Settings
						</Menu.Item>
						<Menu.Item key="Password" icon={<KeyOutlined />}>
							Change Password
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header
						className={
							this.props.typeTheme === "DARK_MODE"
								? "site-layout-header-dark"
								: "site-layout-header"
						}
					>
						<Menu mode="horizontal" style={{ float: "right", marginRight: 24 }}>
							<SubMenu
								icon={<UserOutlined />}
								title={this.props.userData.firstName}
							>
								<Menu.Item
									key="Setings"
									icon={<SettingOutlined />}
									onClick={() => {
										this.props.history.push("/settings");
									}}
								>
									Settings
								</Menu.Item>
								<Menu.Item
									key="About"
									onClick={About}
									icon={<InfoCircleOutlined />}
								>
									About
								</Menu.Item>
								<Menu.Item
									key="SignOut"
									icon={<LogoutOutlined />}
									onClick={() => {
										firebaseConfig.auth().signOut();
									}}
								>
									Sign out
								</Menu.Item>
							</SubMenu>
						</Menu>
					</Header>
					<Content
						className={
							this.props.typeTheme === "DARK_MODE"
								? "site-layout-content-dark"
								: "site-layout-content"
						}
					>
						<div
							className={
								this.props.typeTheme === "DARK_MODE"
									? "site-layout-background-dark"
									: "site-layout-background"
							}
						>
							<Button
								type="dashed"
								onClick={() => {
									this.props.history.push("/home");
								}}
							>
								<LeftOutlined /> Go Back
							</Button>
							<Divider />

							{this.state.menuKey === "User" ? (
								<UserSettings userData={this.props.userData} />
							) : (
								<ChangePass />
							)}
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

//Used to get state from global store
const mapStateToProps = (state) => {
	return {
		typeTheme: state.userReducer.typeTheme,
		userData: state.userReducer.userData,
	};
};

export default connect(mapStateToProps, {
	setTypeTheme,
	setUserData,
})(Settings);
