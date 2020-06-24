<template>
  <div>
    <a-card>
      <ying-search-form @search="handleSearch">
        <template slot-scope="{model}">
          <ying-search-item label="用户名">
            <a-input v-model="model.username" placeholder="username" />
          </ying-search-item>
          <ying-search-item label="昵称">
            <a-input v-model="model.nickname" placeholder="username" />
          </ying-search-item>
          <ying-search-item label="身份证号">
            <a-input v-model="model.idcard" placeholder="username" />
          </ying-search-item>
          <ying-search-item label="等级">
            <a-input v-model="model.level" placeholder="username" />
          </ying-search-item>
          <ying-search-item label="备注">
            <a-input v-model="model.remark" placeholder="username" />
          </ying-search-item>
        </template>
      </ying-search-form>
    </a-card>
    <div class="divider-line"></div>
    <a-card>
      <div class="ant-pro-table-toolbar">
        <div class="ant-pro-table-toolbar-title">{{title}}</div>
        <div class="ant-pro-table-toolbar-option">
          <div class="ant-space ant-space-horizontal ant-space-align-center">
            <div class="ant-space-item">
              <a-button type="primary">
                <a-icon type="plus" />
                <span>新建</span>
              </a-button>
              <a-button type="danger">
                <a-icon type="delete" />
                <span>删除</span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <a-table
        rowKey="id"
        :pagination="pagination"
        :row-selection="rowSelection"
        :loading="loading"
        :columns="columns"
        :data-source="list"
        @change="handleChange"
      >
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="handleAction(text, record)">编辑</a-button>
          <a-button type="link" @click="handleAction(text, record)">删除</a-button>
        </span>
        <slot></slot>
      </a-table>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "YingTable",
  props: {
    service: {
      type: Function,
      default: function() {}
    },
    title: String
  },
  data() {
    return {
      columns: [],
      list: [],
      pagination: {
        current: 1,
        pageSize: 20
      },
      loading: false
    };
  },
  computed: {
    rowSelection() {
      return {};
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.columns = this.service.apply(this).columns();
      this.columns.push({
        title: "操作",
        key: "action",
        scopedSlots: { customRender: "action" }
      });
      this.handleChange(this.pagination, {}, {});
    },
    handleChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.loading = true;
      this.service
        .apply(this)
        .query({
          size: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters
        })
        .then(response => {
          const { data } = response;
          const pagination = { ...this.pagination };
          pagination.total = data.records;
          this.loading = false;
          this.list = data.list;
          this.pagination = pagination;
        });
    },
    handleSearch(model) {
      console.log(model);
      this.handleChange({ current: 1 }, { ...model }, {});
    },
    handleAction(){

    }
  }
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
</style>