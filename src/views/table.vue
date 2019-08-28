<template>
  <ying-table data-url="api/client/page-list">
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
        <el-form-item label="应用描述">
          <el-input v-model="model.appDesc"></el-input>
        </el-form-item>
    </template>
    <ying-table-column prop="appName" label="应用名称"></ying-table-column>
    <ying-table-column prop="appDesc" label="应用描述"></ying-table-column>
    <ying-table-column prop="clientId" label="应用ID"></ying-table-column>
    <ying-table-actions>
      <ying-table-action name="check" text="审核"></ying-table-action>
      <ying-table-action name="notify" text="通知"></ying-table-action>
      <ying-table-action name="upload" text="上传"></ying-table-action>
    </ying-table-actions>
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
    }
  }
}
</script>
