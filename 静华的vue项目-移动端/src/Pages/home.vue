<template>
    <div>
        <div class="homeBg">
            <div class="flex flex-content-between flex-items-center"  style="padding:5px 10px;">
                <div class="unMsg" @click="Msg()">
                    <!-- <mt-badge size="small">30</mt-badge> -->
                </div>
                <div style="width:75%;"><ad  :lists="lists"></ad></div>
                <div class="loginOut" @click="out()"></div>
            </div>
       
            <div style="margin-top:20px;">
                <div class="flex  flex-items-center flex-content-between">
                    <div class="flex" style="padding-left:18px;">
                        <div>
                            <div class="font-size-elarge" v-if="getUserInfo!=null"> <b>{{getUserInfo.realName}}</b>  </div>
                            <div> <router-link to="/reg" style="color: #fff;opacity: 0.4;" class="font-size-mini">    ID: {{getUserInfo.userId}}</router-link></div>
                        </div>
                        <div style="padding-top:5px;">
                            <div class="flex"> 
                                <i class="star"  v-for="s in list.gradeLevel" :key="s.id"></i> 
                            </div>
                            <div class=" color-in bdCenter" v-if="getUserInfo.isTaxationCenter==1" >临时服务中心</div>
                        </div>
                    </div>
                    <div class="abcPrice text-center">
                        <div class="flex  flex-items-center flex-content-around" ><div> ABC市价</div> <b class="font-size-elarge">{{list.giftIntegralPrice}}</b></div>
                    </div>
                </div>
                
                <div class="flex flex-items-center flex-content-between text-center font-size-mini color-in" style="margin-top:30px;padding:0 25px;">
                    <div>
                        <router-link to='/Epsell'>
                            <img src="../assets/img/ep.png" alt="" width="50px" height="50px">
                            <div class="color-in">EP挂单</div>
                        </router-link>
                    </div>
                    <div>
                            <router-link to='/EpTrs'>
                            <img src="../assets/img/epTrs.png" alt="" width="50px" height="50px">
                            <div  class="color-in">EP转账</div>
                            </router-link>
                    </div>
                    <div>
                        <router-link to='/EptoMp'>
                            <div><img src="../assets/img/epmp.png" alt="" width="50px" height="50px"></div>
                            <div  class="color-in">EP转AP</div>
                            </router-link>
                    </div>
                    <div>
                        <router-link to='/GodSell'>
                            <div><img src="../assets/img/gofTrs.png" alt="" width="50px" height="50px"></div>
                            <div  class="color-in">ABC售卖</div>
                        </router-link>
                    </div>
                    <!-- <div>
                        <router-link to='/cpTrs'>
                            <div><img src="../assets/images/CP.png" alt="" width="28px" height="28px"></div>
                            <div>CP转账</div>
                        </router-link>
                    </div> -->
                </div>
            </div>
            <div class="jiList text-center  font-size-large" style="padding-bottom:20px;">
                <div class="text-left font-size-medium" style="padding:10px 20px;"><b >我的积分</b></div>
                <div class="flex flex-content-around flex-items-center" style="padding:0 20px;">
                    <div class="epjf " @click="epList()">
                        <div class="jfBg color-main"> <div style="padding-top:17px;"><b>EP</b></div> </div>
                        <div style="margin-top:40px;" ><p> <b style="color:#414351;font-size:25px;">{{list.cashIntegral}}</b> </p></div>
                    </div>
                    <div class="epjf " @click="khList()">
                        <div class="jfBg color-main"><div style="padding-top:17px;"><b>AP</b></div></div>
                         <div style="margin-top:40px;" ><p> <b style="color:#414351;font-size:25px;">{{list.openAccountIntegral}}</b></p></div>
                    </div>
                </div>
                <div class="flex flex-content-around flex-items-center" style="margin-top:4px;padding:0 20px;">
                    <div class="epjf" @click="gift()">
                        <div class="jfBg color-main"><div style="padding-top:17px;"><b>ABC</b></div></div>
                         <div style="margin-top:40px;" ><p> <b style="color:#414351;font-size:25px;"> {{list.giftIntegral}}</b></p></div>
                    </div>
                    <div class="epjf" @click="teamList()">
                        <div class="jfBg color-main"><div style="padding-top:17px;"><b>TE</b></div></div>
                         <div style="margin-top:40px;" ><p> <b style="color:#414351;font-size:25px;">{{list.leftTeamIntegral+list.rightTeamIntegral}}</b> </p></div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top:55px;">
            <footerNav :selected="selected"></footerNav>
        </div>
    </div>
</template>
<script>
import footerNav from '../components/footerNav'
import ad from '../components/ad'
import { MessageBox,Indicator  } from 'mint-ui'
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            selected:'home',
            lists:'',
            list:'',
            mainUserInfo:''
        }
    },
    components:{
        footerNav,
        ad
    },
    watch:{
        getUserInfo: function(val){
      },
      
    },
    computed: {
        ...mapGetters(['getUserInfo'])
    },
    created:function(){
        if(this.getUserInfo==''|| this.getUserInfo==null){
            this.$router.push('/Login')
            return
        }
        this.loadData()
        this.$http.post('app/sysInfo/sysNotice').then((data)=>{
            if(data.data.code!=200) return;
            this.lists=data.data.data[0].content
        })
    },
    methods:{
        ...mapMutations(['clear','setUserInfo']),
        loadData:function(){
                this.$http.post('app/user/refreshUserInfo',{
                token:this.getUserInfo.token
            }).then((data)=>{
                if(data.data.code!=200) return;
                this.list=data.data.data
            })
        },
        out:function(){
            MessageBox.confirm('确定退出登录?').then(action => {
                this.$http.get('app/user/userOut').then((data)=>{
                    this.clear();
                    this.$router.push('/login')
                });
            });
        },
        mainAcc:function(){
            Indicator.open();
            this.$http.post('/app/user/backToPrimaryAccount').then((data)=>{
                Indicator.close();
                if(data.data.code!=200) return;
                    this.mainUserInfo=data.data.data
                    this.setUserInfo(this.mainUserInfo)
                    this.loadData()
            })
        },
        epList:function(){
             this.$router.push('/EPlist')
        },
        khList:function(){
            this.$router.push('/openList')
        },
        gift:function(){
            this.$router.push('/giftList')
        },
        teamList:function(){
            this.$router.push('/team')
        },
        Msg:function(){
           this.$router.push('/msgList')
        }
    }
}
</script>
<style secoped>
.unMsg{
    background:url(../assets/img/msg.png) no-repeat center;
    width:24px;height:24px;
    background-size: 80%;
}
.loginOut{
     background:url(../assets/img/out.png) no-repeat center;
    width:24px;height:24px;
    background-size: 75%;
}
.tip{
    background:url('../assets/images/jf.png') no-repeat center;
    display:block;
    background-size: 100%;
    position:absolute;
    width:92px;height:24px;
    z-index:999;
    top:25px;
}

</style>

