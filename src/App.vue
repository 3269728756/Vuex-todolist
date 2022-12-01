<template>
  <div id="app-wrapper">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="initValue"
      @change="handleInput"
      
    />
    <a-button type="primary" @click="add">添加事项</a-button>

    <a-list bordered :dataSource="changeList" class="dt_list">
      <template #renderItem="{ item }">
        <a-list-item>
          <!-- 复选框 -->
          <a-checkbox :checked="item.done" @click="(e)=>{changeDone(e,item.id)}">{{item.info}}</a-checkbox>
          <!-- 删除链接 -->
          <a slot="actions" @click="remove(item.id)">删除</a>
        </a-list-item>
      </template>
  

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{noActive}}条剩余</span>
        <a-button-group>
          <a-button :type='newKey==="all"?"primary":"default"' @click="changeBt('all')">全部</a-button>
          <a-button :type='newKey==="unDone"?"primary":"default"' @click="changeBt('unDone')">未完成</a-button>
          <a-button :type='newKey==="active"? "primary":"default"' @click="changeBt('active')">已完成</a-button>
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  
  data() {
    return {
      
    };
  },
  created(){
    this.$store.dispatch("getter")
  },
  computed:{
    ...mapState(["initValue","newKey"]),
    ...mapGetters(["noActive","changeList"])
  },
  methods:{
    handleInput(event){
      this.$store.commit("changeInput",event.target.value)
      

    },
    add(){
      if(this.initValue.trim().length<=0){
        return this.$message.warning("文本内容不能为空，请重新输入！")
      }
      this.$store.commit("addItem")

    },
    remove(id){
      this.$store.commit("removeItem",id)
    },
    changeDone(event,id){
      const params={
        id:id,
        status:event.target.checked
      }
      this.$store.commit("changeStatus",params)
    },
    clean(){
      this.$store.commit("cleanItem")
    },
    changeBt(key){
      this.$store.commit("Bclick",key)
    }
  }

  
};
</script>
<style scoped>
#app-wrapper {
  padding: 30px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #f0f0f0;
}
</style>