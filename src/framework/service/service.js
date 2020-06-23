import request from "../utils/request";
export default class{
    constructor({controller}){
        this.controller= controller;
    }

    getBaseApi(){
        return {
            save:`api/${this.controller}/save`,
            delete:`api/${this.controller}/delete`,
            find:`api/${this.controller}/find`,
            query:`api/${this.controller}/page-list`,
        }
    }

    save(params){
        const api = this.getBaseApi().save;
        return request.post(api,params);
    }

    delete({id}){
        const api = this.getBaseApi().delete;
        return request.post(api,{id});
    }

    find({id}){
        const api = this.getBaseApi().find;
        return request.post(api,{id});
    }

    query(params){
        const api = this.getBaseApi().query;
        return request.get(api,params);
    }
}