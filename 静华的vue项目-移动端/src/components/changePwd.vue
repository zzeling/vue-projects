<template>
  <div>
        <div>
        <mt-header title="修改登录密码">
            <router-link to="/my" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        </div>
        <div style="margin-top:16px;" class="cPwd">
            <mt-field label="原登录密码" placeholder="请输入原密码" type="password" v-model="password"></mt-field>
            <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="pwd"></mt-field>
            <mt-field label="确认密码" placeholder="请确认密码无误" type="password" v-model="rpwd"></mt-field>
        </div>
        <p class="font-size-mini" style="padding:0 10px;color:#B2B2B2;">*修改后须重新登录账号</p>
        <div style="padding:0 10px;">
        <mt-button @click="submit()"  style="margin-top:65px;color: #A9A9A9;" size="large" type="primary">确认修改</mt-button>
        </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            password:'',
            pwd:'',
            rpwd:'',
            pwdReg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
        }
    },
    methods:{
        submit:function(){
            if(this.password==""){
                Toast('请输入原密码');
                return;
            }
            if(this.pwd==""){
                Toast('请输入新密码');
                return;
            }
            if(!this.pwdReg.test(this.pwd)){
                Toast('密码需6-20位数字字母组合');
                return;
            }
             if(this.pwd!=this.rpwd){
                Toast('请确认密码一致');
                return;
            }
            
            this.$http.post('app/user/editPwd',{
                oldPwd:this.password,
                newPwd:this.pwd,
                type:0
            }).then((data) => {
                if(data.data.code == 200){
                Toast({
                     message: '修改成功,请重新登录！',
                     iconClass: 'mint-toast-icon mintui mintui-success'
                     });
                this.$router.push('/login')
              }else{
                Toast({ message: data.data.message });
              }
            },(error)=>{
            console.log(error);
             Toast({
                message: '提交失败！',
                iconClass: 'mint-toast-icon mintui mintui-field-error'
            });
          })
        }
    }
}
</script>
