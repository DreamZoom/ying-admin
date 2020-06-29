import framework from '../framework/index';
const { BaseService } = framework;

export default class extends BaseService {
    constructor(options) {
        super(options);
    }
    query(params){
        return super.query(params).then((response) => {

            response.data = {
                list: response.data.content,
                records: response.data.totalElements,
                page: response.data.number,
                size: response.data.size
            }
            return Promise.resolve(response);
        });
    }
};