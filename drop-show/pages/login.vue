<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item class="input-prepend restyle" prop="username" :rules="[{ 
required: true, message: '请输入用户名', trigger: 'blur' }]">
          <div >
            <el-input type="text" placeholder="用户名" v-model="user.username"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend" prop="password" :rules="[{ required: 
true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>
        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
              <a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login">
              <i class="iconfont icon-weixin"/>
              </a>
         </li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont 
icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
  import loginApi from '@/api/login'

  export default {
    layout: 'sign',
    data () {
      return {
          user:{
          username:'',
          password:''
        },
        loginInfo:{}
      }
    },
    methods: {
      submitLogin(){
            loginApi.submitLogin(this.user).then(response => {
              if(response.data.success){
                //把token存在cookie中、也可以放在localStorage中
                cookie.set('user_token', response.data.data.token, { domain: 'localhost' })
                //登录成功根据token获取用户信息
                loginApi.getLoginInfo().then(response => {
                  
                  this.loginInfo = response.data.data.userInfo
                  //将用户信息记录cookie
                  cookie.set('user_info', this.loginInfo, { domain: 'localhost' })
                  //跳转页面
                  window.location.href = "/";
                })
              }
            })
      }
    }
  }
</script>

<style>
   .el-form-item__error{
    z-index: 9999999;
    }
</style>