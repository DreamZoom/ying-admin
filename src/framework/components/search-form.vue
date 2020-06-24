<template>
  <a-form class="ying-search-form">
    <a-row :gutter="24">
       <slot :model="search"></slot>
    </a-row>
    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button type="primary"  @click="handleSearch">搜索</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清除</a-button>
      </a-col>
    </a-row>
  </a-form>
</template>
<script>
export default {
    name:"YingSearchForm",
    data(){
        return {
            search:{

            }
        }
    },
    methods:{
        handleSearch(){
            this.$emit("search",{...this.search});
        },
        handleReset(){
            this.search = {};
            this.handleSearch();
        }
    }
}
</script>
