<template>
    <div>
        <mt-header title="EP转换">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
             <mt-button style="color: rgb(254, 204, 93);font-size:12px;" @click="qx()"  slot="right">转换规则</mt-button>
        </mt-header>
        <div class="text-center  epBg">
            <!-- <div style="padding-top:35px;color:#F9AAA7;">我的现金积分</div>  
            <h1 class="color-write">{{list.cashIntegral}}</h1>
            <p><span style="color:#F9AAA7;"> 预计收入</span><b class="color-write">&nbsp; {{list.cashIntegral}}</b></p> -->
            <div class="EpS" style="height:210px;">
                <!-- <mt-cell title="EP转ZP" readonly value="记录" to="/trsList" is-link></mt-cell> -->
                <!-- <div class="text-left" style="color:#9B9B9B;">现有开户积分 &nbsp;<b style="color:#FFA166;">{{list.openAccountIntegral}}</b></div> -->
                <div class="reg" style="margin-top:24px;">
                    <div style="border-bottom:1px solid rgba(216,216,216,0.10);padding-top:30px;">
                        <mt-field label="EP" style="color: #FC6A65;" placeholder="转换数量" v-model="EpNum"></mt-field>
                    </div>
                    <div style="border-bottom:1px solid rgba(216,216,216,0.10);padding-top:24px;">
                        <mt-field  type="password" style="margin-top:16px;"  placeholder="请输入支付密码" v-model="epPwd"></mt-field>
                    </div>
                </div>
            </div>
            <div class="padding-r-l">
                <mt-button style="margin-top:32px;" @click="submit()"   size="large" type="primary">转换</mt-button>
            </div>   
        </div>  
    </div>
</template>
<script>
import { Toast,MessageBox,Indicator   } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            EpNum:'',
            epPwd:"",
            list:''
        }
    },
    watch:{
        getUserInfo: function(val){
      },
      
    },
    computed: {
      ...mapGetters(['getUserInfo'])
       
    },
    created:function(){
        this.loadList()
    },
    methods:{
         ...mapMutations(['setUserInfo']),
         loadList:function(){
             Indicator.open();
            this.$http.post('app/user/refreshUserInfo',{
                token:this.getUserInfo.token
            }).then((data)=>{
                Indicator.close();
            if(data.data.code!=200) return;
                this.list=data.data.data
        })
        },
        qx:function(){
            this.$router.push('/EpTrsZpRule')
         },
        submit:function(){
            if(this.EpNum==''|| (!Number(this.EpNum))){
                Toast('请输入转换数量')
                return;
            }
            if(this.epPwd==""){
                Toast('请输入支付密码')
                return;
            }
            MessageBox.confirm('确定要转换吗?').then(action => {
                this.$http.post('app/userIntegral/changeIntegral',{
                    changeCount:this.EpNum,
                    tradePwd:this.epPwd
                }).then((data)=>{
                    if(data.data.code==200){
                        MessageBox.alert('详情请查看流水','您已成功转换').then(action => {
                            this.epPwd=''
                            this.loadList()
                        });
                    }
                })
            });
        }
    }
}
</script>
