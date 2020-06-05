<template>
  <div>
    <el-button size="small" @click="dialogVisible=true">{{selectText||"请选择"}}</el-button>
    <el-dialog title="选择" :visible.sync="dialogVisible" width="50%" append-to-body>
      <ying-table
        :base="base"
        :config="config"
        :show_toolbar="false"
        :multiple="multiple"
        :tree="tree"
        :primaryKey="primaryKey"
        :treeKey="treeKey"
        ref="table"
      >
       <template  v-for="(item,i) in columns" >
           <ying-table-column :key="i" :prop="item.name" :label="item.text" v-if="item.name!='id'"></ying-table-column>
       </template>
        
      </ying-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "YingSelect",
  props: {
    base: String,
    // keyField: String,
    // nameField: String,
    fields: {
      type: [Array, Object],
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
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
    }
  },
  data() {
    return {
      keyField: "",
      nameField: "",
      dialogVisible: false,
      selections: []
    };
  },
  computed: {
    selectText() {
      if (this.multiple) {
        var val_list = [];
        this.selections.map(val => {
          val_list.push(val[this.nameField] || val[this.keyField]);
        });
        return val_list.join(",");
      } else {
        console.log(this.selections);
        if (this.selections.length > 0) {
          const val = this.selections[0];
          return val[this.nameField] || val[this.keyField];
        }
        return "";
      }
    },
    columns() {
      let cols = this.fields;
      if (!(this.fields instanceof Array)) {
        //如果参数是object
        cols = [];
        for (const key in this.fields) {
          if (this.fields.hasOwnProperty(key)) {
            const val = this.fields[key];
            cols.push({
              name: key,
              text: val
            });
          }
        }
      }
      if (cols.length == 1) {
        cols.unshift({
          name: "id",
          text: "编号"
        });
      } else if (cols.length == 0) {
        cols.push({
          name: "id",
          text: "编号"
        });
        cols.push({
          name: "name",
          text: "名称"
        });
        console.warn("you should setting fields in this component");
      }

      return cols;
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        this.loadValue(newValue);
      }
    }
  },
  mounted() {
    const cols = this.columns;
    this.keyField = cols[0].name;
    this.nameField = cols[1].name;
    this.loadValue(this.value);
  },
  methods: {
    config(source, config) {
      config.batch_actions = [];
      config.actions = [];
      // config.show_toolbar=false;
    },
    handleOk() {
      this.dialogVisible = false;
      this.selections = this.$refs.table.getSelections();
      this.bindValue();
    },
    loadValue(keyValue) {
      var url = this.base + "find-by-keys";
      this.$http
        .get(url, {
          key: this.keyField,
          values: keyValue
        })
        .then(response => {
          if (response.result) {
            this.selections = response.data;
          }
        });
    },
    bindValue() {
      var value = "";
      var model = this.selections;
      if (this.multiple) {
        var val_list = [];
        this.selections.map(val => {
          val_list.push(val[this.keyField]);
        });
        value = val_list.join(",");
      } else {
        model = this.selections.length > 0 ? this.selections[0] : null;
        console.log(this.selections);
        if (this.selections.length > 0) {
          const val = this.selections[0];
          value = val[this.keyField];
        } else {
          value = "";
        }
      }
      this.$emit("input", value);
      this.$emit("change", model);
    }
  }
};
</script>

