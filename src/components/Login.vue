<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 頭像區塊 -->
            <div class="avatar_box">
                <img src="../assets/54.jpg" alt="">
            </div>
            <!-- 登入表單區塊 -->
            <!-- 帳號 -->
            <el-form :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
            <!-- 密碼 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
            <!-- 按鈕 -->
                <el-form-item class="btns">
                    <el-button type="primary">登入</el-button>
                    <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      // 登入表單的數據綁定物件
      loginForm: {
        username: '',
        password: ''
      },
      // 表單驗證規則物件
      loginFormRules: {
        // 驗證帳號是否符合
        username: [
          { required: true, message: '請輸入您的帳號', trigger: 'blur' },
          { min: 3, max: 10, message: '長度在3到10個字符之間', trigger: 'blur' }
        ],
        // 驗證密碼是否符合
        password: [
          { required: true, message: '請輸入您的密碼', trigger: 'blur' },
          { min: 6, max: 15, message: '長度在6到15個字符之間', trigger: 'blur' }
        ]
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.login_container {
    height: 100%;
    background:  #80976c;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    // 物件置中
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns {
    display: flex;
    justify-content: flex-end;
}

</style>
