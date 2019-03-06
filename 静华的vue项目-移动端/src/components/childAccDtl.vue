<template>
    <div>
        <mt-header title="子账号详情">
            <router-link to="/childAcc" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="text-center" style="padding:32px 0;">
             <div class="flex flex-items-center flex-center ">
                  <div style="color:#9B9B9B;" class="font-size-large">ID&nbsp;</div> 
                  <b @click="mainPrev()" class="font-size-big">{{mainId}}</b>
             </div>
             <div style="margin-top:10px;">
                <mt-button size="small" @click="oneKyeLogin()" type="primary">一键登录</mt-button>
             </div>
        </div>
        <div class="flex flex-items-center flex-content-between regBack" style="margin-top:20px;padding:0 20px;">
            <mt-button size="normal" @click="regLeft(0)" >左末端</mt-button>
            <mt-button  size="normal" @click="regLeft(1)" >右末端</mt-button>
        </div>
        <div class="flex flex-items-center flex-content-around text-center rlLine">
            <div>
                <div class="color-in">{{comMain.leftLink}}</div>
                <div class="color-g">左线</div>
            </div>
           <div>
                <div class="color-in">{{comMain.rightLink}}</div>
                <div class="color-g">右线</div>
            </div>
        </div>
        <div class="flex  flex-content-around rlLineDet" v-show="overLine==false" style="background: #414351;">
            <!-- 左线 -->
            <div v-if="leftLine.userId!=null || leftLine.userId!=undefined">
               <div>ID号 <b @click="clickLeft()" class="font-size-medium">{{leftLine.userId}}</b></div> 
               <div class="flex flex-items-center">
                  <span>级别</span>  
                   <span class="flex" style="margin-left:10px;">  <i class="star"  v-for="s in leftLine.gradeLevel" :key="s.id"></i>  </span>
               </div>
               <div class="flex flex-items-center">
                   信誉
                    <div class="flex" style="margin-left:10px;margin-bottom:0;"> <i class="xyStar"  v-for="x in leftLine.creditLevel" :key="x.id"></i></div>
                </div>
               <div>左线 <b>{{leftLine.leftLink}}</b></div>
               <div>右线 <b>{{leftLine.rightLink}}</b></div>
               <div>状态 <b>{{leftLine.status==0?'正常':'禁用'}}</b></div>
               <div>左点 <b>{{leftLine.leftUserId}}</b></div>
               <div>右点 <b>{{leftLine.rightUserId}}</b></div>  
            </div>
            <div class="regBtn" v-else>
                <mt-button size="large"  @click="regMain(1,mainId)" type="danger">注册主账号</mt-button>
                <mt-button size="large" style="margin:15px 0"  @click="regMain(3,mainId)" type="danger">注册子账号</mt-button>
            </div>
            <!-- 右线 -->
            <div v-if="rightLine.userId!=null || rightLine.userId!=undefined">
               <div>ID号 <b @click="clickRight()" class="font-size-medium">{{rightLine.userId}}</b></div> 
                <div class="flex flex-items-center">
                  <span>级别</span>  
                  <span class="flex" style="margin-left:10px;">  <i class="star"  v-for="s in rightLine.gradeLevel" :key="s.id"></i>  </span>
               </div>
                <div class="flex flex-items-center">
                   信誉 
                   <div class="flex" style="margin-left:10px;margin-bottom:0;"> <i class="xyStar"  v-for="x in rightLine.creditLevel" :key="x.id"></i></div>
               </div>
                <div>左线 <b>{{rightLine.leftLink}}</b></div>
                <div>右线 <b>{{rightLine.rightLink}}</b></div>
                <div>状态 <b>{{rightLine.status==0?'正常':'禁用'}}</b></div>
                <div>左点 <b>{{rightLine.leftUserId}}</b></div>
                <div>右点 <b>{{rightLine.rightUserId}}</b></div>   
            </div>
            <div  class="regBtn btnRgb" v-else>
                <mt-button size="large"  @click="regMain(2,mainId)" >注册主账号</mt-button>
                <mt-button size="large" style="margin:15px 0"  @click="regMain(4,mainId)" >注册子账号</mt-button>
            </div>
        </div>
        <!-- <div class="text-center" v-show="overLine==true" style="margin-top:130px"> <p>当前用户不在您的血缘内，您不能查看！</p> </div> -->
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { Indicator,MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            leftLine:'',
            rightLine:'',
            mainId:'',
            comMain:'',
            overLine:false,
            mainAccount:'',
            arr:''
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
        this.mainId=this.$route.query.userId
        this.loadData()
    },
    methods:{
        ...mapMutations(['setUserInfo']),
        regMain:function(item,mainId){
             this.$router.push('/regAccount?id='+item+'&userId='+mainId)
        },
        loadData:function(){
            Indicator.open();
            this.$http.post('app/user/getContactUserInfo',{
            userId:this.mainId
        }).then((data)=>{
            Indicator.close();
            if(data.data.code==200){
                this.parentId=data.data.data.parentId
                this.overLine=false
                this.comMain=data.data.data
                this.leftLine=data.data.data.leftUser
                this.rightLine=data.data.data.rightUser
            }else if(data.data.data==''){
                this.leftLine=''
                this.rightLine=''
                this.overLine=true
            }
        })
        },
        clickLeft:function(){
            this.arr=this.mainId
            this.mainId=this.leftLine.userId
            this.loadData()
        },
        clickRight:function(){
            this.arr=this.mainId
            this.mainId=this.rightLine.userId
            this.loadData()
        },
        mainPrev:function(){
            this.mainId=this.parentId
            if(this.mainId==this.getUserInfo.userId){
                 return
            }
            this.loadData()
        },
        oneKyeLogin:function(){
            this.$http.post('app/user/subAccountLogin',{
                subAccountId:this.mainId
            }).then((data)=>{
                if(data.data.code != 200){return};                
                this.setChildInfo=data.data.data;
                this.setUserInfo(this.setChildInfo)
                 this.$router.push('/my')
                // MessageBox.confirm('登陆成功，是否返回主页?').then(action => {
                //      if (action == 'confirm') {     
                           
                //         }
                //         }).catch(err => { 
                //     if (err == 'cancel') {
                //      this.$router.push('/mainAcc')
                //     } 
                // }) 
            })
        },
        regLeft:function(val){
           this.$http.post('app/user/getLastChild',{
               userId:this.getUserInfo.userId,
               position:val==0?0:1
           }).then((data)=>{
               this.mainId=data.data.data.userId
                this.loadData()
           })    
        }
        }
    }
</script>

<style>
.rlLine{
    height:64px;
    background: #363949;
    /* box-shadow: inset 0 -1px 0 0 rgba(216,216,216,0.20);   */
}
</style>
