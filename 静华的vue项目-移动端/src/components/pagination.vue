<template>
  <div>
    <ul class="pagination">
      <!-- <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"> « </a></li> -->
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="p in grouplist" :key="p.id" :class="{'active': current == p.val}">
        <a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
      <!-- <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"> »</a></li> -->
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        current: 1
      }
    },
     model: {
      prop: 'currentPage', //v-model绑定的数据，相当于别名，可以和父组件中的变量名称不一样。
      event: 'pagechange' // 自定义组件发送的信号名称。
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      pageSize: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pageNo: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    watch:{
      currentPage:function(val){
        this.current = val;
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.pageSize);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pageNo / 2), center = this.current;
        if (len <= this.pageNo) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pageNo);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.$emit('pagechange', this.current);
        }
      }
    }
  }
</script>

<style lang="less">
  .pagination {
    overflow: hidden;
    display: table;
    margin: 10px auto;
    /*width: 100%;*/
    height: 50px;

  li {
    float: left;
    height: 30px;
    border-radius: 5px;
    margin: 3px;
    color: #666;

  &
  :hover {
    // background: #74C1D2;

  a {
    color: #fff;
  }

  }
  a {
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    border-radius: 5px;
    text-decoration: none
  }

  }
  .active {
    background: #4384EC;

  a {
    color: #fff;
  }

  }
  }

</style>