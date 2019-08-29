export default class DataSource {
	http = null;

	constructor(http) {
		this.http = http;
	}
	source = {};

	add(key, url) {
		this.source[key] = url;
    }
    
    clear(){
        this.source={};
    }

	get(action, args) {
		const url = this.source[action] || '';
		return this.http.get(url, {
            ...args
		});
	}

	post(action, args) {
		const url = this.source[action] || '';
		return this.http.post(url, {
			...args
		});
	}
}
