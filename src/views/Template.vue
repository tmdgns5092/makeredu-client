<template>
  <div id="template">
  	<invite />
    <div v-if="!editorShow">
      <div id="tbtnsWrap">
        <div id="projectAdd" class="tbtnsBtn" @click="createProject">프로젝트 생성</div>
        <div id="templateMod" class="tbtnsBtn" @click="modifyTemplate">템플릿 수정</div>
        <div id="templateDel" class="tbtnsBtn" @click="deleteTemplate">템플릿 삭제</div>
      </div>
      
  	  <h2 class="subTitle">템플릿 생성</h2>
      
      <div id="leftTemplate" style="margin-top:15px;">
        <!-- 새로 만들기 버튼 -->
          <div @click="createView=true" id="NewProject" class="templateItem">
            <!--<img src="@/assets/images/background/newProject.png" alt="" />-->
            <p class="templateTitle">
              <vs-icon icon="add" class="templateIcon"></vs-icon>
              <span>템플릿 만들기</span>
            </p>
          </div>
          
          <!-- 템플릿 리스트 -->
          <div v-for="(item, index) in items" :key="item.index" class="templateItem" :class="(select==index)?'active':''" @click="selectTemplate(index)"> <!-- 경로 변경 필요 -->
            <!--<img src="@/assets/images/background/test.jpg" alt="" />-->
            <p class="templateTitle">{{ item.title }}</p>
            <p class="templateSubtitle">{{ (item.type=='private')?item.users[0].name:'' }} {{ item.type | check}}</p>
          </div>
          
          <createDoc v-if="createView" :editorShow="editorShow"/>
          <createProject v-if="createProjectView"></createProject>
      </div>
   </div>
    <div class="tbtns editorClose" @click="editorShow=false" v-if="editorShow">종료</div>
    <a class="screenShare" href="https://screen.makereducation.net/demos/screen-sharing.html" v-if="editorShow" target="_black">화면 공유</a>
    <form action=""
          target="editor"
          method="post"
          ref="form">
        <input type="hidden"
               name="salt"
               v-model="mySalt">
    </form>
    <iframe name="editor" v-if="editorShow" ref="iframe" class="innerEditor"></iframe>
  </div>
</template>

<script>
import chatArea from '@/components/chatArea.vue'; /* 채팅 컴포넌트 불러오기 */
import createDoc from '@/components/createDoc.vue'; /* 새로만들기 정보 입력 팝업 */
import createProject from '@/components/createProject.vue'; /* 새로만들기 프로젝트 정보 입력 팝업 */
import qs from 'qs';
import Invite from '@/components/Invite.vue';

export default {
	name : 'Template',
	data() {
	  return {
	    items: [],
	    select:null,
	    mySalt:this.$store.state.salt,
	    createView:false,
	    docname:"",
	    createProjectView:false,
	    editorShow:false
	  }
	},
	mounted(){
	  /*
	  this.$axios.post("https://socket.makereducation.net/api/1.2.1/listAllPads?apikey=9025e8e93f12def59bc5d29543be8bf685608a59e2be5a33fcb9b4d140b86411").then(
	     (result)=>{
	       console.log(result);
	     }  
	    ).catch((error)=>{
	      console.log(error);
	    });
	  */
	  
	  if(this.$store.state.salt==""){
	    alert('암호키가 없습니다.');
	    this.$router.push("/login");
	  };
	  this.load_data();
	},
	filters:{
	  check:function(val){
	    if(val=='public'){
	      return "기본템플릿";
	    }
	  }
	},
	methods:{
	  modifyTemplate:function(){
	    if(this.select!=null){
	      
	      //window.open("https://socket.makereducation.net/p/"+this.items[this.select].tempdoc,"_blank");
	      /*
	      this.$axios.post("https://socket.makereducation.net/p/"+this.items[this.select].tempdoc,
	      qs.stringify({salt:"GK1ADGDYeMuLbVfCfSz9gH85DTj3b/f/SAC//D33U8EfIBjexTBG2OGIDRzSofAL5uiLSSym28Fr6kI5EoiSTw=="}),
	      {headers:{
	        "Content-Type": "application/x-www-form-urlencoded"
        }}).then(
	        (result)=>{
	          console.log(result);
	        }  
        )
        */
        this.editorShow = true;
        setTimeout(function(){
          this.$refs.form.action = "https://socket.makereducation.net/p/"+this.items[this.select].tempdoc;
          // this.$refs.form.action = "http://localhost:3003/p/"+this.items[this.select].tempdoc;
          this.$refs.form.submit();
        }.bind(this));
       
	    }else{
	      /* toast 출력 */
	    }
	  },
	  createProject:function(){
	    this.createProjectView = true;
	    this.createView = false;
	  },
	  deleteTemplate:function(){
	  
        if(this.select!=null && confirm('삭제하시겠습니까?')){
            let form = new FormData() ;
          	form.append('padID',this.items[this.select].tempdoc);
            this.$axios.post("https://socket.makereducation.net/api/1/deletePad?apikey=9025e8e93f12def59bc5d29543be8bf685608a59e2be5a33fcb9b4d140b86411",form).then(
            // this.$axios.post("http://localhost:3003/api/1/deletePad?apikey=9025e8e93f12def59bc5d29543be8bf685608a59e2be5a33fcb9b4d140b86411",form).then(
             (result)=>{
               this.load_data();
                 console.log(result);
             }   
            );
        }
	     
    },
	  selectTemplate:function(index){
	    if(this.select==index){
	      this.select = null;
	    }else{
	      this.select=index;
	    }
	  },
	  load_data:function(){
	    this.$axios.post("https://api.makereducation.net/template/list",{userId:this.$store.state.userId}).then(
	     (result)=>{
	       console.log(result.data.data);
	       this.items = result.data.data;
	     }  
	    ).catch((error)=>{
	      console.log(error);
	    });
	  }
	},
  components: {
    chatArea,
    createDoc,
    createProject,
    Invite
  }
}
</script>
<style lang="scss">

	.innerEditor{
	  width: 100%;
	  height: calc(100vh - 150px);
	  border:1px solid #e5e5e5 ;
	}
.subTitle{font-size:1.2rem; margin-top:25px;}
.tbtnsBtn{font-size:0.8rem; color:#fff; cursor:pointer; margin:0; font-weight:600 !important;}
#tbtnsWrap{width:100%; height:55px; background:#fff ; border-top:1px solid #e5e5e5; position:fixed; left:0; bottom:0; overflow:hidden;}
#tbtnsWrap>div{width:33.3%; height:55px; float:left; box-sizing:border-box; text-align:center; line-height:55px;}
#tbtnsWrap>div:hover{background:#fff; border:1px solid #5345b5; color:#5345b5 !important}
.active{ background:#fff !important; color:#5345b5 !important; border:1px solid #5345b5 !important}
.active .templateTitle, .active .templateSubtitle{color:#5345b5 !important;} 


@media (min-width:768px){
  #tbtnsWrap{width:400px !important; left:inherit; right:30px; bottom:30px; background:none;}
  #tbtnsWrap>div{width:calc(33.3% - 6.6px); height:54px; margin-left:10px; background:#5345b5; border-radius:3px; transition:0.3s all;}
  #tbtnsWrap>div:first-child{margin-left:0;}
}
#NewProject{
  cursor: pointer;
  background:#5345b5 !important;
  color:#fff !important;
  height:95.5px;
  line-height:95.5px;
  padding:0;
  text-align:center;
}

#template{
  width:100%;
  box-sizing:border-box;
}

#template::after{
  content:"";
  clear:both;
  display:block;
}

#leftTemplate{
  width:100%;
  padding-bottom:30px;
  margin-right:20px;
  float:left;
}

.templateItem{
  width:80%;
  float:left;
  margin-right:1.2rem;
  border-radius:5px;
  overflow:hidden;
  background:#fff;
  padding:1rem;
  margin-bottom:1.2rem;
  transition:0.3s all;
  border:1px solid #e5e5e5;
  /*box-shadow:5px 5px 7px #e5e5e5;*/
  cursor:pointer;
  transition:all 0.2s;
  box-shadow:3px 3px 7px #e5e5e5;
}

.templateItem:hover{
  border:1px solid #5345b5 !important;
  color:#5345b5 !important;
}



.templateItem img{
  width:100%;
  border-radius:5px;
}

.templateTitle{
  font-size:1rem;
  font-weight:700;
  margin-top:0.5rem;
  margin-bottom:0.25rem;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  overflow:hidden;
}

.templateSubtitle{
  font-size:0.8rem;
  text-align:right;
  color:#7d7d7d;
  margin-bottom:0;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  overflow:hidden;
}
.screenShare{
	padding:8px 20px;
	display:inline-block;
	font-size:0.8rem;
	color:#fff;
	background:#816dff;
	font-weight:600;
	margin-top:5px;
	margin-bottom:10px;
	border-radius:5px;
	text-align:center;
}
.screenShare:hover{
	color:#fff !important;
}

@media (min-width:768px){
  .templateItem{
    width:calc(50% - 0.9rem);
  }
  
  .templateItem:nth-child(2n){
    margin-right:0;
  }
}

@media (min-width:1200px){
  
  .templateItem{
    width:calc(16.6% - 0.9rem);
  }
  
  .templateItem:nth-child(2n){
    margin-right:0.9rem;
  }
  
  .templateItem:nth-child(6n){
    margin-right:0;
  }
  
  .templateTitle{
    margin-bottom:0.65rem !important;
  }
}


</style>
