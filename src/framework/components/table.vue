<template>
  <div>
    <a-card v-if="advancedSearch">
      <ying-search-form @search="handleSearch">
        <template slot-scope="{model}">
          <slot name="search" :model="model"></slot>
        </template>
      </ying-search-form>
    </a-card>
    <div class="divider-line" v-if="advancedSearch"></div>
    <a-card>
      <div class="ant-pro-table-toolbar" v-if="showHeader">
        <div class="ant-pro-table-toolbar-title">{{title}}</div>
        <div class="ant-pro-table-toolbar-option">
          <div class="ant-space ant-space-horizontal ant-space-align-center">
            <div class="ant-space-item ying-table-batch-actions">
              <slot name="batch-action" :rows="selected_rows"></slot>
            </div>
          </div>
        </div>
      </div>
      <a-table
        rowKey="id"
        :pagination="pagination"
        :row-selection="rowSelection"
        :loading="loading"
        :columns="show_columns"
        :data-source="list"
        @change="handleChange"
      >
        <span v-if="showActions" slot="actions" slot-scope="record">
          <slot name="action" :record="record"></slot>
        </span>
        <slot></slot>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import Vue from "vue";

const $bus = new Vue();
export default {
  name: "YingTable",
  props: {
    request: {
      type: [String, Function],
    },
    title: String,
    columns: {
      type: [Array, Function],
      default: () => [],
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      $bus: $bus,
    };
  },
  data() {
    return {
      def_columns: [],
      list: [],
      pagination: {
        current: 1,
        pageSize: 20,
      },
      selected_rows: [],
      loading: false,
      filters: {},
      sorter: {},
    };
  },
  computed: {
    advancedSearch() {
      return this.$scopedSlots.search;
    },
    showActions() {
      console.log(this.$scopedSlots.action);
      return this.$scopedSlots.action;
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selected_rows = selectedRows;
          this.$emit("selectedChange", this.selected_rows);
        },
        type:this.selectd_type
      };
    },
    show_columns() {
      if (this.showActions) {
        return this.def_columns.concat([
          {
            title: "操作",
            key: "action",
            scopedSlots: { customRender: "actions" },
          },
        ]);
      }
      return this.def_columns;
    },
    selectd_type() {
      if (this.multiple) return "checkbox";
      return "radio";
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (typeof this.columns === "function") {
        this.columns.apply(this).then((columns) => this.initColumns(columns));
      } else if (this.columns instanceof Array) {
        this.initColumns(this.columns);
      }

      $bus.$on("refresh", (reload) => {
        console.log("refresh");
        this.refresh(reload);
      });
    },
    initColumns(columns) {
      this.def_columns = columns;
      this.handleChange(this.pagination, {}, {});
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
    handleChange(pagination, filters, sorter) {
      this.filters = filters;
      this.sorter = sorter;

      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.loading = true;
      this.handleRequest({
        size: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      }).then((response) => {
        const { data } = response;
        const pagination = { ...this.pagination };
        pagination.total = data.records;
        this.loading = false;
        this.list = data.list;
        this.pagination = pagination;
      });
    },
    handleSearch(model) {
      this.handleChange({ current: 1 }, { ...model }, this.sorter);
    },
    refresh() {
      this.handleChange(this.pagination, this.filters, this.sorter);
    },
    getSelecteds() {
      return this.selected_rows;
    },
  },
};
</script>

<style>
.divider-line {
  margin: 30px;
}
.ant-space-align-center {
  align-items: center;
}
.ant-space {
  display: inline-flex;
}
.ant-space-item {
  cursor: pointer;
}
.ant-pro-table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
}
.ant-pro-table-toolbar-title {
  flex: 1 1;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  opacity: 0.85;
}
.ant-pro-table-toolbar-option {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ying-table-batch-actions > * {
  margin-left: 5px;
}
</style>