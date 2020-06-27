import { Modal } from "ant-design-vue";

export default class {
    constructor({ template, title, rules, service }={}) {
        this.template = template || "";
        this.title = title || "编辑";
        this.rules = rules || [];
        this.service = service;
    }

    form({create=true,model}={}) {
        const EditModal = {
            props: {
                form: Object,
                create:{
                    type:Boolean,
                    default:true
                }
            },
            template:
                `
                <a-form-model v-model="form">
                    ${this.template}
                </a-form-model>
                `
        }
        const form = {
            ...model
        }
        console.log(model);
        const self = this;
        Modal.confirm({
            width: "60%",
            okText: '确认',
            cancelText: '取消',
            title: this.title,
            content: h => (<EditModal form={form} create={create} />),
            onOk() {
                self.service.save(form).then((response) => {
                    console.log(response);
                })
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    delete({model}={}){
        const self = this;
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            title: "删除记录",
            content: h => (<span>确定要删除此记录么？</span>),
            onOk() {
                self.service.delete(model).then((response) => {
                    console.log(response);
                })
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    batchDelete({rows=[]}={}){
        console.log(rows);
        const self = this;
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            title: "删除记录",
            content: h => (<span>确定要删除这些记录么？</span>),
            onOk() {
                self.service.delete(rows).then((response) => {
                    console.log(response);
                })
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }
}