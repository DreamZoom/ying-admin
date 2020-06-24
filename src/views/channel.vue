<template>
  <ying-page-wapper>
    <ying-table :service="service" title="栏目列表"></ying-table>
  </ying-page-wapper>
</template>

<script>
import channelService from "../service/channel";
export default {
  data() {
    return {

    };
  },
  methods: {

    service(){
      return channelService;
    }


  }
};
</script>