import SpringBaseService from './SpringBaseService';
import framework from '../framework/index';
const { BaseService } = framework;
export default new class extends BaseService {
    constructor() {
        super({ controller: "news/channel" })
    }

    columns() {
        return [{
            dataIndex: 'id',
            title: "栏目编号"
        }, {
            dataIndex: 'name',
            title: "栏目名称",
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
            ],
        },]
    }

};