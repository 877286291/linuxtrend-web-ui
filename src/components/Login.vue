<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>

      <div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名" @keyup.enter.native="login"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" @keyup.enter.native="login"/>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: "blur"},
            {min: 3, max: 10, message: '长度只能在3-10之间', trigger: "blur"}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: "blur"},
            {min: 5, max: 15, message: '长度只能在5-15之间', trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return;
          const {data: res} = await this.$http.post('login', this.loginForm);
          if (res.status !== 200) {
            return this.$message.error('登陆失败！')
          }
          this.$message.success('登陆成功');
          window.sessionStorage.setItem('token', res.token)
          await this.$router.push('/home')
        })
      },
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      }
    }
  }
</script>

<style scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }

  .avatar_box img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>
