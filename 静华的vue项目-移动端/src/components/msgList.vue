<template>
    <div>
        <mt-header title="公告通知">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div style="padding:0 15px;">
            <div style="margin-top:32px;background: #414351;border-radius: 8px;" v-for="m in msgList" :key="m.id">
                <!-- <div class="padding-lf font-size-medium text-center" style="color:#9B9B9B">{{m.createTime}} </div> -->
                <div class="  padding-lf adImg">
                    <h2 class="text-left">{{m.title}}</h2>
                    <p v-html="m.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            msgList:[]
        }
    },
    created:function(){
        Indicator.open();
        this.$http.post('app/sysInfo/sysNotice').then((data)=>{
            Indicator.close();
            if(data.data.code!=200)return;
            this.msgList=data.data.data
        })
    }
}
</script>
<style scoped>

</style>
