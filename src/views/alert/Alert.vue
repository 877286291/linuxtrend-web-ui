<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报警</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入主机名" v-model="hotsName" clearable @clear="getAlertRules"
                    @keyup.enter.native="getAlertRules">
            <el-button slot="append" icon="el-icon-search" @click="getAlertRules"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加报警规则</el-button>
        </el-col>
      </el-row>
      <el-table :data="ruleList" border stripe v-loading="loading" element-loading-text="规则加载中">
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
        <el-form-item label="网络下行 KB/s" prop="netInThreshold">
          <el-input v-model="addForm.netInThreshold"/>
        </el-form-item>
        <el-form-item label="网络上行 KB/s" prop="netOutThreshold">
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
        <el-form-item label="主机名" prop="hostname">
          <el-input v-model="editForm.hostname" disabled/>
        </el-form-item>
        <el-form-item label="CPU" prop="cpu_threshold">
          <el-input v-model="editForm.cpu_threshold"/>
        </el-form-item>
        <el-form-item label="内存" prop="memory_threshold">
          <el-input v-model="editForm.memory_threshold"/>
        </el-form-item>
        <el-form-item label="磁盘(读) M/s" prop="disk_in_threshold">
          <el-input v-model="editForm.disk_in_threshold"/>
        </el-form-item>
        <el-form-item label="磁盘(写) M/s" prop="disk_out_threshold">
          <el-input v-model="editForm.disk_out_threshold"/>
        </el-form-item>
        <el-form-item label="网络下行 KB/s" prop="net_in_threshold">
          <el-input v-model="editForm.net_in_threshold"/>
        </el-form-item>
        <el-form-item label="网络上行 KB/s" prop="net_out_threshold">
          <el-input v-model="editForm.net_out_threshold"/>
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
      const validateNumber = (rule, value, callback) => {
        value = Number(value)
        if (typeof value === 'number' && !isNaN(value)) {
          callback()
        } else {
          callback(new Error('必须为数字'))
        }
      };
      const validateCpuThreshold = (rule, value, callback) => {
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
        ruleList: [],
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
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateCpuThreshold, trigger: 'blur'},
          ],
          memoryThreshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          diskInThreshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          diskOutThreshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          netInThreshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          netOutThreshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],

        },
        //修改表单
        editForm: {},
        editFormRules: {
          cpu_threshold: [
            {required: true, message: '必填项', trigger: 'blur'},
            {validator: validateCpuThreshold, trigger: 'blur'},
          ],
          memory_threshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          disk_in_threshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          disk_out_threshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          net_in_threshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          net_out_threshold: [
            {trigger: 'blur', required: true, message: '必填项'},
            {validator: validateNumber, trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      showEditDialog(ruleInfo) {
        this.editForm = ruleInfo;
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
        this.ruleList = res.data;
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
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return;
          const {data: res} = await this.$http.put('alert', this.editForm);
          if (res.meta.status !== 200) return this.$message.error('报警规则更新失败！');
          //关闭对话框
          this.editDialogVisible = false;
          //刷新列表重新获取数据
          this.getAlertRules();
          return this.$message.success('报警规则更新成功！')
        })
      },
      async removeRuleById(id) {
        //询问用户是否删除
        const info = await this.$confirm('此操作将永久删除该报警规则, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err);
        if (info !== 'confirm') {
          return this.$message.info('取消删除')
        }
        const {data: res} = await this.$http.delete('alert', {params: {'id': id}});
        if (res.meta.status !== 200) return this.$message.error('规则删除失败！');
        this.$message.success('规则删除成功！');
        this.getAlertRules()
      }
    }
  }
</script>

<style scoped>

</style>
