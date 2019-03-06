<template>
    <div>
         <mt-header title="继承人信息">
            <router-link to="/my" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
         <div style="margin-top:16px;" class="cPwd">
            <mt-field label="姓名" placeholder="继承人姓名" type="text"  v-model="accName"></mt-field>
            <div  @click="chooseBank()">
                <mt-field label="证件类型" placeholder="请选择证件类型" readonly type="text" v-model="cardType">
                    <img src="../assets/images/xsdown.png" alt="" width="14px" height="8px;">
                </mt-field>
            </div>
            <mt-field label="证件号码" placeholder="证件号码" type="text" v-model="cardNum"></mt-field>
            <p class="font-size-mini" style="padding:0 10px;color:#B2B2B2;">*继承人信息仅能修改一次</p>
        </div>
        <div style="padding:0 10px;">
            <mt-button @click="submit()" :disabled='list.heirEditCount>1' style="margin-top:65px;color: #A9A9A9;" size="large" type="primary">确认修改</mt-button>
        </div>
        <div>
            <mt-popup v-model="popupVisible" position="bottom">
                <mt-picker :slots="sloVal" @change="onValuesChange"></mt-picker>
            </mt-popup>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters  } from 'vuex'
import { Toast ,Indicator} from 'mint-ui';
export default {
    data(){
        return{
            accName:'',
            cardType:'',
            cardNum:'',
            bankOpen:'',
            popupVisible:false,
            sloVal:[{values: ['身份证', '护照', '驾驶证']}],
            list:'',
        }
    },
    created:function(){
        this.loadList()
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
        loadList:function(){
            Indicator.open();
            this.$http.post('app/user/refreshUserInfo',{
                    token:this.getUserInfo.token
                }).then((data)=>{
                    Indicator.close();
                if(data.data.code!=200) return;
                    this.list=data.data.data
                    this.accName=this.list.heirName
                    this.cardNum=this.list.heirIdNum
                    this.cardType=this.list.heirCardType==0?"身份证":this.list.heirCardType==1?'护照':'驾驶证'
            })
        },
        chooseBank:function(){
            this.popupVisible=true
        },
        onValuesChange(picker, values) {
            this.cardType=values[0]
        },
        submit:function(){
             if(this.accName==''||this.accName==null){
                Toast('请输入继承人姓名');
                return false;
            }
             if(this.cardType==''||this.cardType==null){
                Toast('请选择证件类型');
                return false;
            }
             if(this.cardNum==''||this.cardNum==null){
                Toast('请输入证件号码');
                return false;
            }
            this.$http.post('app/user/editHeirInfo',{
                heirName:this.accName,
                heirIdNum:this.cardNum,
                heirCardType:this.cardType=='身份证'?0:this.cardType=='护照'?1:2
            }).then((data)=>{
                if(data.data.code==200){
                    Toast({
                     message: '修改成功',
                     iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.loadList()
                }else{
                Toast({ message: data.data.message });
              }
            })
        }
    }
}
</script>
