<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报警</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="hotsName" clearable @clear="getAlertRules"
                    @keyup.enter.native="getAlertRules">
            <el-button slot="append" icon="el-icon-search" @click="getAlertRules"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加报警规则</el-button>
        </el-col>
      </el-row>
      <el-table :data="alertList" border stripe v-loading="loading" element-loading-text="规则加载中">
        <el-table-column label="id" prop="id" type="index"/>
        <el-table-column label="主机名" prop="hostname"/>
        <el-table-column label="CPU" prop="cpu_threshold"/>
        <el-table-column label="内存" prop="memory_threshold"/>
        <el-table-column label="磁盘(读) M/s" prop="disk_in_threshold"/>
        <el-table-column label="磁盘(写) M/s" prop="disk_out_threshold"/>
        <el-table-column label="网络下行 KB/s" prop="net_in_threshold"/>
        <el-table-column label="网络上行 KB/s" prop="net_out_threshold"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-tooltip effect="dark" content="编辑规则" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"/>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除规则" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" @click="removeRuleById(scope.row.id)"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加报警规则" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="主机名" prop="hostName">
          <el-input v-model="addForm.hostName"/>
        </el-form-item>
        <el-form-item label="CPU" prop="cpuThreshold">
          <el-input v-model="addForm.cpuThreshold"/>
        </el-form-item>
        <el-form-item label="内存" prop="memoryThreshold">
          <el-input v-model="addForm.memoryThreshold"/>
        </el-form-item>
        <el-form-item label="磁盘(读) M/s" prop="diskInThreshold">
          <el-input v-model="addForm.diskInThreshold"/>
        </el-form-item>
        <el-form-item label="磁盘(写) M/s" prop="diskOutThreshold">
          <el-input v-model="addForm.diskOutThreshold"/>
        </el-form-item>
        <el-form-item label="磁盘(读) M/s" prop="netInThreshold">
          <el-input v-model="addForm.netInThreshold"/>
        </el-form-item>
        <el-form-item label="磁盘(写) M/s" prop="netOutThreshold">
          <el-input v-model="addForm.netOutThreshold"/>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRule">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改报警规则" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
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
        <el-button type="primary" @click="editRule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Alert",
    created() {
      this.getAlertRules()
    },
    data() {
      const validateThreshold = (rule, value, callback) => {
        if (!value) {
          callback(new Error('必填项'))
        }
        value = Number(value)
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 0 || value > 100) {
            callback(new Error('在 0 至 100 之间'))
          } else {
            callback()
          }
        } else {
          callback(new Error('必须为数字'))
        }
      };
      return {
        loading: true,
        hotsName: '',
        alertList: [],
        addDialogVisible: false,
        editDialogVisible: false,
        //添加表单
        addForm: {
          hostName: '',
          cpuThreshold: '',
          memoryThreshold: '',
          diskInThreshold: '',
          diskOutThreshold: '',
          netInThreshold: '',
          netOutThreshold: ''
        },
        addFormRules: {
          hostName: [
            {required: true, message: '请输入主机名', trigger: 'blur'},
          ],
          cpuThreshold: [
            {validator: validateThreshold, trigger: 'blur', required: true},
          ],
          memoryThreshold: [
            {validator: validateThreshold, trigger: 'blur', required: true},
          ],
          diskInThreshold: [
            {validator: validateThreshold, trigger: 'blur', required: true},
          ],
          diskOutThreshold: [
            {validator: validateThreshold, trigger: 'blur', required: true},
          ],
          netInThreshold: [
            {validator: validateThreshold, trigger: 'blur', required: true},
          ],
          netOutThreshold: [
            {validator: validateThreshold, trigger: 'blur', required: true},
          ],

        },
        //修改表单
        editForm: {
          hostName: '',
          cpuThreshold: '',
          memoryThreshold: '',
          diskInThreshold: '',
          diskOutThreshold: '',
          netInThreshold: '',
          netOutThreshold: ''
        },
        editFormRules: {},
      }
    },
    methods: {
      showEditDialog(userInfo) {
        this.editForm = userInfo;
        this.editDialogVisible = true
      },
      addDialogClose() {
        this.$refs.addFormRef.resetFields()
      },
      //监听对话框关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
      },
      async getAlertRules() {
        this.loading = true;
        const {data: res} = await this.$http.get('alert', {params: {"hostname": this.hotsName}});
        if (res.meta.status !== 200) return this.$message.error('获取报警规则失败');
        this.alertList = res.data;
        this.loading = false;
      },
      async addRule() {
        this.$refs.addFormRef.validate(async (valid) => {
          if (!valid) return;
          const {data: res} = await this.$http.post('alert', this.addForm);
          if (res.meta.status !== 200) return this.$message.error('规则添加失败');
          //提示添加用户成功
          this.$message.success('规则添加成功');
          //关闭对话框
          this.addDialogVisible = false;
          //重新加载用户数据
          this.getAlertRules()
        })
      },
      async editRule() {
      },
      async removeRuleById(id) {
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
