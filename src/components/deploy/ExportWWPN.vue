<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="success" @click="exportExcel">导出</el-button>
        </el-col>
      </el-row>
      <el-table :data="wwpnData" tyle="width: 100%" stripe v-loading="loading" id="wwpnData">
        <el-table-column prop="id" label="id" type="index"/>
        <el-table-column prop="cpcName" label="CPC名称"/>
        <el-table-column prop="SG" label="SG名称"/>
        <el-table-column prop="size" label="SG大小"/>
        <el-table-column prop="operation" label="SG操作"/>
        <el-table-column prop="usage" label="SG类型"/>
        <el-table-column prop="wwpn" label="WWPN"/>
      </el-table>
      <el-button id="nextStep" type="primary" @click="nextStep">下一步</el-button>
    </el-card>
  </div>
</template>

<script>
  import XLSX from "xlsx";
  import FileSaver from "file-saver";

  export default {
    name: "ExportWWPN",
    created() {
      this.getWWPN()
    },
    data() {
      return {
        loading: true,
        wwpnData: []
      }
    },
    methods: {
      async getWWPN() {
        this.loading = true;
        const {data: res} = await this.$http.get('exportWWPN');
        if (res.meta.status !== 200) return this.$message.error('导出WWPN失败');
        this.wwpnData = res.data;
        this.loading = false;
      },
      exportExcel() {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#wwpnData'));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '导出WWPN.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      nextStep() {
        this.$parent.next('create-partition')
      }
    }
  }
</script>

<style scoped>
  #nextStep{
    margin-top: 20px;
  }
</style>
