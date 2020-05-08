<template>
    <div>
        <el-table :data="installInfo" tyle="width: 100%" stripe v-loading="loading" element-loading-text="系统安装中"
                  id="installInfo">
            <el-table-column prop="id" label="id" type="index"/>
            <el-table-column prop="lparName" label="分区名称"/>
            <el-table-column prop="result" label="安装结果"/>
            <el-table-column prop="reason" label="原因"/>
        </el-table>
        <el-button id="nextStep" type="primary" @click="nextStep">下一步</el-button>
    </div>
</template>

<script>
    export default {
        name: "InstallOs",
        created() {
            this.installOs()
        },
        data() {
            return {
                loading: true,
                installInfo: []
            }
        },
        methods: {
            async installOs() {
                this.loading = true;
                const {data: res} = await this.$http.get('installOs');
                if (res.meta.status !== 200) return this.$message.error('系统安装失败');
                this.installInfo = res.data;
                this.loading = false;
            },
            nextStep() {
                this.$parent.next('change-boot')
            }
        }
    }
</script>

<style scoped>

</style>