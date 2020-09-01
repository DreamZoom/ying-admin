<template>
  <a-tree :tree-data="treeData" :showLine="showLine" @select="handleSelect" :multiple="multiple" />
</template>
<script>
export default {
  name: "YingTreeSelect",
  props: {
    request: {
      type: [String, Function],
    },
    data: null,
    multiple: {
      type: Boolean,
      default: false,
    },
    showLine: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
      default: "id",
    },
    parentKey: {
      type: String,
      default: "parentId",
    },
    rootValue: {
      type: null,
      default: 0,
    },
    labelKey: {
      type: String,
      default: "name",
    },
    value: null,
  },
  data() {
    return {
      treeData: [],
      selecteds: [],
    };
  },
  mounted() {
    this.init();
  },
  computed: {},
  methods: {
    init() {
      this.handleRequest(this.data).then((response) => {
        this.treeData = this.tree(response.data);
      });
    },
    tree(list) {
      const treeMap = (list, parent) => {
        const childs = list.filter((item) => item[this.parentKey] == parent);
        return childs.map((item) => {
          const key = item[this.rowKey];
          return {
            title: item[this.labelKey],
            key: key,
            children: treeMap(list, key),
            value: item,
          };
        });
      };
      return treeMap(list, this.rootValue);
    },
    handleSelect(selectedKeys, evt) {
      this.selecteds = evt.selectedNodes.map((item) => item.data.props.value);
      this.$emit("input", this.selecteds.map((m) => m[this.rowKey]).join(","));
    },
    handleRequest(data) {
      return Promise.resolve().then(() => {
        if (typeof this.request === "string") {
          return this.$request.post(this.request, { ...data });
        } else if (typeof this.request === "function") {
          return this.request.apply(this, [{ ...data }]);
        } else {
          return Promise.reject({ message: "request param type error" });
        }
      });
    },
    refresh() {
      this.handleRequest(this.data).then((response) => {
        this.treeData = this.tree(response.data);
      });
    },
  },
};
</script>