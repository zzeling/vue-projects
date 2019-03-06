<template>
    <div>
         <mt-header :title="this.lrId==1||this.lrId==2?'注册主账号':'注册子账号'">
            <router-link to="/reg" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button style="color: #4384EC;" @click="qx()"  slot="right">取消</mt-button>
        </mt-header>
        <div class=" regTitle "   style="margin:16px 0;color:#9B9B9B;">
            <mt-cell title="推荐人" v-if="this.lrId==1||this.lrId==2" :value="getUserInfo.userId"></mt-cell>
            <mt-cell title="安置人"  :value="this.lrId==1||this.lrId==3?anzhiId+' - 左区':anzhiId+' - 右区'"></mt-cell>
        </div> 
        <div class="regTitle">
            <div>
                <div @click="grade()" style="position:relative;">
                  <mt-field label="注册星级"   :state="this.selVal != null?'success':'error'"  readonly placeholder="请选择注册星级" v-model="selVal">
                  </mt-field>
                </div>
                <mt-field label="登录名"   v-if="this.lrId==1||this.lrId==2" :state="pwdReg.test(userName)?'success':'error'"  placeholder="登录名6-20位数字字母组合" v-model="userName"></mt-field>
                <mt-field label="真实姓名"   v-if="this.lrId==1||this.lrId==2" :state="this.realName!=''?'success':'error'" placeholder="请输入真实姓名" v-model="realName"></mt-field>
                <mt-field label="手机号码"   v-if="this.lrId==1||this.lrId==2" :state="phoneReg.test(phone)?'success':'error'" type="tel" placeholder="请输入手机号码" v-model="phone"></mt-field>
            </div>   
            <div class="" style="margin-top:16px;">
                <mt-field label="登录密码"   v-if="this.lrId==1||this.lrId==2" :state="pwdReg.test(password)?'success':'error'" placeholder="密码需6-20位数字字母组合" type="password" v-model="password"></mt-field>
                <mt-field label="确认密码"   v-if="this.lrId==1||this.lrId==2" :state="rpwd==password&&password!=''?'success':'error'" placeholder="请确认密码" type="password" v-model="rpwd"></mt-field>
            </div> 
            <div  style="margin-top:16px;">
                <mt-field label="支付密码"  :state="pwdReg.test(payPwd)?'success':'error'" placeholder="密码需6-20位数字字母组合" type="password" v-model="payPwd"></mt-field>
                <mt-field label="确认密码"  v-if="this.lrId==1||this.lrId==2" :state="rpayPwd==payPwd&&payPwd!=''?'success':'error'" placeholder="请确认支付密码" type="password" v-model="rpayPwd"></mt-field>
            </div>  
        </div>
        <div class="padding-r-l">
            <!-- 主账号 -->
            <mt-button type="primary" v-if="this.lrId==1||this.lrId==2" :disabled="!(selVal != null&&userName!=''&&realName!=''&& phoneReg.test(phone)&&pwdReg.test(rpwd)&&pwdReg.test(rpayPwd))" @click="submit(1)" style="margin:16px 0;" size="large" >立即注册</mt-button>
            <!-- 子账号 -->
            <mt-button type="primary" v-else :disabled="!(pwdReg.test(payPwd))" @click="submit()" style="margin:16px 0;" size="large" >立即注册</mt-button>
        </div>
        <div>
            <mt-popup v-model="popupVisible" position="bottom">
                <mt-picker :slots="sloVal" valueKey="gradeName"  @change="onValuesChange"></mt-picker>
            </mt-popup>
        </div>
    </div>
</template>

<style scoped>

</style>


<script>
import { mapMutations, mapGetters } from 'vuex'
import { Toast,MessageBox,Indicator   } from 'mint-ui';
export default {
    data(){
        return{
            realName:'',
            phone:'',
            userName:'',
            gradeId:'',
            password:'',
            rpwd:'',
            payPwd:'',
            rpayPwd:'',
            leftLine:'',
            rightLine:'',
            lrId:'',
            popupVisible:false,
            sloVal:[],
            phoneReg: 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/,
            pwdReg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            valid:false,
            gradeList:[],
            newAccId:'',
            anzhiId:'',
           selVal:'',
           starId:""


        }
    },
    watch:{
         getUserInfo: function(val){
        },
        beforeRouteUpdate(to,from,next){
        this.getData(to.query.id,to.query.userId);
        next();
        },
    },
    computed: {
      ...mapGetters(['getUserInfo'])
       
    },
    created(){
        this.getData(this.$route.query.id,this.$route.query.userId);
        this.anzhiId=this.$route.query.userId
        this.lrId=this.$route.query.id
        Indicator.open();
         this.$http.post('app/user/getContactUserInfo',{
             userId:this.getUserInfo.userId
         }).then((data)=>{
             Indicator.close();
            if(data.data.code==200){
                this.leftLine=data.data.data.leftUser
                this.rightLine=data.data.data.rightUser
            }
        })
         this.$http.post('app/sysInfo/grade').then((data)=>{
            this.gradeList=data.data.data;
            this.oneId=this.gradeList.filter(p=>{return p.gradeName=='一星'?p.gradeId:''})
            this.starId=this.oneId[0].gradeId
            this.sloVal.push({
                values: this.gradeList,
                textAlign: 'center',
            });
        })
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        getData(id,userId){
        },
        grade:function(){
            this.popupVisible=true
        },
        onValuesChange(picker, values) {
         if(values[0]!=undefined){
            this.selVal=values[0].gradeName
            this.gradeId=values[0].gradeId
         }else{
             this.selVal='一星'
             this.gradeId=this.starId
         }
        },
        qx:function(){
                MessageBox.confirm('已填写的信息无法保存','确定取消注册吗？').then(action => {
                    this.realName='',
                    this.phone='',
                    this.userName='',
                    this.gradeId=null,
                    this.password='',
                    this.rpwd='',
                    this.payPwd='',
                    this.rpayPwd=''
                });
        },
        submit:function(val){
            if(val){
                MessageBox.prompt('确认注册','',{inputPlaceholder:'请输入支付密码',inputType:'password'}).then(({ value, action, }) => {
                    this.zc(value)
                })
            }else{
                this.zc()
            }
        },
        zc:function(value){
            this.$http.post('app/user/register',{
                userName:this.userName,
                password:this.password,   
                tradePassword:this.lrId==3||this.lrId==4?'':this.payPwd,
                realName:this.realName,
                phone:this.phone,
                gradeId:this.selVal==='一星'||this.selVal==null?this.starId:this.gradeId,
                position:this.lrId==1||this.lrId==3?0:this.lrId==2||this.lrId==4?1:'',
                isSubAccount:this.lrId==1||this.lrId==2?0:this.lrId==3||this.lrId==4?1:'',
                parentId:this.anzhiId,
                //   parentId:(this.lrId==1||this.lrId==3)&&this.leftLine.userId!=''?this.leftLine.userId:(this.lrId==2||this.lrId==4)&&this.rightLine.userId!=''?this.rightLine.userId:Number(this.getUserInfo.userId),
                myTradePassword:value||this.payPwd
            }).then((data)=>{
                if(data.data.message=='开户积分不足'){
                    MessageBox.confirm('是否前往转换开户积分？','开户积分余额不足').then(action => {
                        this.$router.push('/EptoMp')
                    });
                }else if(data.data.code==200){
                    this.newAccId=data.data.data
                    this.$router.push('/regSuccess?id='+this.newAccId)
                }else{
                    //   Toast({message:'message'})
                }
                },error=>{

            });
        }
    }
}
</script>
