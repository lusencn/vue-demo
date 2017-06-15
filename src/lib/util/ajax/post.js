import isString from '../is/isString';
import axios from 'axios';


/**
 * Ajax Post请求
 */
var post = function(params = {}) {
	if (!isString(params)) {
		params = {
			method: 'post',
			url: params.url,
			params: params.data
		}
	}

	return axios(params).then(response => {
		return response;
	}, ...args => {
		return args[0];
	});
};

export { post };
