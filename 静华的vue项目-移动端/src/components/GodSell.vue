<template>
    <div>
        <mt-header title="ABC售卖">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
             <mt-button style="color: rgb(254, 204, 93);font-size:12px;" @click="gift"  slot="right">售卖规则</mt-button>
        </mt-header>
        <div class="text-center " style="margin-top:20px;">
            <h1 style="margin:0;">{{list.giftIntegral}}</h1>
            <div class="color-g">ABC</div>  
            
            <div class="flex flex-content-between flex-items-center font-size-mini color-write" style="margin-top:35px;padding:0 21px;" > 
                <div>
                    <div class="font-size-small"><b>{{priceList.giftIntegralPrice}}</b></div>
                    <div class="color-g">当前价格</div>
                </div>
                <div>
                    <div class="font-size-small"><b>{{(list.giftIntegral*priceList.giftIntegralPrice).toFixed(2)}}</b></div>
                    <div class="color-g">总值</div>
                </div>
                <div>
                    <div class="font-size-mini"><b>{{priceList.saleCount==null || priceList.saleCount==undefined?'未指导':priceList.saleCount}}</b></div>
                    <div class="color-g">指导卖出</div>
                </div>
            </div>
            <div class="EpS" style="height:250px;">
                <!-- <mt-cell title="我要卖出" readonly value="记录" to="/ZHSellList" is-link></mt-cell> -->
                <div class="reg" style="margin-top:24px;">
                    <div style="border-bottom:1px solid rgba(216,216,216,0.10);padding-top:34px;">
                        <mt-field label="ABC" style="color: #FC6A65;" placeholder="卖出数量" v-model="EpNum">
                            <span class="font-size-mini color-g" >10的整倍数</span>
                        </mt-field>
                     </div>
                     <p class="font-size-mini" style="text-align:right;color:#D8D8D8;">≈ &nbsp;<b class="color-in">{{EpNum==''?0:(EpNum*this.priceList.giftIntegralPrice).toFixed(2)}}</b> </p>
                    <div style="border-bottom:1px solid rgba(216,216,216,0.10);padding-top:20px;">
                      <mt-field  type="password" style="margin-top:16px;"  placeholder="请输入支付密码" v-model="epPwd"></mt-field>
                    </div>
                </div>
            </div>
            <div class="padding-r-l">
                <mt-button style="margin-top:32px;" @click="submit"   size="large" type="primary">确认卖出</mt-button>
            </div> 

             <!-- <div class="text-left flex padding-r-l  flex-items-center">
                 <h3>ABC买家</h3>
                 <div class="rz">Top 10</div>
             </div>   -->
            <div  class="abcL" v-if="BuyUserList!=null&&BuyUserList!=''&&BuyUserList!=undefined">
                <div class="godHg"><img src="../assets/img/hg.png" alt="" width="23px" height="15px"></div>
                <div class="phb"><h2>买家排行榜</h2> </div>
                <div   class="flex flex-items-center flex-content-between" style="padding:62px 10px 5px 10px;">
                    <div style="width:15%;"></div>
                    <div style="width:35%;color:rgba(255,255,255,0.20);">玩家ID</div>
                    <div style="width:50%;color:rgba(255,255,255,0.20);">激活时间</div>
                </div>
                <div  v-for="(t,index) in BuyUserList" :key="index" style="height:60px;" class="flex  flex-items-center flex-content-between">
                    <div style="width:18%;" :class="index<=2?'fontSty':''">{{index+1}}</div>
                    <div style="width:32%;" class="font-size-medium">{{t.userId}}</div>
                    <div style="width:50%;color:rgba(255,255,255,0.20);">{{t.registerTime}}</div>
                </div>
            </div>
           
        </div>
       
    </div>
</template>
<script>
import { Toast,MessageBox,Indicator   } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            EpNum:'',
            epPwd:"",
            priceList:'',
            tolVal:'',
            BuyUserList:'',
            list:''
        }
    },
    computed: {
      ...mapGetters(['getUserInfo']),
    },
    created:function(){
        this.loadList()
         this.$http.post('app/c2cTrade/getGofParam',{userId:this.getUserInfo.userId}).then((data)=>{
            if(data.data.code != 200) return;
            this.priceList=data.data.data
            if(data.data.data.userList==null)return;
            this.BuyUserList=data.data.data.userList.slice(0,10)
            
        })
    },
    watch:{
        getUserInfo: function(val){},
      
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
        gift:function(){
            this.$router.push('/ZhRule')
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
            MessageBox.confirm('卖出后无法取消','请确认数量是否正确?',).then(action => {
                this.$http.post('app/userIntegral/sellGiftintegral',{
                    sellCount:this.EpNum,
                    tradePwd:this.epPwd
                }).then((data)=>{
                    if(data.data.code==200){
                        MessageBox.alert('详情请查看流水','您已成功卖出ABC').then(action => {
                            this.epPwd=''
                            this.loadList()
                        });
                    }
                },error=>{
                    alert()
                })
            });
        }
    }
}
</script>
<style scoped>
.gofBg{
    background:url('../assets/images/gofBg.png') no-repeat  center center;
    width:100%;height:211px;
    background-size: cover;
}
.gogBord{
    background: #FFFFFF;
    box-shadow: 0 0 16px 0 rgba(113,199,186,0.20);
    border-radius: 4px;
}
.fontSty{
    font-size: 16px;
    color: #4384EC;
    font-weight: bold;
}
.phb{
    width:50%;
    height:60px;
    background: #4384EC;
    box-shadow: 0 10px 10px 0 rgba(54,57,73,0.20);
    border-radius: 30px;
    margin:0 auto;
    /* line-height: 60px; */
    position: absolute;
    left:0;right:0;
    top:-30px;
}
.godHg{
     position:absolute;
     top:-45px;
     left:0;right:0;
     
}
.abcL{
    background: #414351;
    border-radius: 8px;
    margin:100px 20px 0 20px;
    position:relative;
}
</style>
