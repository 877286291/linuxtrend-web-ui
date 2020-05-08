<template>
    <div>
    </div>
</template>

<script>
    export default {
        name: "DeployComplete",
        created() {
            const h = this.$createElement;
            this.$notify({
                title: '部署成功！',
                message: h('i', {style: 'color: teal'}, '系统自动化部署完成！请登录HMC查看'),
                showClose: false
            });
        }
    }
</script>

<style scoped>

</style>