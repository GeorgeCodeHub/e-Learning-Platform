import React from "react";
import "./App.css";
import "./App-dark.css";

import ProtectedRoute from "../utils/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./user/Login";
import Register from "./user/Register";
import ForgotPassword from "./user/ForgotPassword";
import Settings from "./user/Settings";
import MainPage from "./main/MainPage";

import { AuthProvider } from "../utils/auth";

//Import Redux Store
import { Provider } from "react-redux";
import store from "../store";

import { TYPE_OF_THEME } from "../themes/enum";

const LightTheme = React.lazy(() => import("../themes/lightTheme"));
const DarkTheme = React.lazy(() => import("../themes/darkTheme"));

const ThemeSelector = ({ children }) => {
	const CHOSEN_THEME =
		localStorage.getItem("TYPE_OF_THEME") || TYPE_OF_THEME.DEFAULT;
	return (
		<>
			<React.Suspense fallback={<></>}>
				{CHOSEN_THEME === TYPE_OF_THEME.LIGHT_MODE ? <LightTheme /> : null}
				{CHOSEN_THEME === TYPE_OF_THEME.DARK_MODE ? <DarkTheme /> : null}
			</React.Suspense>
			{children}
		</>
	);
};

class App extends React.Component {
	render() {
		return (
			<ThemeSelector>
				<Provider store={store}>
					<AuthProvider>
						<Router>
							<div className="App">
								<Switch>
									<Route exact path="/" component={Login} />
									<Route exact path="/reset" component={ForgotPassword} />
									<Route exact path="/register" component={Register} />

									<ProtectedRoute path="/settings" component={Settings} />

									<ProtectedRoute path="/home" component={MainPage} />
								</Switch>
							</div>
						</Router>
					</AuthProvider>
				</Provider>
			</ThemeSelector>
		);
	}
}

export default App;
