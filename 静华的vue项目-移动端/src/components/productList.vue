<template>
    <div>
        <mt-header title="产品积分">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="padding-r-l flex flex-content-between  " style="margin-top:20px;">
                <div class="selStar"  style="height:32px;" @click="selLev">
                    <i class="down"></i>
                    <mt-field placeholder="选择类别" readonly v-model="selVal"></mt-field>
                </div>
                <div class="selStar selDate" style="width:50%;">
                    <i class="down"></i>
                    <mt-field  placeholder="请选择日期" type="date" v-model="date"></mt-field>
                </div>
                <mt-button :disabled="date==''&&selVal==''" @click="handleinput(1)" type="primary" size="small">搜索</mt-button>
            </div>
        <div   class="flex flex-items-center flex-content-between" style="padding:18px 10px 5px 10px;margin-top:15px;">
            <div style="width:30%;">时间</div>
            <div style="width:20%;">数量</div>
            <div style="width:30%;">类别</div>
            <div style="width:20%;">结存</div>
        </div>
       
        <div>
            <div v-for="t in teamList" :key="t.id" style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
                <div style="width:30%;">{{t.createTime.substr(5,11)}}</div>
                <div style="width:20%;" :class="t.addOrSub==0?'color-in':'color-g'">{{t.addOrSub==0?'+'+t.count:'-'+t.count}}</div>
                <div class="color-in" style="width:30%;"> {{t.operateType}}</div>
                <div style="width:20%;"  @click="jcDel(t.logId)"> <b class="color-in">{{t.afterCount}}</b> </div>
            </div>
        </div>
        <div v-if="teamList==null || teamList==''" class=" posNoList" ><p>暂无数据</p></div>
        <pagination :class="teamList==null || teamList==''?'hiddenPage':'showPage'" :total="total" v-model="current" ></pagination> 
        
        <!-- 积分详情弹框 -->
        <div class="jList">
         <mt-popup v-model="mx"  position="middle" >
                <div class="jxmx" v-for="jx in tList" :key="jx.id">
                   <div class="err" @click="close()"></div> 
                    <div class="color-in font-size-medium"><b>{{jx.operateType}}</b></div>
                    <p style="color:#D8D8D8 ;"><b>详情</b></p>
                    <div class="color-g">{{jx.detail}}</div>
                </div>
            </mt-popup>
        </div>
        <!-- 选择类别 -->
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
import { Toast,Loadmore,Indicator   } from 'mint-ui';
export default {
    filters: {                    //时间转换
        formatDate(time) {
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd');
        }
      },
    data(){
        return{
            selVal:'',
            value:new Date(),
            startDate: new Date(),      //设置开始时间
            endDate: new Date('2019-01-22'),   //设置结束时间
            popupVisible:false,
            sloVal:[{values: ['全部',"开户","兑换"]}],
            gradeList:[],
            teamList:[],
            gradeId:'',
            mx:false,
            tit:'',
            tList:[],
            date:'',
            list:[],
             pageNo:1,
            pageSize:10,
            totalCount: 0, // 总条数
            totalPage: 1, // 总分页数
            listDate:[],
            currentPage: 1,
            selDate:[],
            current:1,
            total:0           
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
         this.pagechange(1)
    },
    methods:{
        ...mapMutations(['setUserInfo']),
       pagechange:function(current){
            Indicator.open(); 
            this.$http.post('app/userIntegral/integralLog?pageNo='+current+'&pageSize='+this.pageSize,{
                operateType:"",
                integralType:"产品积分",
                curDate:"",
            }).then((data)=>{
                Indicator.close(); 
                if(data.data.code!=200){return;}
                this.total=data.data.data.totalCount
                this.teamList=data.data.data.data 
            },err=>{
                console.log('error' + err)
            })
        },
        kaihu:function(){
            this.$router.push('/reg')
        },
        selLev:function(){
            this.popupVisible=true
        },
        onValuesChange(picker, values) {
         this.selVal=values
        },
        submitSearch:function(){
           
        },
        jcDel:function(tid){
           this.tit=tid
           this.mx=true
           this.tList=this.teamList.filter(p=>{return p.logId==this.tit})
        },
        close:function(){
           this.mx=false
        },
        loadMore:function(){
            this.loading = true;
            this.pageNo++;
            this.getList();
        },
        handleinput:function(current){
            this.current = current;
            this.popupVisible=false
             Indicator.open();
            this.$http.post('app/userIntegral/integralLog?pageNo='+current+'&pageSize='+this.pageSize,{
                operateType:this.selVal=='全部'||this.selVal==null?'':this.selVal[0],
                integralType:"产品积分",
                curDate:this.date!=null?this.date:'',
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
            this.selVal=='全部'
        }
      
      
    },
    
}
</script>
<style scoped>
.jxmx{
    width:100%;
    margin:0 auto;
    height:150px;
    padding:15px 0;
    border-radius: 4px;
    text-align: center;
    position:relative;
}
.err{
    background:url('../assets/images/chanel.png') no-repeat center center;
    width:50px;height:12px;
    position:absolute;
    right:0;
    top:16px;
    background-size: 25% 100%;
    z-index: 999;
}
</style>
