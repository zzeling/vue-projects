<template>
    <div>
        <mt-header title="订单详情">
            <router-link to="/exchange" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div  v-if="detailList.orderStatus!=1||detailList.buyerStatus==1">
            <div class="cardBg">
                <div class="flex flex-content-between ">
                    <div class="flex ">
                        <img src="../assets/img/myLogo.png" alt=""  height="48px">
                        <div><b style="color:#fff;" class="font-size-medium">{{detailList.seller}}</b>
                            <div class="font-size-mini color-g">{{detailList.createTime}}</div>
                        </div>
                    </div>
                        <div style="color:#FC6A65;">
                            {{detailList.orderStatus==0?'挂单中':detailList.orderStatus==1?'交易中':detailList.orderStatus==2?'交易完成':detailList.orderStatus==6?'已撤单':detailList.orderStatus==3&&detailList.buyerStatus==1?'卖家确认超时':detailList.orderStatus==3&&detailList.buyerStatus==2?'买家支付超时':'管理员处理'}}
                        </div>
                </div>
                <div  style="margin-top:50px;">
                    <div class="flex flex-content-between ">
                        <div style="color:#929292;">交易量</div>
                        <div class="font-size-elarge color-in"><b>{{detailList.epCount}}</b></div>
                    </div>
                    <div class="flex flex-content-between " style="margin-top:30px;">
                        <div style="color:#929292;">金额</div> <div><b class="font-size-elarge ">{{detailList.amountOfMoney}}</b>  </div>
                    </div>
                   
                    <div class="flex   flex-items-center flex-content-between" style="margin-top:30px;" v-if="detailList.orderStatus!=0&&detailList.orderStatus!=6">
                        <div style="color:#929292;"  >买家ID</div>
                        <div><b  class="font-size-medium">{{detailList.buyer}}</b></div>
                    </div>
                     <div class="flex flex-content-between " style="margin-top:30px;" v-if="detailList.orderStatus!=0&&detailList.orderStatus!=6">
                        <div style="color:#929292;" >卖家号码</div> <div><b>{{detailList.sellerPhone}}</b>  </div>
                    </div>
                    <div class="flex   flex-items-center flex-content-between" style="margin-top:30px;" v-if="detailList.orderStatus!=0&&detailList.orderStatus!=6">
                        <div style="color:#929292;"  >买家号码</div>
                        <div><b>{{detailList.buyerPhone}}</b></div>
                    </div>
                     <div v-if="detailList.orderStatus==1||detailList.orderStatus==3" style="margin-top:30px;" class="flex   flex-items-center flex-content-between">
                        <p  style="color:#929292;">超时时间</p>
                        <p><b>{{detailList.overTime}}</b></p>
                    </div>
                </div>
            </div>
            <div style="color:#929292;padding:0 10px;" v-if="detailList.orderStatus!=2">
                <p class="font-size-mini">* 买入后请于 <b>3小时内 </b>完成支付，否则您的账户将被冻结。</p>
            </div>
        </div>
         
        <!-- <div  style="margin-top:8px;color:#929292;">
            <div class="flex  padding-r-l flex-items-center flex-content-between">
                <p>卖家</p>
                <p><b style="color:#4A4A4A;" class="font-size-medium">{{detailList.seller}}</b></p>
            </div>
            <div class="flex  padding-r-l flex-items-center flex-content-between">
                <div>买家</div>
                <div><b style="color:#4A4A4A;" class="font-size-medium">{{detailList.buyer}}</b></div>
            </div>
            <div class="flex  padding-r-l flex-items-center flex-content-between">
                <p>挂单时间</p>
                <p><b style="color:#4A4A4A;">{{detailList.createTime}}</b></p>
            </div>
            <div v-if="detailList.orderStatus==1" class="flex  padding-r-l flex-items-center flex-content-between">
                <p>超时时间</p>
                <p><b style="color:#4A4A4A;">{{detailList.overTime}}</b></p>
            </div>
        </div> -->
         <div v-if="detailList.orderStatus==1&&detailList.buyerStatus!=1" class="text-center">
                <p>倒计时</p>
                <p><b style="color:#4384EC;font-size:24px;">{{`${hr}:${min}:${sec}`}}</b></p>
        </div>
        <div v-if="detailList.orderStatus==1&&detailList.buyerStatus!=1" class="orderCard" style="padding:6px;margin-top:55px;">
            <div  class="text-center" >
                    <mt-cell :title="detailList.bankName" >
                        <!-- <img slot="icon"  src="../assets/images/js.png" width="24" height="24"> -->
                        <img slot="icon" v-if="detailList.account!=null&&detailList.bankName=='建设银行'" src="../assets/images/js.png" width="24" height="24">
                        <img slot="icon" v-if="detailList.account!=null&&detailList.bankName=='工商银行'" src="../assets/images/gs.png" width="24" height="24">
                        <img slot="icon" v-if="detailList.account!=null&&detailList.bankName=='交通银行'" src="../assets/images/jt.png" width="24" height="24">
                        <img slot="icon" v-if="detailList.account!=null&&detailList.bankName=='农业银行'" src="../assets/images/ny.png" width="24" height="24">
                        <img slot="icon" v-if="detailList.account!=null&&detailList.bankName=='邮政银行'" src="../assets/images/Ems.png" width="24" height="24">
                        <img slot="icon" v-if="detailList.account!=null&&detailList.bankName=='中国银行'" src="../assets/images/zg.png" width="24" height="24">
                        <img slot="icon" v-if="detailList.account!=null&&detailList.bankName=='平安银行'" src="../assets/img/paCard.png" width="24" height="24">
                    </mt-cell>
            </div>
            <div class=" padding-r-l">
                <div >
                    <div style="color:#9B9B9B;">账户名</div> 
                    <div style="margin:5px 0;">{{detailList.realName}}</div>
                </div>
                <div style="margin-top:24px;">
                    <div style="color:#9B9B9B;">银行卡号</div> 
                    <div style="margin:5px 0;">{{detailList.account}}</div>
                </div>
            </div>
            </div>
            <div class="padding-r-l " style="margin-top:60px;"> 
                    <!-- 如果是买家 -->
                <template v-if="!issell">
                    <div v-if="detailList.orderStatus==0">
                        <mt-button style="margin-top:16px;color: #363949;"  :disabled="detailList.orderStatus!=0" @click="submit()" size="large" type="primary">确认下单</mt-button>
                    </div>
                    <div v-else-if="detailList.orderStatus==1&&detailList.buyerStatus==0" >
                        <mt-button style="margin-top:16px;color: #363949;"  @click="confirmPay()" size="large" type="primary">确认付款</mt-button>
                        <p @click="qxdd()" style="text-align:right;" class="font-size-mini color-in">取消订单</p>
                   </div>
                    <!-- <div >    -->
                        <mt-button v-if="detailList.buyerStatus==1&&detailList.orderStatus==1" style="margin-top:16px;color: #363949;" disabled size="large">等待卖家确认收款</mt-button>
                    <!-- </div>  -->
                </template>   
                <template v-else>
                    <!-- <mt-button  size="large" disabled type="primary" >等待买家付款</mt-button> -->
                        <mt-button style="margin-top:16px;color: #363949;" v-if="detailList.orderStatus==0" size="large"  @click="qxdd()" type="danger" >撤消订单</mt-button>
                        <mt-button style="margin-top:16px;color: #363949;" v-if="detailList.buyerStatus==1&&detailList.orderStatus==1" size="large"  @click="receiptMoney()" type="primary" >确认收款</mt-button>
                        <mt-button style="margin-top:16px;color: #363949;"  v-if="detailList.buyerStatus==0&&detailList.orderStatus==1" size="large" disabled type="primary" >等待买家支付</mt-button>
                </template>
            </div> 
    </div>
</template>
<script>
import { Toast,MessageBox,Indicator  } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            orderId:'',
            detailList:'',
            day: 0, hr: 0, min: 0, sec: 0,
            deadline:'',
            start:''
        }
    },
     watch:{
        getUserInfo: function(val){
      },
      
    },
    mounted: function () {
            this._interval = setInterval(() => {
                this.countdown();
            }, 1000)
        },
    destroyed () {
        clearInterval(this._interval)
    },
    computed: {
      ...mapGetters(['getUserInfo']),
        issell: function(){
            return this.getUserInfo.userId == this.detailList.seller;
        },
        orderStatus: function(){
            switch(this.detailList.orderStatus){
                case 0: return this.issell?
                (this.detailList.buyStatus==1?'确认收款':'等待买家支付'):
                (this.detailList.buyStatus==1?'已支付,等待卖家确认':'待支付'); break;
                case 1: return '订单已完成'; break;
                case 2: return '订单已取消'+(this.detailList.buyStatus==2?',买家支付超时':''); break;
            }
        }
    },
    created:function(){
            this.orderId=this.$route.query.orderId
            this.orderDetail()
    },
    methods:{
        ...mapMutations(['setUserInfo']),
        orderDetail:function(){
            Indicator.open();
            this.$http.post('app/c2cTrade/getOrderDetail',{orderId:this.orderId}).then((data)=>{
                Indicator.close();
            this.detailList=data.data.data
            })
        },
        receiptMoney:function(){
            MessageBox.prompt('确认收款',{inputPlaceholder:'请输入支付密码',inputType:'password'}).then(({ value, action, }) => {
                this.$http.post('app/c2cTrade/confirmReceivable',{
                    orderId:this.orderId,
                    tradePwd:value
                }).then((data)=>{
                    if(data.data.code==200){
                        MessageBox.alert('详情请查看流水','收款成功').then(action => {
                            this.orderDetail()
                    });
                }
            })
         })
        },
        confirmPay:function(){
            this.$http.post('app/c2cTrade/confirmPayment',{orderId:this.orderId}).then((data)=>{
                 if(data.data.code==200){
                      MessageBox.alert('详情请查看流水','您已买入成功').then(action => {
                           this.orderDetail()
                        });
                    }         
            })
        },
        submit:function(){
            MessageBox.prompt('确认要买入吗？',{inputPlaceholder:'请输入支付密码',inputType:'password'}).then(({ value, action, }) => {
                this.$http.post('app/c2cTrade/placeOrder',{
                    orderId:this.orderId,
                    tradePwd:value
                }).then((data)=>{
                    if(data.data.code==200){
                      MessageBox.alert('详情请查看流水','您已买入成功').then(action => {
                        //   this.$router.push()
                           this.orderDetail()
                        });
                    }
                })
            })
       },
       qxdd:function(){
           this.$http.post('app/c2cTrade/revokeOrder',{orderId:this.orderId}).then((data)=>{
              if(data.data.code==200){
                  if(this.issell){
                      Toast('撤单成功')
                  }else{
                  Toast('取消成功')
                  }
                   this.orderDetail()
              }
           })
        },
        countdown: function () {
               this.startTime = this.detailList.overTime.replace(/\-/g, "/");
                let end = Date.parse(new Date(this.startTime));
                let now = Date.parse(new Date());
                let msec = end - now;
                let hr = parseInt(msec / 1000 / 60 / 60 % 24);
                let min = parseInt(msec / 1000 / 60 % 60);
                let sec = parseInt(msec / 1000 % 60);
               
                this.hr = hr > 9 ? hr : '0' + hr;
                this.min = min > 9 ? min : '0' + min;
                this.sec = sec > 9 ? sec : '0' + sec;
                if( this.hr=== '00' && this.min==='00'&& this.sec ==='00'){
                  clearInterval(this._interval)
                    this.orderDetail()
                }
              
              
        }
    }
}
</script>
