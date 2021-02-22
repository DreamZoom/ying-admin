<template>
  <a-checkbox-group
    v-if="multiple"
    :value="checkedValue"
    :options="list"
    @change="onChange"
  />
  <a-radio-group v-else :value="innerValue" :options="list" @change="onChange" />
</template>
<script>
export default {
  name: "YingEnumSelect",
  props: {
    request: {
      type: [String, Function],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    value: null,
    valueKey: {
      type: String,
      default: "name",
    },
  },
  data() {
    return {
      list: [],
      innerValue:null
    };
  },
  computed:{
    checkedValue(){
      var v = this.value||"";
      return v.split(",");
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.handleRequest().then((response) => {
        if (response.data instanceof Array) {
          this.list = response.data.map((item) => item[this.valueKey]);
        } else {
          console.warn("data is must be a array");
        }
      });

      if(this.multiple && this.value && typeof this.value ==='string' ){
          this.innerValue = this.value.split(",");
      }
      else{
        this.innerValue = this.value;
      }
    },
    handleRequest(data) {
      return Promise.resolve().then(() => {
        if (typeof this.request === "string") {
          return this.$request.post(this.request, { ...data });
        } else if (typeof this.request === "function") {
          return this.request.apply(this, [{ ...data }]);
        } else {
          return Promise.reject({ message: "request param type error" });
        }
      });
    },
    onChange(v) {
      console.log(v);
      var  value = v;
      if(v instanceof Array){
        value = v.join(',');
      }
      this.$emit("input", value);
    },
  },
};
</script>