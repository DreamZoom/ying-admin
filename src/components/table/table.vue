<template>
  <div>
    <div class="ying-table-toolbar" v-if="show_toolbar">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              v-for="(item,i) in setting.batch_actions"
              :key="i"
              @click="triggerCommand(item.name,multiple_selections)"
            >{{item.text}}</el-button>
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
    <el-table
      border
      :data="list"
      :row-key="primaryKey"
      :default-expand-all="true"
      @selection-change="handleSelectionChange"
      header-row-class-name="ying-table-header"
      class="ying-table"
      ref="ying_multiple_table"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <slot></slot>
      <el-table-column label="操作" v-if="setting.actions.length>0">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-for="(item,i) in setting.actions"
            :key="i"
            @click="triggerCommand(item.name,scope.row)"
          >{{item.text}}</el-button>
        </template>
      </el-table-column>
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
    <!-- 编辑对话框 -->
    <el-dialog title="编辑" v-if="edit_model" :visible="true" width="60%" @close="edit_model=null">
      <div>
        <el-form ref="form" :model="edit_model" :rules="setting.rules" label-width="80px">
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
    base: String,
    primaryKey: {
      type: String,
      default: "id"
    },
    tree: {
      type: Boolean,
      default: false
    },
    treeKey: {
      type: String,
      default: "parentId"
    },
    treeRootValue: {
      type: null,
      default: 0
    },
    show_toolbar: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    formatter: {
      type: Function,
      default: function(d) {
        return {
          total: d.totalElements,
          list: d.content
        };
      }
    },
    config: {
      type: Function,
      default: function(source, setting) {}
    }
  },
  data() {
    return {
      list: [],
      pagination: {
        page: 1,
        size: 12,
        total: 0
      },
      search: {
        name: ""
      },
      setting: {
        show_toolbar: true,
        batch_actions: [],
        actions: [],
        methods: [],
        search: {},
        clearKeys: [],
        rules: {}
      },
      multiple_selections: [],
      edit_model: null
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    show_search() {
      return this.$scopedSlots.search ? true : false;
    }
  },
  methods: {
    init() {
      //配置数据源
      this.$dataSource = new DataSource(this.$http);
      //默认配置
      this.default_config(this.$dataSource, this.setting);
      //配置
      this.config(this.$dataSource, this.setting);
      //加载数据
      this.loadData();
    },
    reload(first) {
      first = first || false;
      if (first) {
        this.pagination.page = 1;
      }
      this.loadData();
    },
    default_config(source, setting) {
      ["page-list", "save", "delete", "find", "batch-delete"].map(item => {
        source.add(item, this.base + item);
      });
      //操作
      setting.batch_actions.push({
        name: "create",
        text: "创建"
      });
      setting.batch_actions.push({
        name: "batch-delete",
        text: "批量删除"
      });
      setting.actions.push({
        name: "update",
        text: "编辑"
      });
      setting.actions.push({
        name: "delete",
        text: "删除"
      });
      //绑定操作
      setting.methods = {
        create: function(table, args) {
          table.edit_model = {};
        },
        update: function(table, row) {
          table.edit_model = { ...row };
          for (var i = 0; i < setting.clearKeys.length; i++) {
            var key = setting.clearKeys[i];
            delete table.edit_model[key];
          }
        },
        delete: function(table, row) {
          table.handleDelete(row);
        },
        "batch-delete": function(table, rows) {
          table.handleBatchDelete(rows);
        }
      };
    },
    loadData() {
      this.$dataSource
        .get("page-list", {
          page: this.pagination.page - 1,
          size: this.pagination.size
        })
        .then(response => {
          console.log(response);
          if (response.result) {
            const data = this.formatter(response.data);
            this.list = data.list;

            if (this.tree) {
              const that = this;
              function comb(list,parentKey){
                const childs = [];
                for (let index = 0; index < list.length; index++) {
                  const element = list[index];
                  if(element[that.treeKey]==parentKey){
                    childs.push(element);
                    element.children=comb(list,element[that.primaryKey]);
                  }
                }
                return childs;
              }

              //
              this.list = comb(this.list,this.treeRootValue);

            }

            this.pagination.total = data.total;
          } else {
            this.$message.error("数据加载失败");
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
      const method = this.setting.methods[cmd];
      if (method && typeof method === "function") {
        method(this, args);
      }
    },
    handleSelectionChange(rows) {
      console.log(rows);
      if (!this.multiple) {
        if (rows.length > 1) {
          const row = rows.pop();
          this.$refs.ying_multiple_table.clearSelection();
          this.$refs.ying_multiple_table.toggleRowSelection(row);
          this.multiple_selections = [row];
        } else {
          this.multiple_selections = rows;
        }
      } else {
        this.multiple_selections = rows;
      }
    },
    getSelections() {
      return this.multiple_selections;
    },
    handleSave(model) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$dataSource
            .post("save", {
              ...model
            })
            .then(response => {
              if (response.result) {
                this.edit_model = null;
                this.$message.success("保存成功");
                this.loadData();
              } else {
                this.$message.error("保存失败:" + response.message);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDelete(model) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$dataSource
            .post("delete", {
              ...model
            })
            .then(response => {
              if (response.result) {
                this.$message.success("删除成功");
                this.loadData();
              } else {
                this.$message.error("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    handleBatchDelete(rows) {
      if (rows && rows instanceof Array && rows.length > 0) {
        const ids = rows.map(r => {
          return r.id;
        });
        this.$confirm("此操作将永久删除这些记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$dataSource
              .post("batch-delete", {
                ids: ids
              })
              .then(response => {
                if (response.result) {
                  this.$message.success("删除成功");
                  this.loadData();
                } else {
                  this.$message.error("删除失败");
                }
              });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      } else {
        this.$message.error("请选择记录");
      }
    }
  }
};
</script>
<style lang="css">
.ying-pagination-wapper {
  padding: 5px 0px;
  /* text-align: right; */
  border: 1px solid #ebeef5;
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
