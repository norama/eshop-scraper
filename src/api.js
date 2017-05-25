import $ from 'jquery';

const BASE_URL = 'http://10.1.0.122:9393';

export default class api {
	
	get(url, values, success, failure) {
		$.post(BASE_URL + url, values)
			.done((response) => {
				success(response);
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				failure(jqXHR, textStatus, errorThrown);
			});
	}
	
};