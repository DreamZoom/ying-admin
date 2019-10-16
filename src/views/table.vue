<template>
  <ying-table base="api/user/client/" :config="config">
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
        <el-form-item label="应用名称">
          <el-input v-model="model.appName"></el-input>
        </el-form-item>
        <el-form-item label="应用描述" prop="clientId">
          <el-input v-model="model.clientId"></el-input>
        </el-form-item>
        <el-form-item label="应用描述">
          <ying-chose v-model="model.authorizedGrantTypes" :values='[{name:"authorization_code",text:"authorization_code"},{name:"password",text:"password"},{name:"implicit",text:"implicit"},{name:"client_credentials",text:"client_credentials"}]' :multiple="true"></ying-chose>
          <!-- <ying-select v-model="model.clientId" base="api/user/account/" :fields="[{name:'id',text:'编号'},{name:'username',text:'用户'}]"></ying-select> -->
          <ying-upload multiple></ying-upload>
        </el-form-item>
    </template>
    <ying-table-column prop="appName" label="应用名称"></ying-table-column>
    <ying-table-column prop="appDesc" label="应用描述"></ying-table-column>
    <ying-table-column prop="clientId" label="应用ID"></ying-table-column>
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

        config.rules={
          clientId:[{required: true, message: '请输入ClientId', trigger: 'blur'}]
        }

        //config.search.expression="(name=${name}&&age>${age})&&time>${time}";
    }
  }
}
</script>
