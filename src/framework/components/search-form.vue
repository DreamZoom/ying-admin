<template>
  <a-form class="ying-search-form">
    <a-row :gutter="24">
      <slot :model="search"></slot>
      <a-col :span="8" :offset="offset" :style="{ textAlign: 'right' }">
        <div class="ying-search-item-action">
          <a-button type="primary" @click="handleSearch">搜索</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清除</a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>
<script>
export default {
  name: "YingSearchForm",
  data() {
    return {
      search: {},
      count: 0
    };
  },
  computed: {
    offset() {
      return (3 - (this.count % 3) - 1) * 8;
    }
  },
  mounted() {
    this.$$childs = this.$$childs || [];
    console.log(this.$$childs);
    this.count = this.$$childs.length;
  },
  methods: {
    handleSearch() {
      this.$emit("search", { ...this.search });
    },
    handleReset() {
      this.search = {};
      this.handleSearch();
    },
    addChild(component) {
      this.$$childs = this.$$childs || [];
      this.$$childs.push(component);
    }
  }
};
</script>
<style scoped>
.ying-search-item-action{
  line-height: 40px;
}
</style>