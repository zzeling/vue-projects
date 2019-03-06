<template>
  <div class="wrap">
    <div id="box">
      <div id="marquee" v-html="lists" class="flex"></div>
      <div id="copy"></div>
    </div>
    <div id="node" class="flex" v-html="lists"></div>
  </div>
</template>
<script>
export default {
  name: 'Marquee',
  props:{
    lists:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      text: '',
    }
  },
  methods: {
    move () {
// 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      let width = document.getElementById('marquee').getBoundingClientRect().width 
      let box = document.getElementById('box')
      let copy = document.getElementById('copy')
      // copy.innerText = this.lists // 文字副本填充
      let distance = 0 // 位移距离
//设置位移
      setInterval(function () { 
        distance = distance - 1
 // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 10
        }
        
          // console.log(distance,388)
        // box.style.transform ='translate(100px)'
        box.style.transform = 'translateX(' + distance + 'px)'
      }, 50) 
    }
  },
// 把父组件传入的arr转化成字符串
  mounted: function () {
    // for (let i = 0; i < this.lists.length; i++) {
    //   this.text += ' ' + this.lists[i]
    // }
  },
// 更新的时候运动
  updated: function () {
    this.move()
  }
}
</script>
<style scoped>
/* // 限制外框宽度，隐藏多余的部分 */
.wrap {
background: rgba(38,103,207,0.30);
border: 1px solid #4384EC;
border-radius: 16px;
overflow: hidden;
height:32px;
line-height:32px;
font-size: 12px;
color: #363949;
}
/* // 移动框宽度设置 */
#box {
  width: 80000%;
}
/* // 文字一行显示 */
#box div {
  float: left;
}
/* // 设置前后间隔 */
#marquee {
   margin: 0 10px 0 0;
   /* height:32px; */
/* line-height:9px; */
}
/* // 获取宽度的节点，隐藏掉 */
#node {
  position: absolute;
  z-index: -999;
  top: -999999px;
}
</style>
