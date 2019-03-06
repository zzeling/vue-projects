<template>
    <div>
         <mt-header title="管理银行卡信息">
            <router-link to="/my" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
         <div style="margin-top:16px;" class="cPwd">
            <mt-field label="户名" placeholder="请输入银行卡账户名" type="text" disabled v-model="accName"></mt-field>
            <mt-field label="卡号" placeholder="请输入银行卡卡号" type="tel" v-model="cardNum"></mt-field>
            <div  @click="chooseBank()">
                <mt-field label="开户银行" placeholder="请选择开户银行" readonly type="text" v-model="bankOpen">
                    <img src="../assets/images/xsdown.png" alt="" width="14px" height="8px;">
                </mt-field>
            </div>
        </div>
        <div style="padding:0 10px;">
            <mt-button @click="submit()"  style="margin-top:65px;color: #A9A9A9;" size="large" type="primary">确认修改</mt-button>
        </div>
        <div>
            <mt-popup v-model="popupVisible" position="bottom">
                <mt-picker :slots="sloVal" @change="onValuesChange"></mt-picker>
            </mt-popup>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { Toast,Indicator  } from 'mint-ui';
export default {
    data(){
        return{
            accName:'',
            cardNum:'',
            bankOpen:'',
            popupVisible:false,
            sloVal:[],
            bankList:[],
            bId:'',
            bankId:[],
            bName:[],
            list:''
        }
    },
    created:function(){
        Indicator.open();
         this.$http.post('app/user/refreshUserInfo',{
                token:this.getUserInfo.token
            }).then((data)=>{
                Indicator.close();
            if(data.data.code!=200) return;
                this.list=data.data.data
                this.accName=this.list.realName
                this.cardNum=this.list.bankAccount
                this.bankOpen=this.list.bankName==null?'中国银行':this.list.bankName
        })
        
        this.$http.get('app/sysInfo/bank').then((data)=>{
            this.bankList=data.data.data
            this.bName=this.bankList.map(p=>{return p.bankName});
        })
    },
    watch:{
        getUserInfo: function(val){
      },
      
    },
    computed: {
      ...mapGetters(['getUserInfo'])
       
    },
    methods:{
        ...mapMutations(['setUserInfo']),
        chooseBank:function(){
            this.popupVisible=true
            this.sloVal = []
            this.sloVal.push({
            values: this.bName,
            textAlign: 'center',
            })
        },
        onValuesChange(picker, values) {
            if(values[0] == null) return;
            this.bankOpen=values[0]
            
            this.bId=this.bankList.filter(p=>{return this.bankOpen==p.bankName?p.bankId:''})
            this.bankId=this.bId.map(p=>{return p.bankId})
        },
        submit:function(){
             if(this.bankOpen==null){
                Toast('请选择开户银行');
                return;
            }
            if(this.cardNum==null){
                Toast('请输入银行卡号');
                return;
            }
            this.$http.post('app/user/editBankInfo',{
                bankAccount:this.cardNum,
                bankName:this.bankOpen,
                bankId:this.bankOpen=='中国银行'?1:this.bankOpen=='工商银行'?2:this.bankOpen=='建设银行'?3:this.bankOpen=='农业银行'?4:this.bankOpen=='交通银行'?5:this.bankOpen=='邮政银行'?6:this.bankOpen=='平安银行'?7:0
                // bankId:this.bankId[0] 
            }).then((data)=>{
                if(data.data.code==200){
                    Toast({
                     message: '修改成功',
                     iconClass: 'mint-toast-icon mintui mintui-success'
                });
                }else{
                Toast({ message: data.data.message });
              }
            })
        }
    }
}
</script>
