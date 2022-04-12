import { Modal } from "antd";

export const success = (title) => {
	Modal.success({
		title: title,
	});
};

export const warning = (title) => {
	Modal.warning({
		title: title,
	});
};

export const error = (title, content) => {
	Modal.error({
		title: title,
		content: content,
	});
};
