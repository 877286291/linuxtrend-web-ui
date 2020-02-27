<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>服务器管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入SN号" v-model="SN" clearable @clear="getServersList"
                    @keyup.enter.native="getServersList">
            <el-button slot="append" icon="el-icon-search" @click="getServersList"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加服务器</el-button>
        </el-col>
      </el-row>
      <el-table :data="serverList" border stripe v-loading="loading" element-loading-text="加载中">
        <el-table-column label="id" prop="id" type="index"/>
        <el-table-column label="SN" prop="sn"/>
        <el-table-column label="HMC" prop="hmc"/>
        <el-table-column label="地区" prop="area"/>
        <el-table-column>
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-tooltip effect="dark" content="编辑服务器" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"/>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除服务器" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" @click="removeServerBySn(scope.row['sn'])"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加服务器" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="SN" prop="sn">
          <el-input v-model="addForm['sn']"/>
        </el-form-item>
        <el-form-item label="HMC" prop="hmc">
          <el-input v-model="addForm['hmc']"/>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-input v-model="addForm['area']"/>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addServerInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改服务器" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="SN" prop="sn">
          <el-input v-model="editForm['sn']" disabled/>
        </el-form-item>
        <el-form-item label="HMC" prop="hmc">
          <el-input v-model="editForm['hmc']"/>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-input v-model="editForm['area']"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editServerInfo">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Servers",
    created() {
      this.getServersList()
    },
    data() {
      const checkIp = (rule, value, callback) => {
        let values = value.replace(/\s+/g, "");
        const regIp = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
        if (regIp.test(values)) {
          return callback()
        }
        return callback(new Error('请输入合法的IP'))
      };
      return {
        loading: true,
        SN: '',
        serverList: [],
        addDialogVisible: false,
        editDialogVisible: false,
        addForm: {
          sn: '',
          hmc: '',
          area: ''
        },
        addFormRules: {
          sn: [
            {required: true, message: '请输入服务器名称', trigger: 'blur'},
          ],
          hmc: [
            {required: true, message: '请输入HMC地址', trigger: 'blur'},
            {validator: checkIp, trigger: 'blur'}
          ],
          area: [
            {required: true, message: '请输入服务器地区', trigger: 'blur'},
          ]
        },
        editForm: {},
        editFormRules: {
          hmc: [
            {required: true, message: '请输入HMC地址', trigger: 'blur'},
            {validator: checkIp, trigger: 'blur'}
          ],
          area: [
            {required: true, message: '请输入服务器地区', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      async getServersList() {
        this.loading = true;
        const {data: res} = await this.$http.get('managerServers', {params: {'SN': this.SN}});
        if (res.meta.status !== 200) return this.$message.error('获取服务器列表失败');
        this.serverList = res.data;
        this.loading = false;
      },
      async addServerInfo() {
        this.$refs.addFormRef.validate(async (valid) => {
          if (!valid) return;
          const {data: res} = await this.$http.post('managerServers', this.addForm);
          if (res.meta.status !== 200) {
            return this.$message.error('添加服务器失败')
          }
          //提示添加用户成功
          this.$message.success('添加服务器成功');
          //关闭对话框
          this.addDialogVisible = false;
          //重新加载用户数据
          this.getServersList()
        })
      },
      editServerInfo() {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return;
          const {data: res} = await this.$http.put('managerServers', this.editForm);
          if (res.meta.status !== 200) return this.$message.error('服务器信息更新失败！');
          //关闭对话框
          this.editDialogVisible = false;
          //刷新列表重新获取数据
          this.getServersList();
          return this.$message.success('服务器信息更新成功！')
        })
      },
      showEditDialog(serverInfo) {
        this.editForm = serverInfo;
        this.editDialogVisible = true
      },
      //监听对话框关闭事件
      addDialogClose() {
        this.$refs.addFormRef.resetFields()
      },
      //监听对话框关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
      },
      async removeServerBySn(sn) {
        //询问用户是否删除
        const info = await this.$confirm('此操作将永久删除该服务器, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err);
        if (info !== 'confirm') {
          return this.$message.info('取消删除')
        }
        const {data: res} = await this.$http.delete('managerServers', {params: {'sn': sn}});
        if (res.meta.status !== 200) return this.$message.error('服务器删除失败！');
        this.$message.success('服务器删除成功！');
        this.getServersList()
      }
    }
  }
</script>

<style scoped>

</style>
