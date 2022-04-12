import React from "react";

import { Layout, Menu, Progress } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	BookOutlined,
	AliwangwangOutlined,
	FlagOutlined,
	UserOutlined,
	CheckCircleFilled,
	SettingOutlined,
	InfoCircleOutlined,
	LogoutOutlined,
} from "@ant-design/icons";

//Redux libraries
import { connect } from "react-redux";
import {
	setUserData,
	setMenuKey,
	setTypeTheme,
} from "../../actions/userActions";
import store from "../../store";

import firebaseConfig from "../../utils/fbConfig";
import { updateUserDetails } from "../../utils/firebaseActions";

import About from "../user/About";

import Welcome from "./Welcome";
import Lesson from "../course/Lesson";
import Quiz from "../course/Quiz";
import Finish from "./Finish";

import White from "../../utils/White.png";

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

class MainPage extends React.Component {
	state = {
		collapsed: false,
		openKeys: ["sub1"],
	};

	rootSubMenuKeys = ["sub1", "sub2", "sub3", "sub4"];

	componentDidMount() {
		var menuKey = localStorage.getItem("lastMenuKey");
		var menuOpen = localStorage.getItem("lastMenuOpen");
		store.dispatch(setTypeTheme(localStorage.getItem("TYPE_OF_THEME")));

		if (menuKey && menuOpen) {
			store.dispatch(setMenuKey(menuKey));
			this.setState({ openKeys: [menuOpen] });
		} else store.dispatch(setMenuKey("sub0"));
	}

	onOpenChange = (openKeys) => {
		const latestOpenKey = openKeys.find(
			(key) => this.state.openKeys.indexOf(key) === -1
		);
		if (this.rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	};

	trackerNavProg = (key, update) => {
		if (key < 16) {
			localStorage.setItem("lastMenuOpen", "sub1");
			this.setState({
				openKeys: ["sub1"],
			});
		} else if (key < 25) {
			localStorage.setItem("lastMenuOpen", "sub2");
			this.setState({
				openKeys: ["sub2"],
			});
		} else if (key < 35) {
			localStorage.setItem("lastMenuOpen", "sub3");
			this.setState({
				openKeys: ["sub3"],
			});
		}

		if (this.props.userData.progress < update.progress)
			updateUserDetails(update);
		else if (update.quiz1 || update.quiz2 || update.quiz3 || update.quiz4) {
			if (update.progress < this.props.userData.progress)
				update.progress = this.props.userData.progress;
			updateUserDetails(update);
		}

		localStorage.setItem("lastMenuKey", key);

		store.dispatch(setMenuKey(key));
	};

	handleUserMenu = (e) => {
		switch (e.key) {
			case "SignOut":
				firebaseConfig.auth().signOut();
				break;
			default:
				break;
		}
	};

	renderCurrentView = () => {
		switch (this.props.menuKey) {
			case "sub0":
				return (
					<Welcome
						dataCollection={"course_welcome"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 7 }}
						nextKey="11"
					/>
				);
			case "11":
				return (
					<Lesson
						dataCollection={"course_lesson1_1"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 14 }}
						nextKey="12"
					/>
				);
			case "12":
				return (
					<Lesson
						dataCollection={"course_lesson1_2"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 21 }}
						nextKey="13"
					/>
				);
			case "13":
				return (
					<Lesson
						dataCollection={"course_lesson1_3"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 28 }}
						nextKey="14"
					/>
				);
			case "14":
				return (
					<Lesson
						dataCollection={"course_lesson1_4"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 35 }}
						nextKey="15"
					/>
				);
			case "15":
				return (
					<Quiz
						dataCollection={"course_quiz1"}
						title="Quiz 1"
						updated_attempt={{quiz1_last_attempt: 0,quiz1_attempts: 0}}
						quiz={this.props.userData.quiz1}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 42, quiz1: 0 }}
						nextKey="21"
					/>
				);
			case "21":
				return (
					<Lesson
						dataCollection={"course_lesson2_1"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 49 }}
						nextKey="22"
					/>
				);
			case "22":
				return (
					<Lesson
						dataCollection={"course_lesson2_2"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 56 }}
						nextKey="23"
					/>
				);
			case "23":
				return (
					<Lesson
						dataCollection={"course_lesson2_3"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 63 }}
						nextKey="24"
					/>
				);
			case "24":
				return (
					<Quiz
						dataCollection={"course_quiz2"}
						title="Quiz 2"
						updated_attempt={{quiz2_last_attempt: 0,quiz2_attempts: 0}}
						quiz={this.props.userData.quiz2}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 70, quiz2: 0 }}
						nextKey="31"
					/>
				);
			case "31":
				return (
					<Lesson
						dataCollection={"course_lesson3_1"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 77 }}
						nextKey="32"
					/>
				);
			case "32":
				return (
					<Lesson
						dataCollection={"course_lesson3_2"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 85 }}
						nextKey="33"
					/>
				);
			case "33":
				return (
					<Lesson
						dataCollection={"course_lesson3_3"}
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 92 }}
						nextKey="34"
					/>
				);
			case "34":
				return (
					<Quiz
						dataCollection={"course_quiz3"}
						title="Quiz 3"
						updated_attempt={{quiz3_last_attempt: 0,quiz3_attempts: 0}}
						quiz={this.props.userData.quiz3}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 99, quiz3: 0 }}
						nextKey="sub4"
					/>
				);

			case "sub4":
				var avgScore =
					(this.props.userData.quiz1 +
						this.props.userData.quiz2 +
						this.props.userData.quiz3) /
					3;
				return (
					<Finish
						userData={this.props.userData}
						trackerNavProg={this.trackerNavProg}
						updatedStats={{ progress: 100 }}
						averageScore={avgScore.toFixed(2)}
						nextKey="sub4"
					/>
				);
			default:
				return <>Oops looks like you ended up somewhere you shouldn't be.</>;
		}
	};

	renderCompletedIcon = (condition) => {
		if (this.props.userData.progress >= condition)
			return <CheckCircleFilled style={{ color: "#2ce16a" }} />;
		else return <></>;
	};

	renderCompletedQuiz = (condition) => {
		if (condition >= 7)
			return <CheckCircleFilled style={{ color: "#2ce16a" }} />;
		else return <></>;
	};

	toggle = () => {
		this.setState({
			openKeys: [],
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<Layout>
				<Sider
					trigger={null}
					theme={this.props.typeTheme === "DARK_MODE" ? null : "light"}
					collapsible
					collapsed={this.state.collapsed}
				>
					<h3 className="logo">
						<img src={White} alt="" style={{ width: 30 }} />
						{this.state.collapsed ? "" : "Guide"}
					</h3>
					<Menu
						mode="inline"
						selectedKeys={this.props.menuKey}
						openKeys={this.state.openKeys}
						onOpenChange={this.onOpenChange}
						onClick={(e) => {
							store.dispatch(setMenuKey(e.key));
						}}
					>
						<Menu.Item key="sub0" icon={<AliwangwangOutlined />}>
							Welcome {this.renderCompletedIcon(7)}
						</Menu.Item>
						<SubMenu
							key="sub1"
							icon={<BookOutlined />}
							title={
								<>
									Lesson 1 {this.renderCompletedQuiz(this.props.userData.quiz1)}
								</>
							}
							disabled={this.props.userData.progress >= 0 ? false : true}
						>
							<Menu.Item key="11">
								Chapter 1 {this.renderCompletedIcon(14)}
							</Menu.Item>
							<Menu.Item key="12">
								Chapter 2 {this.renderCompletedIcon(21)}
							</Menu.Item>
							<Menu.Item key="13">
								Chapter 3 {this.renderCompletedIcon(28)}
							</Menu.Item>
							<Menu.Item key="14">
								Chapter 4 {this.renderCompletedIcon(35)}
							</Menu.Item>
							<Menu.Item
								key="15"
								disabled={this.props.userData.progress >= 35 ? false : true}
							>
								Quiz 1 {this.renderCompletedQuiz(this.props.userData.quiz1)}
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							icon={<BookOutlined />}
							title={
								<>
									Lesson 2 {this.renderCompletedQuiz(this.props.userData.quiz2)}
								</>
							}
							disabled={this.props.userData.progress >= 42 ? false : true}
						>
							<Menu.Item key="21">
								Chapter 1 {this.renderCompletedIcon(49)}
							</Menu.Item>
							<Menu.Item key="22">
								Chapter 2 {this.renderCompletedIcon(56)}
							</Menu.Item>
							<Menu.Item key="23">
								Chapter 3 {this.renderCompletedIcon(63)}
							</Menu.Item>
							<Menu.Item
								key="24"
								disabled={this.props.userData.progress >= 63 ? false : true}
							>
								Quiz 2 {this.renderCompletedQuiz(this.props.userData.quiz2)}
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub3"
							icon={<BookOutlined />}
							title={
								<>
									Lesson 3 {this.renderCompletedQuiz(this.props.userData.quiz3)}
								</>
							}
							disabled={this.props.userData.progress >= 70 ? false : true}
						>
							<Menu.Item key="31">
								Chapter 1 {this.renderCompletedIcon(77)}
							</Menu.Item>
							<Menu.Item key="32">
								Chapter 2 {this.renderCompletedIcon(85)}
							</Menu.Item>
							<Menu.Item key="33">
								Chapter 3 {this.renderCompletedIcon(92)}
							</Menu.Item>
							<Menu.Item
								key="34"
								disabled={this.props.userData.progress >= 92 ? false : true}
							>
								Quiz 3 {this.renderCompletedQuiz(this.props.userData.quiz3)}
							</Menu.Item>
						</SubMenu>
						<Menu.Item
							key="sub4"
							icon={<FlagOutlined />}
							disabled={this.props.userData.progress >= 99 ? false : true}
						>
							Finish Line {this.renderCompletedIcon(100)}
						</Menu.Item>
					</Menu>
					<div style={{position:"absolute", bottom: 20, width:"100%", textAlign:"center"}}>{this.state.collapsed ? <>{this.props.userData.progress}%</>:<>Progress: <Progress steps={9} percent={this.props.userData.progress} width={50} /></>}</div>
				</Sider>
				<Layout className="site-layout">
					<Header
						className={
							this.props.typeTheme === "DARK_MODE"
								? "site-layout-header-dark"
								: "site-layout-header"
						}
					>
						{React.createElement(
							this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: "trigger",
								onClick: this.toggle,
							}
						)}
						
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
						id="site-content"
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
							{this.renderCurrentView()}
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
		menuKey: state.userReducer.menuKey,
	};
};

export default connect(mapStateToProps, {
	setTypeTheme,
	setUserData,
	setMenuKey,
})(MainPage);
