<template>
  <ying-table data-url="api/account/page-list">
    <template slot="search"></template>
    <ying-table-column prop="email" label="邮箱"></ying-table-column>
    <ying-table-column prop="nickname" label="姓名"></ying-table-column>
    <ying-table-column prop="roles" label="角色"></ying-table-column>
    <ying-table-actions>
      <ying-table-action name="update" text="审核"></ying-table-action>
      <ying-table-action name="update" text="通知"></ying-table-action>
      <ying-table-action name="update" text="上传"></ying-table-action>
    </ying-table-actions>
  </ying-table>
</template>
