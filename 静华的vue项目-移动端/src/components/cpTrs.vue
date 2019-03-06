<template>
    <div>
        <!-- <mt-header title="CP转账">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            
        </mt-header>
        <div class="text-center  epBg">
            <div style="padding-top:35px;color:#F9AAA7;">我的消费积分</div>  
            <h1 class="color-write">{{list.consumeIntegral}}</h1>
            <div class="EpS" style="margin-top:70px;height:200px;">
                <mt-cell title="我要转账" readonly value="记录" to="/cpTrsList" is-link></mt-cell>
                <div class="reg">
                    <div class="colorNum">
                        <mt-field label="CP" style="color: #FC6A65;" placeholder="转出数量" v-model="EpNum"></mt-field>
                    </div>
                    <div style="margin-top:15px;">
                        <mt-field  type="password"   placeholder="请输入支付密码" v-model="epPwd"></mt-field>
                    </div>
                </div>
            </div>
            <div class="padding-r-l gray">
                <mt-button style="margin-top:32px;" @click="submit()"   size="large" type="primary">转账</mt-button>
            </div>   
        </div>
         -->
    </div>
</template>
<script>
// import { Toast,Indicator  } from 'mint-ui';
// import { mapMutations, mapGetters } from 'vuex'
// export default {
//     data(){
//         return{
//             EpNum:'',
//             epPwd:"",
//             list:'',
//             ToMsg:'',
//             mainId:''
//           }
//     },
//     watch:{
//         getUserInfo: function(val){
//       },
//     },
//     computed: {
//       ...mapGetters(['getUserInfo']), 
//     },
//     created:function(){
//         this.loadList();
        
//     },
//     methods:{
//          ...mapMutations(['setUserInfo']),
//         loadList:function(){
//             Indicator.open();
//             this.$http.post('app/user/refreshUserInfo',{
//                 token:this.getUserInfo.token
//             }).then((data)=>{
//                 Indicator.close();
//             if(data.data.code!=200) return;
//                 this.list=data.data.data
//         })
//         },
//         TrsRule:function(){
//             this.$router.push('/EpTrsRule')
//          },
//         submit:function(){
//             if(this.EpNum==''|| (!Number(this.EpNum))){
//                 Toast('请输入转出数量')
//                 return;
//             }
//             if(this.epPwd==""){
//                 Toast('请输入支付密码')
//                 return;
//             }
//             this.$http.post('app/userIntegral/transferConsumeIntegral',{
//                 transferCount:this.EpNum,
//                 tradePwd:this.epPwd
//             }).then((data)=>{
//                 if(data.data.code==200){
//                     this.epPwd=''
//                     this.loadList()
//                  Toast({
//                     message: '转账成功',
//                      iconClass: 'mint-toast-icon mintui mintui-success'
//                    })
//                    }
//             },error=>{
                
//             })

//         }
//     }
// }
 </script>
