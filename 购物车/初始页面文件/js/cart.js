var vm=new Vue({
    el: '#app',
    data:{
        lists:[],
        checkAllClass:false,
        totalPrice:0},
    mounted:function(){
        this.$nextTick(function(){
            this.getRes()
        })
        },
    filters:{
        moneyFormat:function(val){
            if(!val){return 0}
            else {return "¥"+val}

        }
    },
    methods:{
        getRes:function(){
            let _this=this
            this.$http.get("./data/cartData.json").then(function(res){
                _this.lists=res.data.result.list
            })
        },
        changeQuantity:function(y,way){
            if(way>0){y.productQuantity++};
            if(way<0){y.productQuantity--};
            if(y.productQuantity<1) {y.productQuantity=1};
            this.totalMoney()

},
        toCheck:function(item){
            this.checkAllClass=false;
            if(typeof item.checked=="undefined"){Vue.set(item,"checked",true)}
            else {item.checked=!item.checked}
            this.totalMoney()
            },
        toCheckAll:function(tf){
            this.checkAllClass=tf
            if(tf==true){this.lists.forEach(
                function(item){
                    if(typeof item.checked=="undefined"){Vue.set(item,"checked",true)}
                    else {item.checked=true}})}
            else{this.lists.forEach(
                function(item){
                    if(typeof item.checked=="undefined"){Vue.set(item,"checked",false)}
                    else {item.checked=false}})
            }
            this.totalMoney();
        },
        totalMoney:function(){
            //计算总金额
            var _this=this
            this.totalPrice=0;
            this.lists.forEach(
                function (item) {
                    if(item.checked==true)
                    _this.totalPrice += (item.productPrice*item.productQuantity);
                })
        },
        removeList:function(){
            
        }
        }
    }
)


