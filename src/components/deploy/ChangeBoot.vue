<template>
    <div>
        <el-table :data="installInfo" tyle="width: 100%" stripe v-loading="loading" element-loading-text="更改启动项中"
                  id="changeBootInfo">
            <el-table-column prop="id" label="id" type="index"/>
            <el-table-column prop="lparName" label="分区名称"/>
            <el-table-column prop="result" label="安装结果"/>
            <el-table-column prop="reason" label="原因"/>
        </el-table>
        <el-button id="nextStep" type="primary" @click="nextStep">完成</el-button>
    </div>
</template>

<script>
    export default {
        name: "ChangeBoot",
        created() {
            this.changeBoot()
        },
        data() {
            return {
                loading: true,
                changeInfo: []
            }
        },
        methods: {
            async changeBoot() {
                this.loading = true;
                const {data: res} = await this.$http.put('changeBoot',{bootDevice:'storage-volume'});
                if (res.meta.status !== 200) return this.$message.error('系统安装失败');
                this.changeInfo = res.data;
                this.loading = false;
            },
            nextStep() {
                this.$parent.next('deploy-complete')
            }
        }
    }
</script>

<style scoped>

</style>