<template>
  <div class="ying-layout-container">
    <div class="ying-layout-header" :style="header_style">
      <div class="ying-layout-actions">
        <i v-if="!$store.getters.slide" class="action-item el-icon-s-fold" @click="toggetSide"></i>
        <i v-if="$store.getters.slide" class="action-item el-icon-s-unfold" @click="toggetSide"></i>
      </div>
      <div class="ying-layout-main-menu">
        <slot name="main-menu"></slot>
      </div>
      <div class="ying-layout-tools-menu">
        <slot name="tools-menu"></slot>
      </div>
    </div>
    <div class="ying-layout-side" :style="site_style">
      <div class="ying-logo">
        <slot name="logo">Ying Admin Layout</slot>
      </div>
      <div class="ying-menu">
        <slot name="side-menu"></slot>
      </div>
    </div>
    <div class="ying-layout-main" :style="main_style">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import store from "./store";
export default {
  name: "YingLayout",
  store,
  computed: {
    site_style() {
      if (this.side) {
        return {
          width: "65px"
        };
      }
    },
    header_style() {
      if (this.side) {
        return {
          left: "65px"
        };
      }
    },
    main_style() {
      if (this.side) {
        return {
          left: "65px"
        };
      }
    }
  },
  methods: {
    toggetSide() {
      store.commit("toggleSide");
    }
  }
};
</script>
<style>
.ying-layout-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.ying-layout-header {
  position: absolute;
  top: 0px;
  left: 220px;
  right: 0px;
  height: 49px;
  overflow: hidden;
  border-bottom: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
}
.ying-layout-actions {
  float: left;
  height: 100%;
  line-height: 49px;
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  cursor: pointer;
}
.ying-layout-actions .action-item {
  margin-left: 10px;
  cursor: pointer;
  color: #888;
}
.ying-layout-actions .action-item:hover {
  color: #000;
}
.ying-layout-main-menu {
  float: left;
}
.ying-layout-main-menu .el-menu-item,
.ying-layout-main-menu .el-submenu__title {
  height: 49px !important;
  line-height: 49px !important;
}
.ying-layout-tools-menu {
  float: right;
}
.ying-layout-tools-menu .el-menu-item,
.ying-layout-tools-menu .el-submenu__title {
  height: 49px !important;
  line-height: 49px !important;
}
.ying-layout-side {
  width: 220px;
  height: 100%;
  position: absolute;
  background-color: #20222a;
  box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.6);
  z-index: 9999;
}
.ying-layout-side .el-menu {
  border-right: solid 1px #20222a !important;
}
.ying-layout-side .ying-logo {
  text-align: center;
  color: #fff;
  width: 100%;
  height: 49px;
  line-height: 49px;
  position: absolute;
  background-color: #20222a;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.55);
}
.ying-layout-side .ying-menu {
  margin-top: 50px;
}
.ying-layout-main {
  position: absolute;
  left: 220px;
  right: 0px;
  top: 50px;
  bottom: 0px;
  padding: 10px;
  overflow-y: scroll;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid transparent;
  color: #303133;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: 2px solid transparent;
  color: #303133;
}
</style>
