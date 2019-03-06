<template>
    <div>
        <mt-header title="我的子账号">
            <router-link to="/my" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
         <!-- <div>
            <div class="myTeamBg childBg text-center color-in">
               
                <div @click="CollectEP()" class="oneKey"><h1 style="color:#74C1D2;">一键收EP</h1></div> 
                <div style="margin-top:30px;padding:0 20px;" class="flex flex-content-between flex-items-center">
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
                        <div><b>{{gradeLeFore.length}}</b></div>
                        <div>四星</div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="padding-r-l flex flex-content-between  " style="margin-top:10px;">
            <div class="selStar" @click="selLev">
                <i class="down"></i>
                <mt-field placeholder="选择类别" readonly v-model="selVal"></mt-field>
            </div>
            <div class="selSearch">
                <form action="" target="frameFile" @submit.prevent="submitSearch">
                    <mt-search v-model="value"  placeholder="搜索ID"></mt-search>
                </form>
            </div>
             <mt-button  :disabled="value.length<5 && (selVal==''|| selVal==null)" @click="handleinput(1)"  type="primary" size="small"><img style="padding-top:5px;" src="../assets/img/seh.png" alt="" width="25" height="25"></mt-button>
        </div>
        <div v-if="teamList.length!=0 "  class="flex flex-items-center flex-content-between" style="padding:8px 10px;margin-top:16px;background: #414351;">
            <div style="width:20%;">玩家ID</div>
            <div style="width:26%;">星级</div>
            <div style="width:18%;">EP</div>
            <div style="width:18%;">AP</div>
            <div style="width:18%;">ABC</div>
        </div>
        <div>
        <div @click="childdil(t.userId)" v-for="t in teamList" :key="t.id" style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
            <div style="width:20%;" class="font-size-medium">{{t.userId}}</div>
            <div style="width:29%;">
                <div class="flex"> 
                    <i class="star"  v-for="s in t.gradeLevel" :key="s.id"></i> 
                </div>
            </div>
            <div style="width:18%;"> <b class="color-in">{{t.cashIntegral}}</b> </div>
            <div style="width:18%;"> <b class="color-in">{{t.openAccountIntegral}}</b> </div>
            <div style="width:18%;"> <b class="color-in">{{t.giftIntegral}}</b> </div>
        </div>
         <pagination :class="teamList==null || teamList==''?'hiddenPage':'showPage'" :total="total" v-model="current" ></pagination>
            <div v-if="teamList.length==0" class="text-center" style="margin-top:50px;"><p><img src="../assets/images/nopeo.png" width="88" height="85px"> </p><p>暂无数据</p></div>
        </div>
        <!-- 星级类别 -->
        <div>
            <mt-popup v-model="popupVisible" position="bottom">
                <mt-picker :slots="sloVal" valueKey="gradeName" @change="onValuesChange"></mt-picker>
            </mt-popup>
        </div>
    </div>
</template>
<script>
import pagination from '../components/pagination'
import { mapMutations, mapGetters } from 'vuex'
import { Toast,MessageBox,Indicator  } from 'mint-ui';
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
            gradeLeFore:'',
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
        // this.loadList()
        this.pagechange(1)
    },
    methods:{
        ...mapMutations(['setUserInfo']),
         pagechange:function(current){
            Indicator.open();
            this.$http.post('app/user/subAccountList?pageNo='+current+'&pageSize='+this.pageSize,{
              gradeId:this.gradeId!=null?this.gradeId:'',
              userId:this.value!=null?this.value:''
            }).then((data)=>{
                Indicator.close();
                this.total=data.data.data.totalCount
                this.teamList=data.data.data.data
                this.gradeLeOne=this.teamList.filter(p=>{return p.gradeLevel==1})
                this.gradeLetwo=this.teamList.filter(p=>{return p.gradeLevel==2})
                this.gradeLeThree=this.teamList.filter(p=>{return p.gradeLevel==3})
                this.gradeLeFore=this.teamList.filter(p=>{return p.gradeLevel==4})
                this.total=data.data.data.totalCount
                
            })
        },
        handleinput:function(current){
           this.current = current;
            this.popupVisible=false
             Indicator.open();
            this.$http.post('app/user/subAccountList?pageNo='+current+'&pageSize='+this.pageSize,{
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
        onValuesChange(picker, values) {
            if(values==''){
                this.selVal="全部"
            }    
            if(values[0]!=undefined){
            this.selVal=values[0].gradeName
            this.gradeId=values[0].gradeId
         }
        },
        childdil:function(id){
            this.$router.push('/childAccDtl?userId='+id)
        }
    }
}
</script>

<style scoped>
.childBg{
background:url('../assets/images/childAcc.png') no-repeat center center;
box-shadow: 0 0 0 0 0;
color:#74C1D2;
background-size: 100% ; 
margin-top:10px;
}
.oneKey{
width:50%;
margin:45px auto 0 auto;
}

</style>
