import request from "../utils/request";
export default class {
    constructor({ controller }) {
        this.controller = controller;
    }

    getBaseApi() {
        return {
            save: `api/${this.controller}/save`,
            delete: `api/${this.controller}/delete`,
            batch_delete: `api/${this.controller}/batch_delete`,
            find: `api/${this.controller}/find`,
            query: `api/${this.controller}/page-list`,
            list: `api/${this.controller}/list`,
        }
    }

    columns() {
        return [];
    }

    save(params) {
        const api = this.getBaseApi().save;
        return request.post(api, params);
    }

    delete({ id }) {
        const api = this.getBaseApi().delete;
        return request.post(api, { id });
    }

    batch_delete({ ids }) {
        const api = this.getBaseApi().batch_delete;
        return request.post(api, { ids });
    }

    find({ id }) {
        const api = this.getBaseApi().find;
        return request.post(api, { id });
    }

    query(params) {
        if(params && params.page){
            params.page = params.page-1;
        }
        console.log(params);
        const api = this.getBaseApi().query;
        return request.post(api, params);
    }

    list(params) {
        const api = this.getBaseApi().list;
        return request.post(api, params);
    }
}