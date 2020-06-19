<template>
  <ying-page-wapper>
    <a-card :bordered="false">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
      <div>
        channel
        <router-view></router-view>
      </div>
    </a-card>
  </ying-page-wapper>
</template>