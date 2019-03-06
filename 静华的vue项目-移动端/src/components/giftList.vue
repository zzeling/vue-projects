<template>
    <div>
        <mt-header title="ABC">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div v-if="entrList!=null" class="EpS" style="padding:20px;height:150px;">
            <div class="flexlList">
                
                <div class="color-in"> <b style="font-size:16px;">  配ABC排序中...</b></div>
                <div>
                    <div>位置：</div><div >{{entrList.sortNum}}</div>
                </div>
                <div>
                    <div>当前单价：</div><div >{{entrList.gskPrice}}</div>
                </div>
                <div>
                    <div>配ABC比例：</div><div >{{entrList.gskRate}}</div>
                </div>
                <div>
                    <div>待分配：</div><div >{{entrList.unAllocateNum}}</div>
                </div>
                
            </div>
        </div>
        <div v-if="teamList!=null && teamList!=''">
            <div class="padding-r-l flex flex-content-between  " style="margin-top:10px;" v-if="teamList!=null || teamList!=''">
                <div class="selStar"  style="height:32px;" @click="selLev">
                    <i class="down"></i>
                    <mt-field placeholder="选择类别" readonly v-model="selVal"></mt-field>
                </div>
                <div class="selStar selDate" style="width:50%;">
                    <i class="down"></i>
                    <mt-field  placeholder="请选择日期" type="date" v-model="date"></mt-field>
                </div>
                <mt-button style="width:18%" :disabled="date==''&&selVal==''" @click="handleinput(1)" type="primary" size="small"><img style="padding-top:5px;" src="../assets/img/seh.png" alt="" width="25" height="25"></mt-button>
            </div>
            <div   class="flex flex-items-center flex-content-between titBg" style="margin-top:24px;color: rgba(255,255,255,0.40);padding:8px 20px">
                <div style="width:30%;">时间</div>
                <div style="width:20%;">数量</div>
                <div style="width:30%;">类别</div>
                <div style="width:20%;">结存</div>
            </div>
        
            <div>
                <div v-for="t in teamList" :key="t.id" style="height:60px;text-align:left;" class="flex   padding-r-l flex-items-center flex-content-between">
                    <div style="width:30%;color: rgba(255,255,255,0.40);">{{t.createTime.substr(5,11)}}</div>
                    <div style="width:20%;" :class="t.addOrSub==1?'color-danger':''">{{t.addOrSub==0?'+ '+t.count:'- '+t.count}}</div>
                    <div style="width:30%;color: rgba(255,255,255,0.40);">{{t.operateType}}</div>
                    <div style="width:20%;color: rgba(255,255,255,0.40);"  @click="jcDel(t.logId)">{{t.afterCount}}</div>
                </div>
            </div>
            <!-- <div v-if="teamList==null || teamList==''" class=" posNoList"><p>暂无数据</p></div> -->
            <pagination :class="teamList==null || teamList==''?'hiddenPage':'showPage'" :total="total" v-model="current" ></pagination>
        </div>
        <!-- 积分详情弹框 -->
        <div class="jList">
             <mt-popup v-model="mx"  position="middle" >
                <div class="jxmx" v-for="jx in tList" :key="jx.id" style="padding-top:50px;">
                   <div class="err"></div> 
                    <div class="listDetail">
                        <div v-if="jx.totalSell!=null"><div >挂单量：</div><div>{{jx.totalSell}}</div></div>
                        <div><div>时间：</div><div>{{jx.createTime}}</div></div>
                        <div><div>成交量：</div><div :class="jx.addOrSub==1?'color-danger':''">{{jx.addOrSub==0?'+ '+jx.count:'- '+jx.count}}</div></div>
                        <div v-if="jx.price!=null"><div>单价：</div><div>{{jx.price}}</div></div>
                        <div v-if="jx.totalValue!=null"><div>总值：</div><div>{{jx.totalValue}}</div></div>
                        <div v-if="jx.fromUserId!=null&&jx.operateType!='交易手续费'"><div>交易玩家：</div><div>{{jx.fromUserId}}</div></div>
                        <div><div>说明：</div><div class="font-size-mini" style="width: 65%;">{{jx.detail}}</div></div>
                        <div><div>结存：</div><div>{{jx.afterCount}}</div></div>
                    </div>
                    <div class="closeMx">
                        <mt-button  @click="close()" style="border-radius: 30px;width:50%;height:60px;" size="normal" type="primary" > <b>我知道了</b> </mt-button>
                    </div>
                </div>
            </mt-popup>
        </div>
        <!-- 选择类别 -->
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
            sloVal:[{values: ['全部',"交易","拆分",'充值','指导回收']}],
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
            total:0,
            entrList:''              
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
            this.$http.post('app/userIntegral/integralLog?pageNo='+this.pageNo+'&pageSize='+this.pageSize,{
                operateType:"",
                integralType:"ABC",
                curDate:"",
            }).then((data)=>{
                Indicator.close(); 
                if(data.data.code!=200){return;}
                this.teamList=data.data.data.data
                this.entrList=data.data.data.entranceInfo
                this.total=data.data.data.totalCount
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
        handleinput:function(current){
            this.current = current;
            this.popupVisible=false
             Indicator.open();
            this.$http.post('app/userIntegral/integralLog?pageNo='+current+'&pageSize='+this.pageSize,{
                operateType:this.selVal=='全部'||this.selVal==null?'':this.selVal[0],
                integralType:"ABC",
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
      
    }
    
}
</script>
<style scoped>

</style>
