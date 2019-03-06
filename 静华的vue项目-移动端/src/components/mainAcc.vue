<template>
    <div>
         <mt-header title="账号详情">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="padding-r-l" style="padding-top:30px;">
                <div class="flexlList">
                     <div>
                        <div>账号ID</div><div class="font-size-medium">{{getUserInfo.userId}}</div>
                    </div>
                     <div>
                        <div>等级</div><div class="flex"> <i class="star"  v-for="s in getUserInfo.gradeLevel" :key="s.id"></i> </div>
                    </div>
                    <div>
                        <div>现金积分</div><div>{{getUserInfo.cashIntegral}}</div>
                    </div>
                    <div>
                        <div>团队积分</div><div>{{getUserInfo.leftTeamIntegral+getUserInfo.rightTeamIntegral}}</div>
                    </div>
                    <div>
                        <div>ABC</div><div>{{getUserInfo.giftIntegral}}</div>
                    </div>
                     <div>
                        <div>注册积分</div><div>{{getUserInfo.openAccountIntegral}}</div>
                    </div>
                    <div>
                        <div>子账号</div> <div>{{getUserInfo.isSubAccount}}</div>
                    </div>
                </div>
            </div>
            <div class="text-center padding-r-l" style="margin-top:100px;">
                <mt-button @click="mainAcc" type="primary" size="large">返回主账号</mt-button>
            </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            mainId:'',
            mainUserInfo:''
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
        // this.mainId=this.$route.query.userId
    },
    methods:{
        ...mapMutations(['setUserInfo']),
        mainAcc:function(){
            this.$http.post('/app/user/backToPrimaryAccount').then((data)=>{
                if(data.data.code==200){
                    this.mainUserInfo=data.data.data
                    this.setUserInfo(this.mainUserInfo)
                    this.$router.push('/home')
                }
            })
        }
    }
}
</script>
