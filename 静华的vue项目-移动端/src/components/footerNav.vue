<template>
<div>
<div class="footbot">
 <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="home">
      <img slot="icon" v-if="message=='home'" src="../assets/img/home.png" style="width:30px;height:23px;">
      <img slot="icon" v-else src="../assets/img/uhome.png" style="width:30px;height:23px;">
      首页
    </mt-tab-item>
     <mt-tab-item id="exchange">
      <img slot="icon" v-if="message=='exchange'" src="../assets/img/ex.png" style="width:23px;height:23px;">
       <img slot="icon" v-else src="../assets/img/uex.png" style="width:23px;height:23px;">
      交易市场
    </mt-tab-item>
     <!-- <mt-tab-item id="product">
      <img slot="icon" v-if="message=='product'" src="../assets/images/pdt.png" style="width:26px;height:24px;">
       <img slot="icon" v-else src="../assets/images/pdtUn.png" style="width:26px;height:24px;">
      产品
    </mt-tab-item> -->
    <mt-tab-item id="my">
      <img slot="icon" v-if="message=='my'" src="../assets/img/my.png" style="width:25px;height:25px;">
       <img slot="icon" v-else src="../assets/img/umy.png" style="width:25px;height:25px;">
      我的
    </mt-tab-item>
  </mt-tabbar>
  </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      message:this.selected,
      // atabs:this.tabs,
    }
  },
  props:{
    selected: String,
    // tabs:Array,
  },
  watch: {
    message: function (val, oldVal) {
      switch(val){
        case 'home':
          this.$router.push('/home');
        break;
        case 'exchange':
          this.$router.push('/exchange');
        break;
        case 'product':
          this.$router.push('/product');
        break;
        case 'my':
          this.$router.push('/my');
        break;
      }
    }
  },
}
</script>
<style scoped>
/* .footbot{background: #33323F;
box-shadow: inset 0 0 0 0 rgba(0,0,0,0.20);} */
</style>
