<template>
    <router-view />
</template>
<script>
    export default {
        mounted() {
            

            //this.addMenu("message", "sys_msg", "系统消息", "");
        },
        methods: {
            addMenu(parent, name, title, icon,action) {
                this.$store.commit("addMenu", {
                    parent,
                    name,
                    title,
                    icon,
                    action
                })
            }
        }
    }
</script>
