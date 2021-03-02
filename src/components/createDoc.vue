<template>
    <div id="createDoc">
        <div class="createDoc_info">
            <h1>템플릿 생성</h1>
            <p class="infoTitle">템플릿 이름</p>
            <input type="text" placeholder="템플릿 이름 입력" v-model="titleName"/>
            <button id="createDoc_btn" @click="newTemplate">템플릿 생성하기</button>
            <div class="createDoc_close" @click="close">x</div>
        </div>
        <div class="createDoc_dim"></div>
    </div>
</template>
<script>
    export default{
        name: "createDoc",
        data () {
            return {
               titleName:""
            }
        },
        mounted(){
          
    	    console.log(this.$store.state.userId);
        },
        methods:{
          close:function(){
            this.$parent.createView=false;  
          },
    	  newTemplate:function(){
    	    this.$parent.createView=false;  
    	    const tempName = "temp"+new Date().getTime();
    	    /*디비 저장*/
    	    var _axios = this.$axios;
    	    let form = new FormData() ;
        	form.append('padID',tempName);
        	form.append('userID',this.$store.state.userId);
        	
        	var _form = this.$parent.$refs.form;
        	
    	    _axios.post("https://socket.makereducation.net/api/1/createPad?apikey=9025e8e93f12def59bc5d29543be8bf685608a59e2be5a33fcb9b4d140b86411",form).then(
    	       (result)=>{
        	      _axios.post("https://api.makereducation.net/template/create",{userid:this.$store.state.userId,title:this.titleName,docname:tempName}).then(
            	    (result)=>{
            	      
            	      this.$parent.load_data();
            	      
            	      this.$parent.editorShow = true;
            	      setTimeout(function(){
            	      _form.action = "https://socket.makereducation.net/p/"+tempName;
                      _form.submit();
            	      }.bind(this));
                      
            	    }  
            	  ).catch((error)=>{
            	    console.log(error);
            	  });
    	          
    	          //관리자가 패드 열때 post 데이터 던져서 열경우 열리게 처리함
    	          //window.open("https://socket.makereducation.net/p/"+tempName+"/"+this.$store.state.salt,"_blank");
    	       }).catch((error)=>{console.log(error);});
    	     
    	  },
        }
    }
</script>
<style lang="scss" scoped>
    
    #createDoc{
        width:100%;
        height:100vh;
        position:fixed;
        left:0;
        top:0;
        z-index:99999;
    }
    
    .createDoc_close{
        position:absolute;
        right:20px;
        top:10px;
        font-size:1.4rem;
    }
    
    .createDoc_dim{
        width:100%;
        height:100vh;
        background:rgba(0,0,0,0.5);
        position:fixed;
        left:0;
        top:0;
        z-index:99997;
    }
    
    .createDoc_info{
        width:280px;
        box-sizing:border-box;
        padding:20px;
        background:#fff;
        margin:0 auto;
        border-radius:10px;
        position:absolute;
        top:50%;
        margin-top:-117px;
        left:50%;
        margin-left:-140px;
        z-index:99998;
        
        & h1{
            font-size:1.1rem;
            color:#000;
            margin-bottom:20px;
            padding-bottom:20px;
            border-bottom:1px solid #e5e5e5;
        }
        
        & input[type="text"]{
            width:100%;
            height:40px;
            border:1px solid #e5e5e5;
            border-radius:5px;
            padding-left:10px;
            font-size:0.8rem;
            margin-bottom:20px;
        }
        
        & input[type="text"]::placeholder{
            color:#7d7d7d;
        }
    }
    
    #createDoc_btn{
        width:100%;
        height:45px;
        background:#5345b5;
        border:none;
        color:#fff;
        border-radius:5px;
        font-weight:bold;
    }
    
    .infoTitle{
        margin-bottom:5px;
        font-size:0.8rem;
        font-weight:bold;
    }
    
    @media (min-width:360px) {
        .createDoc_info{
            width:320px;
            margin-left:-160px;
        }
    }
    
    @media (min-width:414px) {
        .createDoc_info{
            width:374px;
            margin-left:-187px;
        }
    }
    
    @media (min-width:768px) {
        
    }
    
    @media (min-width:1200px) {
        .createDoc_info{
            width:400px;
            margin-left:-200px;
        }
    }
</style>
