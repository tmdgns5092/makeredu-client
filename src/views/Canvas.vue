<template>
  <div id="canvas">
      <div>
<!--좌측 썸네일 리스트 시작-->        
        <ul id="smallView">
          <li v-for="(item,index) in canvasList" :key="index" @click="loadScene(index)"></li>
          <li @click="addScene">+</li>
        </ul>
<!--좌측 썸네일 리스트 끝-->        
        
<!-- 문서 작업 영역 시작-->        
        <div id="canvasWrap"> 
          <canvasArea/>
        </div>
<!-- 문서 작업 영역 끝-->     

<!-- 채팅 영역 시작-->
        <div id="chatWrap"> 
          <chatArea />
        </div>
<!-- 채팅 영역 끝-->        
      </div>
  </div>
</template>

<script>
import canvasArea from '@/components/canvasArea.vue'; /* 문서 작업 컴포넌트 불러오기*/
import chatArea from '@/components/chatArea.vue';     /* 채팅 컴포넌트 불러오기 */

export default {
// 	name : 'canvas',
	name : 'canvasList',
	data() {
	  return{
	    canvasList:[{'doc':this.$route.params.id}],
	    projectNo:this.$route.params.id
	  }
	},
  components: {
    canvasArea, /* 문서 작업 컴포넌트*/
    chatArea /* 채팅 컴포넌트 */
  },
  methods:{
    addScene(){
      this.canvasList.push({'doc':'1'})
    },
    loadScene(index){
      this.$store.state.pageIndex = index;
      console.log(this.$store.state.pageIndex);
      //this.$axios.get();
    },
  },
  mounted() {
  },
}
</script>
<style lang="scss" scoped>

#canvas:after{
    content:"";
    clear:both;
    display:block;
  }

#smallView{
  width:80px;
  min-height:calc(100vh - 200px);
  padding-bottom:0.5rem;
  float:left;
  margin-right:20px;
  display:none;
  background:#fff;
  overflow:auto;
}

#smallView li{
    width:calc(100% - 1rem);
    margin:0 auto;
    height:60px;
    border:1px solid #e5e5e5;
    border-radius:5px;
    margin-top:0.5rem;
    list-style:none;
    text-align:center;
    line-height:60px;
    font-size:1.4rem;
    color:#7d7d7d;
    cursor:pointer;
  }  

#canvasWrap{
  width:100%;
  overflow:auto;
  float:left;
}

#chatWrap{
  width:580px;
  height:calc(100vh - 200px);
  float:left;
  display:none;
}

@media (min-width:768px){
  #smallView{
    display:block;
  }
  
  #canvasWrap{
    width:calc(100% - 100px);
  }
  
  #chatWrap{
    width:calc(100% - 750px);
    margin-right:20px;
  }
}

@media (min-width:1440px){
  #canvasWrap{
    width:840px;
    margin-right:20px;
  }
  
  #chatWrap{
    width:calc(100% - 980px);
    display:block;
  }
}
</style>
