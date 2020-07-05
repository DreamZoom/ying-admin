<template>
  <a-row :gutter="16">
    <a-col :span="6">
      <a-card>
        <div>
          <a-button icon="plus">添加</a-button>
          <a-button icon="delete">删除</a-button>
        </div>
        <a-divider />
        <a-tree :tree-data="treeData" :showLine="true" @select="handleSelect" />
      </a-card>
    </a-col>
    <a-col :span="18">
      <a-card  v-if="selecteds.length==0">
          <a-alert message="请选择节点" type="info" />
      </a-card>
      
      <a-card v-for="(item,index) in selecteds" :key="index" :title="item.title">
        <slot :model="item"></slot>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: "YingTree",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      treeData: [],
      selecteds: []
    };
  },
  mounted() {
    this.init();
  },
  computed: {
   
  },
  methods: {
    init() {
      this.service.tree().then(response => {
        this.treeData = response.data;
      });
    },
    handleSelect(selectedKeys, evt) {
      this.selecteds = this.getValues(selectedKeys);
    },
    getValues(keys) {
      const childMap = item => {
        var list = [];
        if (item.children) {
          list = list.concat(item.children);
          item.children.map(it => {
            const childs = childMap(it);
            list = list.concat(childs);
          });
        }
        return list;
      };

      let records = childMap({ children: this.treeData });
      records = records.filter(item => keys.indexOf(item.key) >= 0);
      return records;
    }
  }
};
</script>