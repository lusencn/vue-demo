import isString from '../is/isString';
import axios from 'axios';

/**
 * Ajax Get请求
 */
const get = function(params = {}) {
	if (!isString(params)) {
		params = {
			method: 'get',
			url: params.url,
			params: params.data
		}
	}

	return reqwest(params).then(response => {
		return response;
	}, ...args => {
		return args[0];
	});
}
export { get };
