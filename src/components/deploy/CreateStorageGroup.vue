<template>
  <el-button @click="parseData"></el-button>
</template>

<script>
  export default {
    name: "CreateStorageGroup",
    methods: {
      parseData() {
        this.$parent.next('export-wwpn')
      }
    }
  }
</script>

<style scoped>

</style>
