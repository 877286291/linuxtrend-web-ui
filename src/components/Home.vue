<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" height="48" width="48">
        <span>星联云服运维平台</span>
      </div>
      <el-dropdown>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <el-menu background-color="#373d41" text-color="#fff" active-text-color="#409EFF" unique-opened
                 :collapse="isCollapse" :collapse-transition="false" :default-active="$route.path" router>
          <el-submenu :index="item.id+'' " v-for="item in menuList" :key="item.id" v-if="item.children">
            <template slot="title">
              <i :class="iconObj[item.id]"/>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
              <template slot="title">
                <i class="el-icon-menu"/>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="'/'+item.path">
            <i :class="iconObj[item.id]"/>
            <span>{{item.authName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    created() {
      this.getMenuList()
    },
    name: "Home",
    data() {
      return {
        menuList: [],
        iconObj: {
          '1': 'el-icon-alishouye',
          '2': 'el-icon-alijiankong',
          '3': 'el-icon-alixunjianchulirenyuan',
          '4': 'el-icon-aliyunbushu',
          '5': 'el-icon-alibaojing',
          '6': 'el-icon-aliwj-rz',
          '7': 'el-icon-aliguanli',
        },
        isCollapse: false,
      }
    },
    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$message({
          message: '退出登录',
          type: 'warning'
        });
        this.$router.push('/login')
      },
      async getMenuList() {
        const {data: res} = await this.$http.get('menu');
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.menuList = res.data;
      },
      //点击按钮切换折叠展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
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

  .el-aside .el-menu {
    border-right: None;
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .el-menu [class^=el-icon-] {
    margin-right: 20px;
  }

  .toggle-button {
    background-color: #373d41;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.5em;
    cursor: pointer;
  }

</style>
