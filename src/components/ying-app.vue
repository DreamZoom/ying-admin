<template>
  <a-layout class="ying-app">
    <a-layout-sider
      class="ying-app-slider"
      :width="256"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="ying-app-logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="ying-app-header">
          <span class="ying-app-trigger">
            <a-icon
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="collapsed = !collapsed"
            />
          </span>
          <div class="ying-app-header-right">
            <div class="ying-app-header-right-action">
              <a-auto-complete
                class="certain-category-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="large"
                style="width: 100%"
                placeholder="input here"
                option-label-prop="value"
              >
                <template slot="dataSource">
                  <a-select-option key="all" disabled class="show-all">
                    <a
                      href="https://www.google.com/search?q=ant-design-vue"
                      target="_blank"
                      rel="noopener noreferrer"
                    >View all results</a>
                  </a-select-option>
                </template>
                <a-input>
                  <a-icon slot="suffix" type="search" class="certain-category-icon" />
                </a-input>
              </a-auto-complete>
            </div>
            <div class="ying-app-header-right-action">
              <a-dropdown>
                <div>
                  <a-icon type="user" />
                  <span>admin</span>
                </div>

                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">个人中心</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">修改密码</a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item>
                    <a href="javascript:;">退出</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
            <div class="ying-app-header-right-action">
              <a-dropdown>
                <a class="ant-dropdown-link">
                  <a-icon type="global" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">中文</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">english</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: "YingApp",
  data() {
    return {
      collapsed: false,
      dataSource: ["Burns Bay Road", "Downing Street", "Wall Street"]
    };
  }
};
</script>

<style>
.ying-app {
  height: 100%;
  position: relative;
}
.ying-app-logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ying-app-trigger {
  height: 64px;
  padding: 0 24px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s, padding 0s;
}
.ying-app-slider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.ying-app-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.ying-app-header-right {
  display: flex;
  float: right;
  height: 64px;
  margin-left: auto;
  overflow: hidden;
}
.ying-app-header-right-action {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.ying-app-header-right-action:hover {
  background-color: #efefef;
}
</style>