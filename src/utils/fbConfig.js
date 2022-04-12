import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyCcTeJkyipQhCzwrAo-kmvZp5gdm2_gFBM",
	authDomain: "fir-elearning-bl.firebaseapp.com",
	databaseURL: "https://fir-elearning-bl.firebaseio.com",
	projectId: "fir-elearning-bl",
	storageBucket: "fir-elearning-bl.appspot.com",
	messagingSenderId: "496176205323",
	appId: "1:496176205323:web:557588f63d14042aba010e",
	measurementId: "G-6JCCZ593VC",
});

export const firestore = firebase.firestore();

export default firebaseConfig;
