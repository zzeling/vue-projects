<template>
    <div>
        <mt-header title="EP挂卖">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
             <mt-button style="color: #FECC5D;font-size:12px;" @click="rule()"  slot="right">挂卖规则</mt-button>
        </mt-header>
        <div class="text-center">
            <!-- <div style="padding-top:35px;color:#F9AAA7;">我的现金积分</div>  
            <h1 class="color-write">{{list.cashIntegral}}</h1>
            <p><span style="color:#F9AAA7;"> 预计收入</span><b class="color-write">&nbsp; {{yjCash.toFixed(2)}}</b></p> -->
            <div class="EpS" style="background: #414351;border-radius: 8px;padding-top:10px;">
                <!-- <mt-cell title="我要卖出" readonly value="记录" to="/EPsellList" is-link></mt-cell> -->
                <div class="reg">
                    <div class="epPad" style="border-bottom:1px solid rgba(216,216,216,0.10);">
                        <mt-field label="EP" style="margin-top:40px;"  placeholder="卖出数量" v-model="EpNum"></mt-field>
                     </div>
                     <div class="epPad" style="border-bottom:1px solid rgba(216,216,216,0.10);">
                     <mt-field style="margin-top:18px;" type="password"  placeholder="请输入支付密码" v-model="epPwd"></mt-field>
                </div>
                </div>
           
            <div style="margin-top:16px;" class="cardSty">
                <mt-cell :title="list.bankName"  to="/payment" >
                    <img slot="icon" v-if="list.bankAccount!=null&&list.bankName=='建设银行'" src="../assets/images/js.png" width="24" height="24">
                    <img slot="icon" v-if="list.bankAccount!=null&&list.bankName=='工商银行'" src="../assets/images/gs.png" width="24" height="24">
                    <img slot="icon" v-if="list.bankAccount!=null&&list.bankName=='交通银行'" src="../assets/images/jt.png" width="24" height="24">
                    <img slot="icon" v-if="list.bankAccount!=null&&list.bankName=='农业银行'" src="../assets/images/ny.png" width="24" height="24">
                    <img slot="icon" v-if="list.bankAccount!=null&&list.bankName=='邮政银行'" src="../assets/images/Ems.png" width="24" height="24">
                    <img slot="icon" v-if="list.bankAccount!=null&&list.bankName=='中国银行'" src="../assets/images/zg.png" width="24" height="24">
                    <img slot="icon" v-if="list.bankAccount!=null&&list.bankName=='平安银行'" src="../assets/img/paCard.png" width="24" height="24">
                </mt-cell>
            </div>
            <div class="flex text-left padding-r-l flex-content-between" style="padding-top:5px">
                <div style="width:50%;padding-left:3px;">
                   <div style="color:#9B9B9B;">账户名</div> 
                   <div style="margin:5px 0;">{{list.realName}}</div>
                </div>
                <div style="width:50%;" v-if="list.bankAccount!=null">
                   <div style="color:#9B9B9B;">银行卡号</div> 
                   <div style="margin:5px 0;">{{list.bankAccount}}</div>
                </div>
            </div>
         </div>
            <div class="padding-r-l">
                <mt-button style="margin-top:16px;" @click="submit()" size="large" type="primary">卖出</mt-button>
            </div>    
            <div style="height:30px;"></div>
        </div>       
    </div>
</template>
<script>
import { Toast,Indicator } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            EpNum:'',
            epPwd:"",
            list:''
        }
    },
     watch:{
        getUserInfo: function(val){
      },
      
    },
    computed: {
      ...mapGetters(['getUserInfo']),
       yjCash:function(){
           return this.list.cashIntegral>0?this.list.cashIntegral*0.9:0
       }
    },
    created:function(){
        this.loadList()
    },
    methods:{
        ...mapMutations(['setUserInfo']),
        loadList:function(){
            this.$http.post('app/user/refreshUserInfo',{
                token:this.getUserInfo.token
            }).then((data)=>{
            if(data.data.code!=200) return;
                this.list=data.data.data
        })
        },
        submit:function(){
            if(this.EpNum==''|| (!Number(this.EpNum))){
                Toast('请输入卖出数量')
                return;
            }
            if(this.epPwd==""){
                Toast('请输入支付密码')
                return;
            }
            Indicator.open();
            this.$http.post('app/c2cTrade/sellEP',{
               epCount:this.EpNum,
               tradePwd:this.epPwd
            }).then((data)=>{
                Indicator.close();
               if(data.data.code == 200){
                   this.epPwd=''
                   this.loadList()
                   Toast({
                    message: '卖出成功',
                     iconClass: 'mint-toast-icon mintui mintui-success'
                   })
               };
            })
        },
        rule:function(){
            this.$router.push('/EPrule')
        }
    }
}
</script>
