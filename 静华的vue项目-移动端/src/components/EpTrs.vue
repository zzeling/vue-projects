<template>
    <div>
        <mt-header title="EP转账">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
             <mt-button style="color: rgb(254, 204, 93);font-size:12px;" @click="TrsRule()"  slot="right">转账规则</mt-button>
        </mt-header>
        <div class="text-center  epBg">
            <!-- <div style="padding-top:35px;color:#F9AAA7;">我的现金积分</div>  
            <h1 class="color-write">{{list.cashIntegral}}</h1> -->
            <!-- <p><span style="color:#F9AAA7;"> 预计收入</span><b class="color-write">&nbsp; 555</b></p> -->
            <div class="EpS" style="margin-top:24px;">
                <!-- <mt-cell title="我要转账" readonly value="记录" to="/EpTrsList" is-link></mt-cell> -->
                <div class="reg">
                    <div style="border-bottom:1px solid rgba(216,216,216,0.10);padding-top:20px;">
                        <mt-field label="EP" style="color: #FC6A65;" placeholder="转出数量" v-model="EpNum"></mt-field>
                    </div>
                    <div class="reg" style="border-bottom:1px solid rgba(216,216,216,0.10);margin-top:24px;">
                        <mt-field  label="给" v-model="ToId"  @blur.native.capture="handleinput"  placeholder="玩家ID" ></mt-field>
                    </div>
                    <div  class="baodan" v-if="showBd==true" style="border-bottom:1px solid rgba(216,216,216,0.10);">
                        <mt-cell  :title="ToMsg.userName" :value="ToMsg.isTaxationCenter==1&&ToMsg!=null&&ToMsg!=''?'临时服务中心':'该用户不是临时服务中心'"></mt-cell>
                    </div>
                    <div style="border-bottom:1px solid rgba(216,216,216,0.10);margin-top:24px;">
                        <mt-field  type="password"   placeholder="请输入支付密码" v-model="epPwd"></mt-field>
                    </div>
                </div>
            </div>
            <div class="padding-r-l">
                <mt-button style="margin-top:32px;" @click="submit()"   size="large" type="primary">转账</mt-button>
            </div>   
        </div>
        
    </div>
</template>
<script>
import { Toast,Indicator  } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            EpNum:'',
            epPwd:"",
            ToId:'',
            list:'',
            ToMsg:'',
            mainId:'',
            showBd:false
          }
    },
    watch:{
        getUserInfo: function(val){
      },
    },
    computed: {
      ...mapGetters(['getUserInfo']), 
    },
    created:function(){
        this.loadList();
        
    },
    methods:{
         ...mapMutations(['setUserInfo']),
        handleinput:function(){
            
            if(this.ToId==null||this.ToId=='') return;
             this.$http.post('app/user/getTransferUserInfo',{userId:this.ToId}).then((data)=>{
                  if(data.data.code==200){
                      this.showBd=true;
                      this.ToMsg=data.data.data
                    }else if(data.data.code==400){
                        this.showBd=false;
                        this.ToMsg=''
                    }
                 
            },err=>{
                this.showBd=false;
            })
        },
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
        TrsRule:function(){
            this.$router.push('/EpTrsRule')
         },
        submit:function(){
            if(this.EpNum==''|| (!Number(this.EpNum))){
                Toast('请输入转出数量')
                return;
            }
            if(this.ToId=="" || (!Number(this.ToId))){
                Toast('请输入对方玩家ID')
                return;
            }
            if(this.epPwd==""){
                Toast('请输入支付密码')
                return;
            }
            this.$http.post('app/userIntegral/transferIntegral',{
                transferCount:this.EpNum,
                receiverId:this.ToId,
                tradePwd:this.epPwd
            }).then((data)=>{
                if(data.data.code==200){
                    this.epPwd=''
                    this.loadList()
                 Toast({
                    message: '转账成功',
                     iconClass: 'mint-toast-icon mintui mintui-success'
                   })
                   }
            })

        }
    }
}
</script>
<style scoped>

</style>
