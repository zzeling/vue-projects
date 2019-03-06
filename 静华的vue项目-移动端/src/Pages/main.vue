<template>
    <div>
        <div class="laq">
            <mt-popup v-model="popupVisible" position="top" :closeOnClickModal='false'>
                <div class="flex flex-content-end" style="padding:30px 10px;"><img src="../assets/images/jtlaq.png" width="60px" height="60px" alt=""></div>
                <!-- <p class="color-write" style="padding">注：微信用户请在右上角选择“在浏览器中打开”，再选择下载应用</p> -->
                <p class="color-write text-center font-size-medium"> 点击右上角按钮</p>
                 <p class="color-write text-center font-size-medium"> 选择在浏览器中打开，选择下载应用</p>
            </mt-popup>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
import { Indicator  } from 'mint-ui';
export default {
    data(){
        return{
            popupVisible:true
        }
    },
    created:function(){
        // Indicator.open();
        var ua = window.navigator.userAgent.toLowerCase();
	    if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.popupVisible = true;
            
	    } else {
             window.location.href='http://18.236.74.137/ZUH1.0.apk'
             this.popupVisible = false
	    }
    }
}
</script>
