<template>
  <div>
    <div class="ying-table-toolbar">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button-group>
            <el-button size="small" type="primary" v-for="(item,i) in actions" :key="i" @click="handleAction(item.name)">{{item.text}}</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12">
          <div v-if="show_search">
            <el-form size="small" :inline="true" :model="search">
              <slot name="search" :search="search"></slot>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table border :data="list" @selection-change="handleSelectionChange" header-row-class-name="ying-table-header" class="ying-table">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="ying-pagination-wapper">
      <el-pagination background layout="prev, pager, next" :total="pagination.total" :current-page.sync="pagination.page" :page-size="pagination.size" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑" v-if="edit_model" :visible="true" width="60%" @close="edit_model=null">
      <div>
        <el-form ref="form" :model="edit_model" label-width="80px">
          <slot name="edit" :model="edit_model"></slot>
        </el-form>
        
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_model=null">取 消</el-button>
        <el-button type="primary" @click="handleSave(edit_model)">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import DataSource from "./data-source";
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
      },
      configSource: {
        type: Function,
        default: function(source) {}
      },
      configActions: {
        type: Function,
        default: function(actions) {}
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
        search: {
          name: "wxl"
        },
        actions: [],
        multiple_selections: [],
        edit_model:null
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      show_search() {
        return this.$slots.search ? true : false;
      }
    },
    methods: {
      init() {
        //配置数据源
        this.$dataSource = new DataSource(this.$http);
        this.$dataSource.add("page-list", "api/client/page-list");
        this.$dataSource.add("save", "api/client/save");
        this.$dataSource.add("delete", "api/client/delete");
        this.$dataSource.add("find", "api/client/find");
        this.configSource(this.$dataSource);
        //操作
        this.actions.push({
          name: "create",
          text: "创建"
        });
        this.actions.push({
          name: "batch-delete",
          text: "删除"
        });
        this.configActions(this.actions);

        //加载数据
        this.loadData();


        //绑定操作
        this.action_methods={
          create:(args)=>{
            this.edit_model={};
          },
          update:function(row){
            this.edit_model=row;
          }
        }

      },
      loadData() {
        console.log(this.$dataSource);
        this.$dataSource
          .get("page-list", {
            page: this.pagination.page - 1,
            size: this.pagination.size
          })
          .then(response => {
            console.log(response);
            if (response.result) {
              const data = this.dataFormatter(response.data);
              this.list = data.list;
              this.pagination.total = data.total;
            }
          });
      },
      handleSizeChange(size) {
        this.pagination.size = size;
        this.loadData();
      },
      handleCurrentChange(page) {
        this.pagination.page = page;
        this.loadData();
      },
      triggerCommand(cmd, args) {
        console.log(cmd);
        console.log(args);
        const method = this.action_methods[cmd];
        if(method&& typeof method ==='function'){
          method.apply(this,[args]);
        }
      },
      handleAction(action) {
        this.triggerCommand(action, this.multiple_selections);
      },
      handleSelectionChange(rows) {
        this.multiple_selections = rows;
      },
      handleSave(model){
        this.$dataSource.post("save",{...model}).then(function(response){
            if(response.result){
              this.edit_model=null;
            }
        });
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
    padding: 10px 0px;
  }
  .ying-table {
    border-color: #e6e6e6;
    width: 100%;
  }
  .ying-table-header th {
    background: #f2f2f2;
  }
</style>
