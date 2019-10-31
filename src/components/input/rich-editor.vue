<template>
    <div ref="editor">
       
    </div>
</template>
<script>
    import E from 'wangeditor'
    export default {
        name: "YingRichEditor",
        props: {
            value: String
        },
        data() {
            return {
                editorContent: ""
            }
        },
        watch: {
            value(newValue, oldValue) {
                if(newValue!=oldValue && this.content!=newValue){
                    this.editor.txt.html(newValue);
                }
            }
        },
        mounted(){
            this.initEditor();
        },
        methods: {
            initEditor(){
                this.editor = new E(this.$refs.editor)
                this.editor.customConfig.onchange = (html) => {
                    this.content=html;
                    this.$emit("input",html);
                }
                this.editor.create();
                this.editor.txt.html(this.value);
            }
           
        }
    }
</script>
