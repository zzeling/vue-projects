<template>
    <div>
         <div  v-show="list!=''" class="flex flex-items-center flex-content-between" style="padding:20px 10px;">
            <div>产品名称</div>
            <div style="width:21%;">创建时间</div>
        </div>
        <div v-for=" p in list" :key="p.id" @click="pDetail(p.goodsId)">
            <div style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
                <div class="color-in">{{p.goodsName}}</div>
                <div style="color:#929292;">{{p.createTime.substr(5,11)}}</div>
            </div>
        </div>
        <div v-show="list==''" class="text-center" style="margin-top:10rem;">
            <img src="../assets/images/kong.png" alt="" width="99px" height="97px">
            <div class="color-in"> 暂无产品</div>
        </div>
        <div>
            <div style="height:100px;"></div>
        <div>
            <footerNav :selected="selected"></footerNav>
        </div>
        </div>
    </div>
</template>
<script>
import footerNav from '../components/footerNav'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            selected:'product',
            list:[]
        }
    },
    created:function(){
        Indicator.open();
        this.$http.post('app/sysInfo/goodsList').then((data)=>{
            Indicator.close();
            if(data.data.code==200){
                this.list=data.data.data
            }
        })
    },
    components:{
        footerNav,
    },
    methods:{
        pDetail:function(id){
            this.$router.push('/productDtl?goodsId='+id)
        }
    }
}
</script>
