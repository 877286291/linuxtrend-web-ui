<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column label="id" prop="id" type="index"/>
        <el-table-column label="用户名" prop="username"/>
        <el-table-column label="头像" prop="avatar"/>
        <el-table-column label="邮箱" prop="email"/>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="角色" prop="role"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-tooltip effect="dark" content="编辑用户" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit"/>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete"/>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum"
              :page-sizes="[5, 10, 20]"
              :page-size="queryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Users",
    created() {
      this.getUserList()
    },
    data() {
      return {
        queryInfo: {
          //当前页数
          pageNum: 1,
          //当前每页显示多少条数据
          pageSize: 2,

        },
        userList: [],
        total: 0
      }
    }, methods: {
      async getUserList() {
        const {data: res} = await this.$http.get('users', {params: this.queryInfo});
        if (res.meta.status !== 200) return this.$message.error('获取用户列表失败');
        this.userList = res.data.users;
        this.total = res.data.total
      },
      handleSizeChange(newSize) {
        this.queryInfo.pageSize = newSize;
        this.getUserList()
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage;
        this.getUserList()
      },
      //监听用户状态的改变
      async userStateChanged(userInfo) {
        const {data: res} = await this.$http.put('users', {'id': userInfo.id, 'type': userInfo.state})
        if (res.meta.status !== 200) {
          userInfo.state = !userInfo.state;
          return this.$message.error('修改用户状态失败')
        }
        this.$message.success('修改用户状态成功')
      }

    }

  }
</script>

<style scoped>

</style>
