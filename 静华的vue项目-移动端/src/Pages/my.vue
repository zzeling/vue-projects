<template>
    <div class="homeBg" style="height:100%;">
         <div  style="padding-bottom: 20px;">
            <div class="flex  flex-items-center flex-content-between" style="padding:30px 10px 0 10px;">
                
                <div class="flex" style="padding-left:8px">
                    <!-- <div><img src="../assets/img/myLogo.png" alt="" width="50px" height="50px"></div> -->
                    <div>
                        <div class="font-size-elarge" v-if="getUserInfo!=null" > <b>{{getUserInfo.realName}}</b>  </div>
                        <div> <router-link to="/reg" style="color: #fff;opacity: 0.4;" class="font-size-mini">    ID: {{getUserInfo.userId}}</router-link></div>
                    </div>
                    <div style="padding-top:5px;">
                        <div class="flex"> 
                            <i class="star"  v-for="s in list.gradeLevel" :key="s.id"></i> 
                        </div>
                        <div class="font-size-mini color-in bdCenter" v-if="getUserInfo.isTaxationCenter==1" >临时服务中心</div>
                    </div>
                </div>
                <div style="width:50px;text-align:right;margin-right: 10px;"><router-link to="/myMsg"><img src="../assets/img/right.png" alt="" width="13px" height="20px"></router-link> </div>
               
            </div>
            <div class="flex  flex-content-between flex-items-center" style="margin-top:44px;">
               
                 <div class="childBg flex flex-content-around"  @click="toChild()">
                     <i class="childImg"></i>
                     <div style="margin-top:9px;" class="font-size-mini">子账号</div>
                     <div><b class="color-primary" >{{list.subAccountCount}}</b></div>    
                 </div>
                 <mt-button v-if="list.isSubAccount==1" style="border-radius: 30px;width:50%;height:60px;" size="normal" type="primary" @click="mainAcc"> <b>返回主账号</b> </mt-button>
                 <mt-button v-else style="border-radius: 30px;width:50%;height:60px;" size="normal" type="primary" @click="CollectEP()"> <b>一键收EP</b> </mt-button>
              </div>
            <div style="margin-top:60px;">
                <div  class="mySet flex flex-items-center" ><img src="../assets/img/set.png" alt="" width="18px" height="18px"> <h1 style="font-size: 16px;margin-left:5px;">设置</h1></div>
                <div style="background: rgba(255,255,255,0.06);padding-left:10px;">
                <div class="myMore" style="padding:0 10px;">
                    <mt-cell  title="下载APP" to="http://hygjabc.com/app.html" is-link value=""> </mt-cell>
                </div>
                <div  v-if="list.isSubAccount==0" class="myMore  " style="padding:0 8px;">
                        <mt-cell  title="修改登录密码" to="/changePwd" is-link value=""> </mt-cell>
                        <mt-cell  title="修改支付密码" to="/payPwd" is-link value=""> </mt-cell>
                        <mt-cell  title="管理银行卡信息" to="/payment" is-link value=""> </mt-cell>
                        <mt-cell  title="继承人信息" to="/HeirInfo" is-link value=""> </mt-cell>
                </div>
                </div>
            </div>
        </div>
            <div style="margin-top:60px;"><footerNav :selected="selected"></footerNav></div>
    </div>
</template>
<script>
import footerNav from '../components/footerNav'
import { MessageBox,Indicator,Toast } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            selected:'my',
            list:''
        }
    },
    components:{
        footerNav
    },
    created:function(){
        if(this.getUserInfo==null||this.getUserInfo==''){
            this.$router.push('/Login')
        }else{
            this.loadList()
        }
    },
    watch:{
        getUserInfo: function(val){
      },
      
    },
    computed: {
      ...mapGetters(['getUserInfo'])
       
    },
    methods:{
         ...mapMutations(['setUserInfo']),
         loadList:function(){
            Indicator.open();
            this.$http.post('app/user/refreshUserInfo',{
                    token:this.getUserInfo.token
                }).then((data)=>{
                    Indicator.close();
                if(data.data.code!=200) return;
                    this.list=data.data.data
            })
        },
        toChild:function(){
             this.$router.push('/childAcc')
        },
        CollectEP:function(){
            this.$http.post('app/user/oneKeyCollectEP',{isCollect:false}).then((data)=>{
                if(data.data.code != 200) return;
                if(this.getUserInfo.isSubAccount==0){
                MessageBox.confirm('总共 '+data.data.data.count+'个账号, '+data.data.data.total+'EP','确定收取EP?').then(action =>{
                    this.$http.post('app/user/oneKeyCollectEP',{isCollect:true}).then((data)=>{
                        if(data.data.code==200){
                            Toast('收取成功')
                        }
                    })
               })
               }else if(this.getUserInfo.isSubAccount==1){
                MessageBox.alert('请切换到主账号后收取','提示').then(action => {})
               }
            })
        },
         mainAcc:function(){
            Indicator.open();
            this.$http.post('/app/user/backToPrimaryAccount').then((data)=>{
                Indicator.close();
                if(data.data.code!=200) return;
                    this.mainUserInfo=data.data.data
                    this.setUserInfo(this.mainUserInfo)
                    this.loadList()
            })
        },
         
    }
}
</script>
<style secoped>


</style>

