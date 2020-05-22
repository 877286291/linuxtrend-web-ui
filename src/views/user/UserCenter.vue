<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col :span="3"><img :src="'data:image/png;base64,'+headImg" class="avatar"></el-col>
                <el-col :span="6">
                    <el-upload
                            class="upload-demo"
                            drag
                            :http-request="uploadHeadImage"
                            auto-upload action="">
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
                    <el-form label-position="left" label-width="80px" :model="userProfile" ref="userProfile">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userProfile.username" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="userProfile.password" :disabled="disabledPassword">
                                <el-button slot="append" icon="el-icon-edit" @click="changePassword"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPassword">
                            <el-input type="password" v-model="userProfile.checkPassword"
                                      :disabled="disabledCheckPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userProfile.email" :disabled="disabledEmail">
                                <el-button slot="append" icon="el-icon-edit" @click="changeEmail"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <!--                            <el-button type="info">重置</el-button>-->
                            <el-button type="primary" @click="updateUserProfile">提交</el-button>
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
            this.getUserProfile();
        },
        data() {
            const validatePassword = (rule, value, callback) => {
                if (value === '' && (this.userProfile.password !== '')) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userProfile.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                headImg: "",
                userProfile: {
                    username: '',
                    password: '',
                    checkPassword: '',
                    email: ''
                },
                disabledPassword: true,
                disabledCheckPassword: true,
                disabledEmail: true,
                rules: {
                    checkPassword: [
                        {validator: validatePassword, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            async getHeadImg() {
                const {data: res} = await this.$http.get('get_head_img', {params: {}});
                if (res.meta.status !== 200) return this.$message.error('用户头像获取失败');
                this.headImg = res.data
            },
            async uploadHeadImage(content) {
                const form = new FormData();
                form.append("head_img", content.file);
                const {data: res} = await this.$http.post('upload_head_img', form);
                if (res.meta.status !== 200) return this.$message.error('用户头像上传失败');
                await this.getHeadImg();
            },
            async getUserProfile() {
                const {data: res} = await this.$http.get('get_profile');
                if (res.meta.status !== 200) return this.$message.error('用户信息获取失败');
                this.userProfile.username = res.data.username;
                this.userProfile.email = res.data.email;
            },
            async updateUserProfile() {
                const {data: res} = await this.$http.put('update_user_profile', {
                    username: this.userProfile.username,
                    password: this.userProfile.password,
                    email: this.userProfile.email
                });
                console.log(res);
                if (res.meta.status !== 200) return this.$message.error('用户信息修改失败');
                this.changePassword();
                return this.$message.success("用户信息修改成功！");
            },
            changePassword() {
                this.disabledPassword = !this.disabledPassword;
                this.disabledCheckPassword = !this.disabledCheckPassword;
            },
            changeEmail() {
                this.disabledEmail = !this.disabledEmail;
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