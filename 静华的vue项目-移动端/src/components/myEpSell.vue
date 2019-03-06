<template>
    <div>
        <div v-show="orderList!=''" class="flex flex-items-center flex-content-between titBg">
            <div style="width:20%;">UID</div>
            <div style="width:40%;">时间</div>
            <div style="width:20%;">数量</div>
            <div style="width:20%;">订单状态</div>
        </div>
        <div v-for=" list in orderList" :key="list.id" @click="orderD(list.orderId)">
            <div style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
                <div style="width:20%;" class="font-size-medium">{{list.seller}}</div>
                <div style="color:#929292;width:40%;">{{list.createTime.substr(5,11)}}</div>
                <div style="width:20%;"> <b class="color-in">{{list.epCount}}</b> </div>
                <div style="width:20%;">
                     <b class="color-in">
                      {{list.orderStatus==0?'挂单中':list.orderStatus==1?'交易中':list.orderStatus==2?'交易完成':list.orderStatus==3?'订单超时':list.orderStatus==6?'已撤单':list.orderStatus==4?'取消交易':'强制交易'}}
                    </b>
                 </div>
            </div>
        </div>
         <pagination :class="orderList==null || orderList==''?'hiddenPage':'showPage'" :total="total" v-model="current" ></pagination>
        <div v-show="orderList==''" class="text-center" style="margin-top:110px;">
            <img src="../assets/images/kong.png" alt="" width="99px" height="97px">
            <div class="color-in"> 暂无数据</div>
        </div>
    </div>
</template>
<script>
import pagination from '../components/pagination'
import { Indicator } from 'mint-ui';
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
    watch:{
        current:function(val,old){
            if(val == old) return;
            this.pagechange(val)
        }
    },
    created:function(){
       this.pagechange(1)
    },
    methods:{
        pagechange:function(current){
            Indicator.open();
            this.$http.post('app/c2cTrade/getMyTradeOrder?pageNo='+current+'&pageSize='+this.pageSize,{orderType:0}).then((data)=>{
                Indicator.close();
                 if(data.data.code!=200) return;
                this.orderList=data.data.data.data
                this.total=data.data.data.totalCount
            })
        },
        orderD:function(id){
            this.$router.push('/orderDetail?orderId='+id)
        }
    }
}
</script>

<style scoped>
</style>
