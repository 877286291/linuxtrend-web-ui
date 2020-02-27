<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="4" :offset="1">
        <el-select v-model="queryLog.risk" clearable placeholder="请选择风险等级" @change="getLog">
          <el-option
                  v-for="item in riskOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="queryLog.state_color" clearable placeholder="请选择状态" @change="getLog">
          <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入用户名" v-model="queryLog.username" clearable @clear="getLog"
                  @keyup.enter.native="getLog">
          <el-button slot="append" icon="el-icon-search" @click="getLog"/>
        </el-input>
      </el-col>
    </el-row>
    <el-scrollbar class="page-component__scroll el-scrollbar__wrap" v-loading="loading" element-loading-text="日志加载中">
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
      <el-timeline :reverse="reverse" :style="divHeight">
        <el-timeline-item
                v-for="(log, index) in logs"
                :key="index" :timestamp="log.time" :color="log.state_color" placement="top">
          <el-card>
            <h4>{{'操作：'+log.operation}}</h4>
            <h4>{{'操作返回结果：'+log.response}}</h4>
            <p>{{'操作用户：'+log.username}}</p>
            <p>{{'操作IP：'+log.ip}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "Log",
    created() {
      this.getLog()
    },
    data() {
      return {
        loading: true,
        reverse: true,
        divHeight: 'height:800px',
        logs: [],
        queryLog: {
          username: '',
          risk: '',
          state_color: '',
        },
        riskOptions: [{
          value: '0',
          label: 'info'
        }, {
          value: '1',
          label: 'warning'
        }, {
          value: '2',
          label: 'destroy'
        }],
        riskValue: '',
        stateOptions: [{
          value: '#0bbd87',
          label: '成功'
        }, {
          value: '#dc143c',
          label: '失败'
        }],
        stateValue: ''
      }
    },
    methods: {
      async getLog() {
        this.loading = true;
        const {data: res} = await this.$http.get('log', {params: this.queryLog});
        if (res.meta.status !== 200) return this.$message.error('获取操作日志失败');
        this.logs = res.data;
        this.loading = false;
        this.total = res.data.total
      }
    }
  }
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
</style>
