<template>
    <div>
         <mt-header title="产品详情">
            <router-link to="/product" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div style="padding:20px 10px;">
            <div  class="font-size-large color-in text-center"> <b>{{goods.goodsName}}</b> </div>
            <div class="productDsb" v-html="goods.describe"></div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            goodId:'',
            goods:''
        }
    },
    created:function(){
        this.goodId=this.$route.query.goodsId
          Indicator.open();
        this.$http.post('app/sysInfo/goodsInfo',{goodsId:this.goodId}).then((data)=>{
             Indicator.close();
            if(data.data.code==200){
                this.goods=data.data.data
            }
        })
    }
}
</script>
