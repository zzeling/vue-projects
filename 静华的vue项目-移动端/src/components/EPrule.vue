<template>
   <div>
         <mt-header title="EP挂卖规则">
            <router-link to="/Epsell" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div style="padding:0 20px;">
            <div  style="margin-top:16px;background: #414351;border-radius: 8px;padding:10px;">
                <h1 class="color-in">{{ruleList.title}}</h1>
                <p class="font-size-mini" v-html="ruleList.content"></p>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            ruleList:''
        }
    },
    created:function(){
        Indicator.open();
        this.$http.post('app/sysInfo/sysRule',{ruleName:"挂卖规则"}).then((data)=>{
            Indicator.close();
            if(data.data.code==200){
                this.ruleList=data.data.data
           }
        })
    }
}
</script>
