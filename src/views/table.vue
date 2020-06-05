<template>
  <ying-table base="api/news/channel/" :tree="true" :config="config">
    <template slot="search" slot-scope="scope">
      <el-form-item label="审批人">
        <el-input v-model="scope.search.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="scope.search.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template slot="edit" slot-scope="{model}">
        <el-form-item label="栏目名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称" prop="path">
          <el-input v-model="model.path"></el-input>
        </el-form-item>
        <el-form-item label="应用描述">
          <!-- <ying-chose v-model="model.authorizedGrantTypes" :values='[{name:"authorization_code",text:"authorization_code"},{name:"password",text:"password"},{name:"implicit",text:"implicit"},{name:"client_credentials",text:"client_credentials"}]' :multiple="true"></ying-chose> -->
          <ying-select v-model="model.parentId" :tree="true" base="api/news/channel/" :fields="[{name:'id',text:'编号'},{name:'name',text:'栏目'}]"></ying-select> 
          <!-- <ying-rich-editor v-model="model.appDesc" ></ying-rich-editor> -->
        </el-form-item>
    </template>
    <ying-table-column prop="name" label="栏目名称" image :size="{width:'200px',height:'200px'}"></ying-table-column>
    <ying-table-column prop="path" label="栏目路径"></ying-table-column>
    <ying-table-column prop="parentId" label="父ID"></ying-table-column>
  </ying-table>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    log(o){
      console.log(o);
    },
    config(source,config){
        config.batch_actions.push({name:"batch-check",text:"批量审核"});
        config.actions.push({name:"check",text:"审核"});
        config.actions.push({name:"upload",text:"上传"});


        config.methods["batch-check"]=(table,rows)=>{
          this.log(table);
          this.log(rows);
        }

        config.clearKeys=["clientId"];

        // config.rules={
        //   clientId:[{required: true, message: '请输入ClientId', trigger: 'blur'}]
        // }

        //config.search.expression="(name=${name}&&age>${age})&&time>${time}";
    }
  }
}
</script>
