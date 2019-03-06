<template>
    <div>
         <mt-header title="我的资料">
            <router-link to="/my" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div   style="padding:5px 20px;margin-top:16px;background: #414351;">
            <div class="flexlList" >
                    <div>
                        <div>姓名</div><div class="color-in">{{list.realName}}</div>
                    </div>
                    <div>
                        <div>ID号</div><div class="font-size-medium color-in">{{list.userId}}</div>
                    </div>
                    <div>
                        <div>会员级别</div><div class="flex"> <i class="star"  v-for="s in list.gradeLevel" :key="s.id"></i> </div>
                    </div>
                    <div v-if="list.userName!=''">
                        <div>登录名</div><div class="color-in">{{list.userName}}</div>
                    </div>
                    <div>
                        <div>推荐人</div><div class="color-in">{{list.recommenderId==0?'无':list.recommenderId}}</div>
                    </div>
                    <div>
                        <div>手机号码</div><div class="color-in">{{list.phone}}</div>
                    </div>
                     <div>
                        <div>信用等级</div><div class="flex"> <i class="xyStar"  v-for="x in list.creditLevel" :key="x.id"></i></div>
                    </div>
                </div>
            </div>
             <div   style="padding:5px 20px;margin-top:16px;background: #414351;" >
                <div class="flexlList" >
                    <div>
                        <div>参与拆分</div><div class="color-in">{{list.integralSplitCount}}</div>
                    </div>
                    <div>
                        <div>左区规模</div><div class="color-in">{{list.leftTeamIntegral}}</div>
                    </div>
                    <div>
                        <div>右区规模</div><div class="color-in">{{list.rightTeamIntegral}}</div>
                    </div>
                    <div>
                        <div>DI合计</div><div class="color-in">{{list.totalDI}}</div>
                    </div>
                    <div>
                        <div>SI合计</div><div class="color-in">{{list.totalSI}}</div>
                    </div>
                    <div>
                        <div>激活时间</div><div class="color-in">{{list.registerTime}}</div>
                    </div>
                </div>
             </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return{
            selected:'my',
            list:''
        }
    },
    created:function(){
        if(this.getUserInfo==''|| this.getUserInfo==null){
         this.$router.push('/Login')
         return
        }
        Indicator.open();
        this.$http.post('app/user/refreshUserInfo',{
            token:this.getUserInfo.token
        }).then((data)=>{
            Indicator.close();
            if(data.data.code!=200) return;
            this.list=data.data.data
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
         
    }
}
</script>
