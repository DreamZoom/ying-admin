<template>
  <ying-page-wapper>
    <div>
      <ying-action request="/api/news/channel/save" :form="{rules}" text="编辑" :data="row">
          <template slot-scope="{model}">
            <a-form-model-item label="用户名" prop="name">
              <!-- <a-input v-model="model.name" type="textarea" /> -->
              <ying-rich-editor v-model="model.name" file-server="/api/files/file/upload"></ying-rich-editor>
              <ying-upload v-model="model.name" prefix="/upload/" action="/api/files/file/upload"></ying-upload>
              <ying-enum-select v-model="model.roles" request="/api/account/role/list"></ying-enum-select>
            </a-form-model-item>
          </template>
      </ying-action>
    </div>
  </ying-page-wapper>
</template>
<script>
export default {
  data() {
    return {
      row: {
        name: "wxl",
        age: 18,
      },
      rules:{
         name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
      }
    };
  },
};
</script>