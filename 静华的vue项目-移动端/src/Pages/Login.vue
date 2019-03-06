<template>
    <div >
        <!-- <div style="padding:0 10px;"> -->
        <div class="color-in text-center" style="padding-top:30px;">
            <img src="../assets/img/logo.png" alt="" height="60px">
             <!-- <h1  style="color: #FECC5D;font-size:16px;margin:0;letter-spacing: 6px;">华裔国际</h1> -->
        </div>
        <div class="loginBgk" >
            <!-- <img class="loginBgk" src="../assets/img/loginBg.png" alt="" width="100%"> -->
            <form @submit.prevent="isLogin"  class="reg">
            <div class="background-white loginBord">
                <div class="text-center deluBg"><h1 style="padding-top:22px;font-size:20px;color:#363949;">登录</h1> </div>
                
                   <mt-field style="padding:0 20px;"  placeholder="用户名需6-20位数字字母组合" v-model="name"></mt-field>
                    <div class="sPwd" style="margin-top:24px;padding:0 20px;">
                        <mt-field  placeholder="密码6-20位数字字母组合" type="password" v-model="pwd"></mt-field>
                    </div>
            </div>
                    <div class="text-center loginBtn" style="margin-top:-25px;">
                        <mt-button style="border-radius: 24px;width:60%;" size="normal" type="primary" :disabled="logining" v-if="this.name!=''&&pwdReg.test(pwd)">
                            <mt-spinner v-show="logining"  type="triple-bounce"></mt-spinner>
                            {{logining?"":"登录"}}
                        </mt-button>
                        <mt-button style="border-radius: 24px;width:60%;" size="normal" type="primary" v-else>登录</mt-button>
                    </div>
               
             </form>
            <!-- <div class="loginBgk"></div> -->
        </div>      
    </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { Toast  } from 'mint-ui'
export default {
    name:'login',
    data(){
        return {
            selected:"home",
            name:'',
            pwd:'',
            logining: false,
            pwdReg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
        }
    },
    methods:{
        ...mapMutations(['setUserInfo']),
        pwdText:function(){
                this.showId=false
        },
        isLogin:function(){
            if(!this.pwdReg.test(this.name)){
                Toast('用户名需6-20位数字字母组合')
                return false;
            }
             if(!this.pwdReg.test(this.pwd)){
                Toast('密码需6-20位数字字母组合')
                return false;
            }
            this.logining = true;
            this.$http.post("app/user/userLogin",{
                userName:this.name,
                pwd:this.pwd
            }).then((data) =>{
                this.logining = false;
                if(data.data.code != 200){return};
                    data.data.data.pwd = this.pwd;
                    this.setUserInfo(data.data.data);
                    this.userName = '';
                    this.pwd = '';
                    this.$router.push('/home');
                
            },error=>{
            this.logining = false;
          })
        }
    }
}
</script>
<style scoped>
.sPwd{position:relative;}
.pwdPic{
    position: absolute;
    right: 25px;
    top: 11px; 
    width: 24px;height:24px;
}
.upwd{
    background: url('../assets/images/pwd.png') no-repeat center;
    background-size:85%;
    }
.lpwd{
    background: url('../assets/images/uPwd.png') no-repeat center;
    background-size: 90%;
}
.loginBgk{
    background:url('../assets/img/loginBg.png') no-repeat center center; 
    width: 100%;
    height:80%;
    /* height: 162px;  */
    background-size: 100% 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:-999;
}
.loginBord{
    width:89%;margin:0 auto;
    border-radius: 8px;
    margin-top:55px;
    height: 245px;
    box-shadow: 0 10px 10px 0 #2667CF;
}
.deluBg{
     background:url('../assets/img/delu.png') no-repeat center 0; 
     background-size: 100%;
     height:70px;
     width:100px;margin:0 auto;
}

</style>