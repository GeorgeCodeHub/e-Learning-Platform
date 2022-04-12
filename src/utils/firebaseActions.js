import firebaseConfig, { firestore } from "./fbConfig";

import { setUserData } from "../actions/userActions";
import store from "../store";

export const getUserDetails = () => {
	var user = firebaseConfig.auth().currentUser.uid;

	return firestore
		.collection("users")
		.doc(user)
		.get()
		.then((response) => {
			store.dispatch(setUserData(response.data()));
		})
		.catch((error) => {
			console.log("Failed to get user data.");
		});
};

export const updateUserDetails = (updateKeys) => {
	var user = firebaseConfig.auth().currentUser.uid;
	firestore
		.collection("users")
		.doc(user)
		.update(updateKeys)
		.then(() => {
			if (updateKeys.dark_mode === false || updateKeys.dark_mode === true)
				window.location.reload(false);
			else getUserDetails();
		})
		.catch((error) => {
			console.log(
				"Something went wrong with added user values to firestore:",
				error
			);
		});
};

export const updateUserPassword = (password) => {
	var user = firebaseConfig.auth().currentUser;

	user
		.updatePassword(password)
		.then(function () {
			console.log("Done");
		})
		.catch(function (error) {
			console.log("Error");
		});
};
