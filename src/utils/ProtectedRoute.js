import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";
import { getUserDetails } from "./firebaseActions";

//Redux libraries
import { connect } from "react-redux";
import { setUserData } from "../actions/userActions";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		getUserDetails();
	}, []);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (currentUser) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

//Used to get state from global store
const mapStateToProps = (state) => {
	return {
		userData: state.userReducer.userData,
	};
};

export default connect(mapStateToProps, {
	setUserData,
})(ProtectedRoute);
