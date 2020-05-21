<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col :span="3"><img :src="'data:image/png;base64,'+head_img" class="avatar"></el-col>
                <el-col :span="6">
                    <el-upload
                            class="upload-demo"
                            drag
                            :http-request="uploadHeadImage"
                            :limit="1" auto-upload action="">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将头像拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="6">
                    <el-form label-position="left" label-width="80px" :model="formLabelAlign">
                        <el-form-item label="用户名">
                            <el-input v-model="formLabelAlign.username" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="formLabelAlign.password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="formLabelAlign.email"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "UserCenter",
        created() {
            this.getHeadImg();
        },
        data() {
            return {
                head_img: "",
                formLabelAlign: {
                    username: '',
                    password: '',
                    email: ''
                }
            }
        },
        methods: {
            async getHeadImg() {
                const {data: res} = await this.$http.get('get_head_img', {params: {}});
                if (res.meta.status !== 200) return this.$message.error('用户头像获取失败');
                this.$message.success('用户头像获取成功');
                this.head_img = res.data
            },
            async uploadHeadImage(content) {
                const form = new FormData();
                form.append("head_img", content.file);
                const {data: res} = await this.$http.post('upload_head_img', form);
                if (res.meta.status !== 200) return this.$message.error('用户头像上传失败');
                await this.getHeadImg();
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>