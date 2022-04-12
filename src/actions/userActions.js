import ActionConst from "./types";

//Set_username
export const setUserData = (userData) => (dispatch) => {
	dispatch({
		type: ActionConst.SET_USER_DATA,
		payload: userData,
	});
};

//Set_Menu key
export const setMenuKey = (menuKey) => (dispatch) => {
	dispatch({
		type: ActionConst.SET_MENU_KEY,
		payload: menuKey,
	});
};

//Set theme to either dark or light
export const setTypeTheme = (typeTheme) => (dispatch) => {
	dispatch({
		type: ActionConst.SET_TYPE_THEME,
		payload: typeTheme,
	});
};
