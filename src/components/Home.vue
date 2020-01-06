<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" height="48" width="48">
        <span>星联云服运维平台</span>
      </div>
      <el-button round @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu background-color="#373d41" text-color="#fff" active-text-color="#ff404b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-4-1">
              <template slot="title">
                <i class="el-icon-location"/>
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$message({
          message: '退出登录',
          type: 'warning'
        });
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header span {
    margin-left: 15px;
  }

  .el-aside {
    background-color: #373d41;
  }

  .el-main {
    background-color: #EAEDF1;
  }

</style>
