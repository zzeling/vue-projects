const STORAGE_KEY = 'studentName-vuejs'

export default {
	fetch: function() {

	  //JSON.parse() 方法：将数据转换为 JavaScript 对象
    //window.sessionStrorage 创建一个本地存储的 name/value 对，getItem 读取键值对数据
		return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)
		 || '[]')
	},
	save:function(items) {
		window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))//JSON.stringify()方法将字符串转化为JSON对象
	}
}


