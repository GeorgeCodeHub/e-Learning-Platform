import React from "react";
import { Modal } from "antd";

function About() {
	Modal.info({
		title: "About this application",
		content: (
			<div className="course-welcome">
				This application was created in order to help people understand the body
				language of the people around them and be able to handle certain
				situations.
			</div>
		),
		onOk() {},
	});
}

export default About;
