

<template>
<div>
<p>MAKE YOUR LIST</p>
  <input id="text" v-model="newtodolist"><button v-on:click="addNew">提交</button>
  <ul>
    <li v-for="(list,index) in lists" v-on:click="turnRed" v-bind:class="{finished:finished}" v-show="show">
{{index}}{{list}}<span class="span"></span><button v-on:click="lists.splice(index,1)" >删除</button>
    </li>
  </ul>
</div>

</template>

<script>
export default {
  components:{},
  data() {
    return {
      finished:false,
      lists:[],
      newtodolist:"",
      show:true,
      mesg:""
    }
  },
  methods:{
    addNew(){
      this.lists.push(this.newtodolist),
        this.newtodolist=""
    },
    turnRed(){
      this.finished=!this.finished
    },
    del(){
      this.lists.splice(index,1)
    }
  }
}

</script>

<style>
.span{
  margin:0 20px
}


</style>
