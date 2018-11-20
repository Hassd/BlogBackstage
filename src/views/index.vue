<template>
<div class="login-background">
    <div class="login">
        <div class="login-left">
            <div><img src="@/assets/Hassd.png" alt="Hassd的博客系统"></div>
            <h2>Hassd的博客系统</h2>
        </div>
        <div class="login-right">
            <div class="login-input">
                <label for="zh">
                    <i class="iconfont icon-wo"></i>
                </label>
                <input type="text" v-model="zh" placeholder="账号">
            </div>
            <div class="login-input">
                <label for="mm">
                    <i class="iconfont icon-mima"></i>
                </label>
                <input type="password" v-model="mm" placeholder="密码">
            </div>
            <button @click="login">登录</button>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            zh:'',
            mm:'',
            yzm:''
        }
    },
    methods:{
        login(){
            if(this.zh!=''&&this.mm!=''){
                axios.post('http://39.108.13.166:3000/admin',{
                    adminid:this.zh,
                    password:this.mm
                })
                .then((data)=>{
                    if(data.data){
                        this.$router.push('/Article_query');
                        window.sessionStorage.adminid=this.zh;
                        window.sessionStorage.password=this.mm;
                    }else{
                        alert('密码或账户错误！')
                    }
                })
                .catch(()=>{
                    console.log('获取失败！')
                })
            }else{
                alert('用户名或密码不能为空！')
            }
        }
    }
}
</script>
<style>
*{margin: 0;padding: 0;}
a{text-decoration: none;}
html{height: 100%;}
body{min-height: 100%;}
nav li{list-style: none;}
.login-background{background: linear-gradient(to right, #2281ef 0%,#22eee2 100%);width: 100%;height: 100%;position: fixed;}
.login{width: 900px;height: 450px;background-color: #fff;position: fixed;top: 50%;left: 50%;margin-left: -450px;margin-top: -225px;border-radius: 10px;box-shadow: 0px 0px 15px #555;}
.login-left{float: left;color: #999;width: 50%;height: 100%;text-align: center;user-select: none;}
.login-left h2{margin: 30px;font-weight: 400;font-size: 18px;}
.login-left div{margin-top: 80px;height: 150px;}
.login-left img{margin-top: 50px;}
.login-right{float: right;width: 50%;margin-top: 150px;}
.login-input{width: 200px;background-color: #fff;height: 30px;margin-bottom: 20px;border: 1px solid #E4E7ED;margin-left: 40px;}
.login button:hover,.login-input:hover{box-shadow: 0 0 5px #999;}
.login-input input{width: 170px;height: 100%;border: 0;outline: none;text-indent: 5px;}
.login-input i{margin: 5px 0 0 10px;color: #999; }
.login button{border: 0;cursor: pointer; background: linear-gradient(to right, #2281ef 0%,#22eee2 100%);display: block;width: 200px;height: 100%;text-align: center;color: #fff;line-height: 30px;margin-left: 40px;}
</style>
