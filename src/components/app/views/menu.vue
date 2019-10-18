<template>
    <div>
        <template v-for="(item,i) in this.menus">
            <el-submenu :index="item.path" v-if="item.childs" :key="i">
				<div slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </div>
    
                <ying-menu :menus="item.childs"></ying-menu>
            </el-submenu>
            <el-menu-item :index="item.path" v-else :key="i">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
	name:"YingMenu",
	props:{
		menus:{
			type:Array
		}
	}
}
</script>
