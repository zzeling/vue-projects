<template>
    <div class="text-center padding-r-l">
        <div  class="regBg">
            <div style="margin-top:100px;">
                <div class="regImg"><img src="../assets/img/suc.png" alt="" width="70px" height="70px"></div>
                <div class="color-in " style="font-weight:bold;padding-top:55px;">注册成功</div>
                <div style="color:#D8D8D8;margin-top:60px;">玩家ID</div>
                <div class="color-g font-size-big" style="margin-top:12px;">{{newId}}</div>
            </div>
            <div class="reg-Log">
                <mt-button @click="login()"  style="margin-top:65px;width:60%;margin:0 auto;" size="large" type="primary">登录账号</mt-button>
            </div>
        </div>
        <router-link to="/home"><div class="color-c font-size-medium" style="margin-top:21px;">返回首页</div></router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
            newId:''
        }
    },
    created:function(){
        this.newId=this.$route.query.id
    },
    methods:{
        login:function(){
            this.$router.push('/login')
        }
    }
}
</script>
<style>


</style>

