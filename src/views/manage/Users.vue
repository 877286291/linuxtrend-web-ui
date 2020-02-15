<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList"
                    @keyup.enter.native="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe v-loading="loading" element-loading-text="加载中">
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
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"/>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"/>
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
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"/>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Users",
    created() {
      this.getUserList()
    },
    data() {
      //验证邮箱
      var checkEmail = (rule, value, callback) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
          return callback()
        }
        callback(new Error('请输入合法的邮箱'))
      };
      return {
        queryInfo: {
          query: '',
          //当前页数
          pageNum: 1,
          //当前每页显示多少条数据
          pageSize: 2,
        },
        userList: [],
        total: 0,
        addDialogVisible: false,
        editDialogVisible: false,
        //添加表单
        addForm: {
          username: '',
          password: '',
          email: ''
        },
        editForm: {},
        //添加表单验证规则
        addFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 10, message: '密码的长度在6-18个字符之间', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ]
        },
        editFormRules: {
          // username: [
          //   {required: false, message: '请输入用户名', trigger: 'blur'},
          //   {min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur'}
          // ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ]
        },
        loading: true
      }
    }, methods: {
      async getUserList() {
        this.loading = true;
        const {data: res} = await this.$http.get('users', {params: this.queryInfo});
        if (res.meta.status !== 200) return this.$message.error('获取用户列表失败');
        this.userList = res.data['users'];
        this.loading = false;
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
        const {data: res} = await this.$http.put('users', {'id': userInfo.id, 'type': userInfo.state});
        if (res.meta.status !== 200) {
          userInfo.state = !userInfo.state;
          return this.$message.error('修改用户状态失败')
        }
        this.$message.success('修改用户状态成功')
      },
      //监听对话框关闭事件
      addDialogClose() {
        this.$refs.addFormRef.resetFields()
      },
      //监听对话框关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
      },
      //点击按钮添加新用户
      addUser() {
        this.$refs.addFormRef.validate(async (valid) => {
          if (!valid) return;
          const {data: res} = await this.$http.post('users', this.addForm);
          if (res.meta.status !== 200) {
            return this.$message.error('添加用户失败')
          }
          //提示添加用户成功
          this.$message.success('添加用户成功');
          //关闭对话框
          this.addDialogVisible = false;
          //重新加载用户数据
          this.getUserList()
        })
      },
      //展示编辑用户的对话框
      showEditDialog(userInfo) {
        this.editForm = userInfo;
        this.editDialogVisible = true
      },
      //修改用户信息并提交
      editUserInfo() {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return;
          const {data: res} = await this.$http.put('users', {'id': this.editForm.id, 'email': this.editForm.email});
          if (res.meta.status !== 200) return this.$message.error('用户信息更新失败！');
          //关闭对话框
          this.editDialogVisible = false;
          //刷新列表重新获取数据
          this.getUserList();
          return this.$message.success('用户信息更新成功！')
        })
      },
      //根据id删除用户信息
      async removeUserById(id) {
        //询问用户是否删除
        const info = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err);
        if (info !== 'confirm') {
          return this.$message.info('取消删除')
        }
        const {data: res} = await this.$http.delete('users', {params: {'id': id}});
        if (res.meta.status !== 200) return this.$message.error('用户删除失败！');
        this.$message.success('用户删除成功！');
        this.getUserList()
      }

    }

  }
</script>

<style scoped>

</style>
