<template>
    <div>
        <mt-header title="转账记录">
            <router-link to="/cpTrs" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div v-show="orderList!=''" class="flex flex-items-center flex-content-between" style="padding:20px 10px">
           
            <div style="width:30%;">时间</div>
            <div style="width:20%;">数量</div>
            <div style="width:50%;">转账详情</div>
        </div>
        <div v-for=" list in orderList" :key="list.id">
            <div style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
               <div style="color:#929292;width:30%;">{{list.createTime.substr(5,11)}}</div>
                <div style="width:20%;"> <b class="color-in">{{list.count}}</b> </div>
                <div style="width:50%;color:#929292;over-flow:hidden">
                  {{list.detail}}
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
            this.$http.post('app/userIntegral/integralLog?pageNo='+current+'&pageSize='+this.pageSize,{
                integralType:"消费积分",
                operateType:"转账"
                }).then((data)=>{
                Indicator.close();
                this.orderList=data.data.data.data
                this.total=data.data.data.totalCount
            })
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
