import isString from '../is/isString';
import axios from 'axios';

/**
 * Ajax Post请求
 */
const post = function(params = {}) {
	if (!isString(params)) {
		params = {
			method: 'post',
			url: params.url,
			params: params.data
		}
	}

	return axios(params).then(response => {
		return response.data;
	}, response => {
		return response;
	});
};

export { post };
