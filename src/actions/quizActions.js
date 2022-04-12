import ActionConst from "./types";

export const getQuestions = (questions) => (dispatch) => {
	dispatch({
		type: ActionConst.GET_QUESTIONS,
		payload: questions,
	});
};
