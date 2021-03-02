<template>
  <div id="ProgressProject">
  	<invite :editorShow="editorShow" />
  	<!-- 
    <div id="common_container" v-if="!editorShow">
    	  <div id="tbtnsWrap2">
    	  	<div class="tbtnsBtn2" @click="viewProject">프로젝트 보기</div>
    	  	<a class="tbtnsBtn2" v-if="$store.state.userType==0">프로젝트 완료</a>
    	  </div>
    	  
    	  <div v-if="$store.state.userType==0">
    	  	<h2 class="subTitle">공동 작업자 관리</h2>
    	  	<div class="stateWrap">
    	  		<ul id="stateLeft">
    	  			<li v-if="users.length==0">참여자가 없습니다.</li>
    	  			<li v-for="(item,index) in users" :key="item.index">
    	  				<div class="stateLeft_text">{{item.name}}</div>
    	  				<div class="stateLeft_del" @click="projectUserDel(index)" style="border:1px solid #e5e5e5; border-left:none;"><vs-icon icon="remove" style="color:#5345b5; margin-top:-5px;"></vs-icon></div>
    	  			</li>
    	  		</ul>
  	  			<ul id="stateRight">
  	  				<li v-for="(item, index) in items" :key="item.index" v-if="item.id!=$store.state.userId">
  	  					<input class="stateRight_text" type="text" readOnly :value="item.name" />
  	  					<div class="stateRight_add" @click="addUser(index)" style="border:1px solid #e5e5e5; border-left:none"><vs-icon icon="add" style="color:#5345b5; margin-top:-5px;"></vs-icon></div>
  	  				</li>
  	  			</ul>
    	  	</div>
    	  </div>
    </div>
    -->
    <!--<div class="tbtns editorClose" @click="$router.push('/status/')" v-if="editorShow">종료{{$route.params.id}}</div>-->
    <div class="tbtns editorClose" @click="$router.push('/status/')" v-if="editorShow">종료</div>
    <a class="screenShare" href="https://screen.makereducation.net/demos/screen-sharing.html" v-if="editorShow" target="_black">화면 공유</a>
    <div style="position:"></div>
    <form :action="'https://socket.makereducation.net/p/'+$route.params.id"
          target="editor"
          method="post"
          ref="form">
        <input type="hidden"
               name="salt"
               v-model="$store.state.salt">
    </form>
    <!--<iframe name="editor" v-if="editorShow" ref="iframe" class="innerEditor"></iframe>-->
    <!--<iframe name="editor" v-if="editorShow" ref="https://socket.makereducation.net/p/'+$route.params.id" allow="camera 'src';" class="innerEditor"></iframe>-->
    <iframe name="editor" v-if="editorShow" ref="https://socket.makereducation.net/p/'+$route.params.id" allow="camera *;microphone *" class="innerEditor"></iframe>
  </div>
</template>

<script>
import qs from 'qs';
import Invite from '@/components/Invite.vue';

export default {
	name : 'ProgressProject',
	data() {
	  return {
	    items: [],
	    users:[],
	    editorShow:false
	  }
	},
	mounted(){
	  //console.log(this.$store.state.projectName[this.$route.params.id]); 프로젝트 네임
	  if(this.$store.state.salt==''){
	  	alert('다시 로그인 해주세요');
	  	this.$router.push("/login");
	  }
	  this.editorShow = false;
	  this.loadUsers();
	  this.loadProjectUsers();
	},
	methods:{
	 loadUsers:function(){
		this.$axios.get("https://api.makereducation.net/user/list").then(
		  (result)=>{
		  	console.log(`loadUsers : ${result}`);
		  		this.items = result.data.data.rows;
		  		this.editorShow = false;
		  		this.viewProject();	
		  }	
		)
	 },
	 loadProjectUsers:function(){
	 	 this.$axios.post("https://socket.makereducation.net/projectUsers",qs.stringify({padId:this.$route.params.id})).then(
	 	 		(result)=>{
	 	 			console.log(`loadProjectUsers : ${result}`);
	 	 			this.users = result.data.padsUser;
	 	 		}
	 	 	)
	 },
	 addUser:function(index){
	 		  let form = new FormData() ;
      	form.append('padID',this.$route.params.id);
      	form.append('userID',this.items[index].id);
      	form.append('role','user');
      	var _axios = this.$axios;
      	_axios.post('https://socket.makereducation.net/api/1.2.9/projectUserAdd?apikey=9025e8e93f12def59bc5d29543be8bf685608a59e2be5a33fcb9b4d140b86411',form).then(
      		(result)=>{
      			_axios.post("https://api.makereducation.net/project/create",{userid:this.items[index].id,title:this.$store.state.projectName[this.$route.params.id],docname:this.$route.params.id}).then(
        	     (result)=>{
        	        //this.$root.$emit('loadSide') //사이드 프로젝트 부르기
        	     }  
        	    ).catch((error)=>{
        	      console.log(error);
        	    });
      			this.loadProjectUsers();
      		}	
    		)
	 },
	 projectUserDel:function(index){
	 	 if(confirm('해당 작업자를 제외 하시겠습니까?')){
	 		  let form = new FormData() ;
      	form.append('padID',this.users[index].padid);
      	form.append('userID',this.users[index].userid);
      	form.append('role','user');
      	this.$axios.post('https://socket.makereducation.net/api/1.2.9/projectUserDel?apikey=9025e8e93f12def59bc5d29543be8bf685608a59e2be5a33fcb9b4d140b86411',form).then(
      		(result)=>{
      			this.loadProjectUsers();
      		}	
    		)
	 	 }
	 },
	 viewProject:function(){
	 	this.editorShow = true;
	 	 const constraints = { audio: true, video: true };
      window.navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
          console.log('got stream');
      })
      .catch(function(err) {
          console.log('couldn\'t get the stream');
      });
	 	setTimeout(function(){
          this.$refs.form.submit();
        }.bind(this),500);
	 	
	 }
	},
  components: {
    Invite
  }
}
</script>
<style>
	.innerEditor{
	  width: 100%;
	  height: calc(100vh - 100px);
	  border:1px solid #e5e5e5 ;
	}
	.main-container-fluid{
		padding-top:50px;
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
</style>
