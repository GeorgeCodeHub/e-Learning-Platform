import React, { useEffect, useState } from "react";
import firebaseConfig from "./fbConfig.js";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		firebaseConfig.auth().onAuthStateChanged((user) => {
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

	if (pending) {
		return (
			<div
				style={{
					marginTop: 450,
					marginRight: "auto",
					marginLeft: "auto",
				}}
			>
				<Spin indicator={antIcon} />
				<br />
				Loading...
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				currentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
