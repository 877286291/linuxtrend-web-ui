<template>
  <div>
    <el-button round @click="logout">退出</el-button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$message({
          message:'退出登录',
          type:'warning'
        });
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
