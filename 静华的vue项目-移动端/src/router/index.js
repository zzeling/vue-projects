
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)
import home from '@/pages/home'
import Login from '@/pages/Login'
import my from '@/pages/my'
import exchange from '@/pages/exchange'
import footerNav from '@/components/footerNav'
import changePwd from '@/components/changePwd' 
import myMsg from '@/components/myMsg'
import ad from '@/components/ad' 
import payPwd from '@/components/payPwd'
import payment from '@/components/payment'
import HeirInfo from '@/components/HeirInfo' 
import Epsell from '@/components/Epsell'
import team from '@/components/team'  
import reg from '@/components/reg' 
import regAccount from '@/components/regAccount'
import regSuccess from '@/components/regSuccess'
import EpTrs from '@/components/EpTrs'
import EptoMp from '@/components/EptoMp' 
import GodSell from '@/components/GodSell'
import myEpSell from '@/components/myEpSell' 
import exCenter from '@/components/exCenter'
import orderDetail from '@/components/orderDetail'
import buyList from '@/components/buyList'
import EPsellList from '@/components/EPsellList'
import trsList from '@/components/trsList'
import childAcc from '@/components/childAcc'
import EPlist from '@/components/EPlist'
import EPrule from '@/components/EPrule'
import EpTrsRule from '@/components/EpTrsRule'
import EpTrsZpRule from '@/components/EpTrsZpRule'
import ZhRule from '@/components/ZhRule'
import childAccDtl from '@/components/childAccDtl'
import mainAcc from '@/components/mainAcc'
import EpTrsList from '@/components/EpTrsList'
import ZHSellList from '@/components/ZHSellList'
import msgList from '@/components/msgList'
import openList from '@/components/openList'
import giftList from '@/components/giftList'
import consumeList from '@/components/consumeList'
import productList from '@/components/productList'
import product from '@/pages/product'
import productDtl from '@/components/productDtl'
import cpTrs from '@/components/cpTrs'
import cpTrsList from '@/components/cpTrsList'
import pagination from '@/components/pagination'
import main from '@/pages/main'
// import canvasBg from '@/components/canvasBg'
Vue.use(Router)
/* eslint-disable 
/* eslint-disable */
// eslint-disable-next-line 
export default new Router({
  routes: [
      { path: '/', component: home }, 
      {path: '/home',component:home},
      {path: '/Login', component: Login},
      {path:'/footerNav',component:footerNav},
      {path:'/my',component:my},
      {path:'/exchange',component:exchange},
      {path:'/changePwd',component:changePwd},
      {path:'/myMsg',component:myMsg},
      {path:'/ad',component:ad},
      {path:'/payPwd',component:payPwd},
      {path:'/payment',component:payment},
      {path:'/HeirInfo',component:HeirInfo},
      {path:'/Epsell',component:Epsell},
      {path:'/team',component:team},
      {path:'/reg',component:reg},
      {path:'/regAccount',component:regAccount},
      {path:'/regSuccess',component:regSuccess},
      {path:'/EpTrs',component:EpTrs},
      {path:'/EptoMp',component:EptoMp},
      {path:'/GodSell',component:GodSell},
      {path:'/myEpSell',component:myEpSell},
      {path:'/exCenter',component:exCenter},
      {path:'/orderDetail',component:orderDetail},
      {path:'/buyList',component:buyList},
      {path:'/EPsellList',component:EPsellList},
      {path:'/trsList',component:trsList},
      {path:'/childAcc',component:childAcc},
      {path:'/EPlist',component:EPlist},
      {path:'/EPrule',component:EPrule},
      {path:'/EpTrsRule',component:EpTrsRule},
      {path:'/EpTrsZpRule',component:EpTrsZpRule},
      {path:'/ZhRule',component:ZhRule},
      {path:'/childAccDtl',component:childAccDtl},
      {path:'/mainAcc',component:mainAcc},
      {path:'/EpTrsList',component:EpTrsList},
      {path:'/ZHSellList',component:ZHSellList},
      {path:'/msgList',component:msgList},
      {path:'/openList',component:openList},
      {path:'/giftList',component:giftList},
      {path:'/consumeList',component:consumeList},
      {path:'/productList',component:productList},
      {path:'/product',component:product},
      {path:'/productDtl',component:productDtl},
      {path:'/cpTrs',component:cpTrs},
      {path:'/cpTrsList',component:cpTrsList},
      {path:'/pagination',component:pagination},
      {path:'/main',component:main},
      // {path:'/canvasBg',component:canvasBg},
  ]
})
// router.beforeEach((to, from, next) => {
//   var p1 = to.matched[0].components.default.name;
//   if (store.state.user == null && p1 == "My") {
//       next({ path: '/'});
//   } else{
//       next();
//   }
// })
//  export default router;
