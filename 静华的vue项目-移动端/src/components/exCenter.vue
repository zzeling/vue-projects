<template>
    <div>
        <div class="flex flex-items-center flex-content-between titBg">
            <div style="width:20%;">UID</div>
            <div style="width:40%;">时间</div>
            <div style="width:20%;">数量</div>
            <div style="width:20%;">操作</div>
        </div>
        <div v-for=" list in orderList" :key="list.id">
            <div style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
                <div style="width:20%;" class="font-size-medium">{{list.seller}}</div>
                <div style="color:#929292;width:40%;">{{list.createTime.slice(5,16)}}</div>
                <div style="width:20%;"> <b class="color-in">{{list.epCount}}</b> </div>
                <div style="width:20%;" @click="MarketBuy(list.orderId)" class="flex flex-items-center flex-content-between">
                   
                     <div v-if="list.seller==getUserInfo.userId" class="marketBuyBtn"><mt-button style="background:rgb(239, 79, 79);" size="small">撤单</mt-button></div>
                      <div v-else class="marketBuyBtn"><mt-button  size="small">买入</mt-button></div>
                    <!-- <div class="buyNext"></div> -->
                </div>
            </div>
            
        </div>
        <pagination :class="orderList==null || orderList==''?'hiddenPage':'showPage'" :total="total" v-model="current" ></pagination>
        <div v-show="orderList==''" class="text-center" style="margin-top:10rem;">
            <img src="../assets/images/kong.png" alt="" width="99px" height="97px">
            <div class="color-in"> 暂无数据</div>
        </div>
    </div>
</template>
<script>
import pagination from '../components/pagination'
import { Indicator } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            orderList:[],
            pageNo:1,
            pageSize:10,
            current:1,
            total:0
        }
    },
    components:{
        pagination
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    watch:{
         getUserInfo: function(val){
            
      },
      
        current:function(val,old){
            if(val == old) return;
            this.pagechange(val)
        }
    },
    created:function(){
       this.pagechange(1)
    },
    methods:{
         ...mapMutations(['setUserInfo']),
        pagechange:function(current){
            Indicator.open();
            this.$http.post('app/c2cTrade/getC2cTradeOrderList?pageNo='+current+'&pageSize='+this.pageSize,).then((data)=>{
                Indicator.close();
                 if(data.data.code!=200) return;
                this.orderList=data.data.data.data
                this.total=data.data.data.totalCount
            })
        },
        MarketBuy:function(id){
            this.$router.push('/orderDetail?orderId='+id)
        },
        
    }
}
</script>

<style scoped>
.buyNext{
    background:url('../assets/images/next.png') no-repeat center center;
    width:14px;height:14px;
    background-size: 50%;
}
</style>
