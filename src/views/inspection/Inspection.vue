<template>
  <div>
    <!-- 面包屑头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>巡检</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 巡检内容 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="success" @click="exportExcel">导出</el-button>
        </el-col>
      </el-row>
      <el-table :data="inspectionData" tyle="width: 100%" stripe v-loading="loading" id="inspection">
        <el-table-column prop="id" label="id" type="index" align="center"/>
        <el-table-column prop="problem" label="问题概述" align="center"/>
        <el-table-column prop="sn" label="主机SN" align="center"/>
        <el-table-column prop="datetime" label="最后更新时间" align="center"/>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum"
              :page-sizes="[30, 50, 100]"
              :page-size="queryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    name: "Inspection",
    created() {
      this.getInspectionData()
    },
    data() {
      return {
        inspectionData: [],
        queryInfo: {
          pageNum: 1,
          pageSize: 30
        },
        total: 0,
        loading: true
      }
    },
    methods: {
      async getInspectionData() {
        this.loading = true;
        const {data: res} = await this.$http.get('inspection', {params: this.queryInfo});
        if (res.meta.status !== 200) return this.$message.error('获取巡检数据失败');
        this.total = res.data.total;
        this.loading = false;
        this.inspectionData = res.data['inspection_data'];
      },
      handleSizeChange(newSize) {
        this.queryInfo.pageSize = newSize;
        this.getInspectionData()
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage;
        this.getInspectionData()
      },
      exportExcel() {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#inspection'));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '巡检结果.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
    }
  }
</script>

<style scoped>

</style>
