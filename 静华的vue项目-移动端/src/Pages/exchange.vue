<template>
    <div>
        <div>
            <!-- <mt-header title="EP挂卖">
                
                
                    <mt-button style="color: #74C1D2;font-size:12px;" @click="buyList()" slot="right">买入记录</mt-button>
                
            </mt-header> -->
            <div class="market">
                <mt-navbar v-model="active">
                    <mt-tab-item id="1">交易中心</mt-tab-item>
                    <mt-tab-item id="2">我的挂卖</mt-tab-item>
                    <mt-tab-item id="3">交易记录</mt-tab-item>
                </mt-navbar>
            </div>
            <div>
            <mt-tab-container v-model="active" swipeable>
                <mt-tab-container-item id="1">
                    <exCenter></exCenter>  
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <myEpSell></myEpSell>   
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <buyList></buyList>   
                </mt-tab-container-item>
            </mt-tab-container>
            </div>
        </div>
        <div style="height:80px;"></div>
        <footerNav :selected="selected"></footerNav>
    </div>
</template>
<script>
import footerNav from '../components/footerNav'
import exCenter from '@/components/exCenter'
import myEpSell from '@/components/myEpSell'
import buyList from '@/components/buyList'
export default {
    data(){
        return{
            selected:'exchange',
            active:'1'
        }
    },
    components:{
        footerNav,
        myEpSell,
        exCenter,
        buyList
    },
    methods:{
        buyList:function(){
            this.$router.push('/buyList')
        }
    }
}
</script>
