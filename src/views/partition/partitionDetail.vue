<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          事件概览
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "partitionDetail",
    created() {
      this.getPartitionData()
    },
    data() {
      this.chartSettings = {
        stack: {'用户': ['访问用户']},
        area: true,
        dimension: ['日期'],
        metrics: ['访问用户']
      };
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            {'日期': '1/1', '访问用户': 1393},
            {'日期': '1/2', '访问用户': 3530},
            {'日期': '1/3', '访问用户': 2923},
            {'日期': '1/4', '访问用户': 1723},
            {'日期': '1/5', '访问用户': 3792},
            {'日期': '1/6', '访问用户': 4593}
          ]
        },
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        console.log(this.$route.path);
      },
      getPartitionData() {

      }
    }
  }
</script>

<style scoped>

</style>
