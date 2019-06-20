<template>
  <div>
    <div class="ying-table-toolbar">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button-group>
            <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
            <el-button size="small" type="primary" icon="el-icon-share"></el-button>
            <el-button size="small" type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form size="small" :inline="true" :model="search" class="demo-form-inline">
              <el-form-item label="审批人">
                <el-input v-model="search.user" placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="search.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <slot name="search"></slot>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <slot name="search"></slot>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" style="width: 100%">
      <slot></slot>
    </el-table>

    <div class="ying-pagination-wapper">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pagination.total"
        :current-page.sync="pagination.page"
        :page-size="pagination.size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "YingTable",
  props: {
    dataUrl: String,
    dataFormatter: {
      type: Function,
      default: function(d) {
        return {
          total: d.totalElements,
          list: d.content
        };
      }
    }
  },
  data() {
    return {
      list: [],

      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      search: {}
    };
  },
  mounted() {
    console.log(this);
    this.init();
  },
  computed: {
    show_search() {
      return this.$slots.search ? true : false;
    }
  },
  methods: {
    init() {
      this.loadData();
    },
    loadData() {
      this.$http
        .get(this.dataUrl, {
          page: this.pagination.page - 1,
          size: this.pagination.size
        })
        .then(response => {
          console.log(response);
          const data = this.dataFormatter(response.data);
          this.list = data.list;
          this.pagination.total = data.total;
        });
    },
    handleSizeChange(size) {
      this.pagination.size = size;
      this.loadData();
    },
    handleCurrentChange() {
      this.pagination.page = page;
      this.loadData();
    }
  }
};
</script>
<style lang="css">
.ying-pagination-wapper {
  padding: 10px 0px;
  text-align: right;
}
.ying-table-toolbar {
  background: #f5f7f9;
  padding: 10px;
}
</style>
