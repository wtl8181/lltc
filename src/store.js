//这是共享数据的仓库
import Vue from 'vue'
import  Vuex from 'vuex'
Vue.use(Vuex)
const  store = new Vuex.Store({
  state:{//state数据跟根组件data写法一模一样。也是储存数据的
    userId : localStorage.getItem("userId"),//存用户的id（唯一标识）
    editPlate:'',
  },
  mutations:{//此处的function是同步操作的。其他的都跟上面一样
    setRouting (state, loginstatus) {//路由权限
      state.loginstatus = loginstatus
      sessionStorage.setItem('loginstatus', loginstatus)
    },
    plateBus(state,value){//这里面的函数，第一个参数是state
      state.editPlate = value;//将值传到state里面。
      console.log(`store中的值此时为${state.editPlate}`)
    },
    plateErase(state){
      state.editPlate = '';
      console.log(`值被擦除`)
    }

  },
  getters:{//这个跟组件的computed差不多，接收state作为参数，不接受组件传参数。需要return值。

  },
  actions:{//actions里面全是方法，与mutations区别只有这儿的方法可以使用异步操作

  }
})
export default store
