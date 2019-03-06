<template>
    <div>
         <mt-header title="我的团队">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button style="color: #4384EC;" @click="kaihu()" slot="right">开户</mt-button>
        </mt-header>
        <!-- <div>
            <div class="myTeamBg text-center">
                <p style="margin-top:24px;">团队积分</p>
                <h1 style="color:#7AA5E6;">{{list.leftTeamIntegral+list.rightTeamIntegral}}</h1>
                <div style="margin-top:24px;padding:0 20px;color:#7AA5E6;" class="flex flex-content-between flex-items-center">
                    <div>
                        <div><b>{{gradeLeOne.length}}</b></div>
                        <div>一星</div>
                    </div>
                    <div>
                        <div><b>{{gradeLetwo.length}}</b></div>
                        <div>二星</div>
                    </div>
                    <div>
                        <div><b>{{gradeLeThree.length}}</b></div>
                        <div>三星</div>
                    </div>
                    <div>
                        <div><b>{{gradeLeFour.length}}</b></div>
                        <div>四星</div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="padding-r-l flex flex-content-between " style="margin-top:10px;">
            <div class="selStar" @click="selLev">
                <i class="down"></i>
                <mt-field placeholder="选择类别" readonly v-model="selVal"></mt-field>
                </div>
            <div class="selSearch">
                 <!-- <form action="" target="frameFile" @submit.prevent="submitSearch"> -->
                    <mt-search v-model="value"  placeholder="搜索ID"></mt-search>
                <!-- </form> -->
            </div>
             <mt-button  :disabled="value.length<5 && (selVal==''|| selVal==null)" @click="handleinput(1)"  type="primary" size="small"><img style="padding-top:5px;" src="../assets/img/seh.png" alt="" width="25" height="25"></mt-button>
        </div>
        <div   class="flex flex-items-center flex-content-between" style="margin-top:16px;padding:8px 10px;background: #414351;">
            <div style="width:25%;">玩家ID</div>
            <div style="width:35%;">星级</div>
            <div style="width:20%;">左线</div>
            <div style="width:20%;">右线</div>
        </div>
        <div>
            <div  v-for="t in teamList" :key="t.id" style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
                <div style="width:25%;" class="font-size-medium">{{t.userId}}</div>
                <div style="width:35%;">
                     <div class="flex" > 
                    <i class="star"  v-for="s in t.gradeLevel" :key="s.id"></i> 
                </div>
                </div>
                <div style="width:20%;"> <b class="color-in">{{t.leftTeamIntegral}}</b> </div>
               <div style="width:20%;"> <b class="color-in">{{t.rightTeamIntegral}}</b> </div>
            </div>
              <pagination :class="teamList==null || teamList==''?'hiddenPage':'showPage'" :total="total" v-model="current" ></pagination>
            <div v-if="teamList==null|| teamList==''" class="text-center" style="margin-top:50px;"><p><img src="../assets/images/nopeo.png" width="88" height="85px"> </p><p>暂无数据</p></div>
        </div>
        <!-- 星级类别 -->
        <div>
            <mt-popup v-model="popupVisible" position="bottom">
                <div>
                    <mt-picker :slots="sloVal" valueKey="gradeName" @change="onValuesChange"></mt-picker>
                </div>
            </mt-popup>
        </div>
    </div>
</template>
<script>
import pagination from '../components/pagination'
import { mapMutations, mapGetters } from 'vuex'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            selVal:'',
            value:'',
            popupVisible:false,
            sloVal:[],
            gradeList:[],
            teamList:[],
            gradeId:'',
            gradeLeOne:'',
            gradeLetwo:'',
            gradeLeThree:'',
            gradeLeFour:'',
            list:'',
            pageNo:1,
            pageSize:10,
            current:1,
            total:0,
            selDate:[],
            gradeId:'',
            oneX:'',
            valDate:[]
        }
    },
     components:{
        pagination
    },
    watch:{
        getUserInfo: function(val){
        },
         current:function(val,old){
            if(val == old) return;
            this.handleinput(val)
        }
    },
    computed: {
      ...mapGetters(['getUserInfo']),
    },
    created:function(){
        this.$http.post('app/sysInfo/grade').then((data)=>{
            this.gradeList=data.data.data;
            this.gradeList.unshift({
                gradeName:'全部'
            })
            this.sloVal.push({
                values: this.gradeList,
                textAlign: 'center',
            });
        })
        this.pagechange(1)
        this.loadData()
    },
    methods:{
        ...mapMutations(['setUserInfo']),
         loadData:function(){
             Indicator.open();
            this.$http.post('app/user/refreshUserInfo',{
                token:this.getUserInfo.token
            }).then((data)=>{
                Indicator.close();
            if(data.data.code!=200) return;
                this.list=data.data.data
        })
        },
        pagechange:function(current){
            Indicator.open(); 
            this.$http.post('app/user/recommenderList?pageNo='+current+'&pageSize='+this.pageSize,{
                recommenderId:this.getUserInfo.userId
            }).then((data)=>{
                Indicator.close(); 
                if(data.data.code!=200){return;}
                this.total=data.data.data.totalCount
                this.teamList=data.data.data.data
                this.gradeLeOne=this.teamList.filter(p=>{return p.gradeLevel==1})
                this.gradeLetwo=this.teamList.filter(p=>{return p.gradeLevel==2})
                this.gradeLeThree=this.teamList.filter(p=>{return p.gradeLevel==3})
                this.gradeLeFour=this.teamList.filter(p=>{return p.gradeLevel==4})
            },err=>{
                console.log('error' + err)
            })
        },
         onValuesChange(picker, values) {
            if(values==''){
                this.selVal="全部"
            }           
            if(values[0]!=undefined){
            this.selVal=values[0].gradeName
            this.gradeId=values[0].gradeId
         }
        },
        handleinput:function(current){
           this.current = current;
            this.popupVisible=false
             Indicator.open();
            this.$http.post('app/user/recommenderList?pageNo='+current+'&pageSize='+this.pageSize,{
              gradeId:this.gradeId!=null?this.gradeId:'',
              userId:this.value!=null?this.value:''
            }).then((data)=>{
                if(data.data.code!=200){return;}
                Indicator.close();
                  this.selDate=data.data.data.data
                  this.teamList=this.selDate
                  this.total=data.data.data.totalCount
                    
             },error=>{
                Indicator.close();
                Toast({message: '加载出错'});
            })
        },
        qx:function(){
            this.popupVisible=false
        },
        kaihu:function(){
            this.$router.push('/reg')
        },
        selLev:function(){
            this.popupVisible=true 
        },
       
        // xzDate:function(current){
        //      this.current = current;
        //     this.popupVisible=false
        //      Indicator.open();
        //     this.$http.post('app/user/recommenderList?pageNo='+current+'&pageSize='+this.pageSize,{
        //        userId:this.value
        //     }).then((data)=>{
        //         if(data.data.code!=200){return;}
        //         Indicator.close();
        //           this.valDate=data.data.data.data
        //           this.teamList=this.valDate
        //           this.total=data.data.data.totalCount
                    
        //      },error=>{
        //         Indicator.close();
        //         Toast({message: '加载出错'});
        //     })
        // }
    }
}
</script>
