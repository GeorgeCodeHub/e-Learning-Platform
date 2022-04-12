import Axios from "axios";

const http = Axios.create({
	timeout: 30000,
	params: { _dc: null },
});

//Request interceptor
http.interceptors.request.use(function (request) {
	return request;
});

//Response interceptor
http.interceptors.response.use(function (response) {
	return response;
});

export default http;
