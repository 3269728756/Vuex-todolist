import { createStore } from 'vuex'
import axios from "axios"
import ServerError from 'ant-design-vue/lib/result/serverError'

export default createStore({
  state: {
    list:[],
    initValue:"",
    nextId:5,
    newKey:"all"
  },
  getters: {
  },
  mutations: {
    initList(state,list){
      state.list=list
    },
    changeInput(state,value){
      state.initValue=value
    },
    addItem(state){
      const obj={
        id:state.nextId,
        info:state.initValue,
        done:false
      }
      state.list.push(obj)
      state.nextId++
      state.initValue=""
    },
    removeItem(state,id){
     const i= state.list.findIndex(x=>x.id===id)
      if(i!==-1){
        state.list.splice(i,1)
      }
    },
    changeStatus(state,params){
      const i=state.list.findIndex(x=>x.id===params.id)
      if(i!==-1){
        state.list[i].done=params.status
      }
    },
    cleanItem(state){
      state.list=state.list.filter(x=>x.done===false)
    },
    Bclick(state,key){
      state.newKey=key
    }
  },
  actions: {
    getter(context){
      axios.get("/list.json").then(({data})=>{
        context.commit("initList",data)
      })
        
      
    }
  },
  getters:{
    noActive(state){
      return state.list.filter(x=>x.done===false).length
    },
    changeList(state){
      if(state.newKey==="all"){
        return state.list
      }else if(state.newKey==="unDone"){
        return state.list.filter(x=>x.done===false)
      }else if(state.newKey==="active"){
        return state.list.filter(x=>x.done===true)
      }
      return state.list
      
    }

  },
  modules: {
  }
})
