<template>
    <vs-row vs-justify="center" vs-align="center" class="full-height login-register-bg">
    <vs-col type="flex"  vs-justify="center" vs-align="center" class="login-register-box" vs-lg="12" vs-xs="12" style="margin-top:-50px;"> <!-- margin 50 삭제 예정 -->
    <div class="logoWrap">
      <img class="logo" src="@/assets/colorLogo.png" alt="" />
    </div>
    
    <!--
    <button @click = "getUser"> 유저 조회~~~~ </button>
    <button @click = "postSignup"> 회원가입 </button>
    <button @click = "getLogin"> 로그인 </button>
    <button @click = "callAPI_padAllList">(etherpad api) listAllPads</button><br>
    <button @click = "privateLogin">(etherpad private api) login</button>
    
    <button @click="setUser(1)">1번사용자</button>
    <button @click="setUser(2)">2번사용자</button>
    <button @click="setUser(3)">3번사용자</button>
    <button @click="setUser(4)">4번선생님</button>
    -->
    <iframe v-if="loginIf" :src="padSrc"></iframe>
    
    <vs-card class="mb-0 login_box">
      <div slot="header">
        <h3 class="mb-1">로그인</h3>
        <p class="mb-0" style="padding-bottom:20px;">계정에 로그인 해주세요.</p>
        <facebook-login id="facebookLoginBtn" class="button"
          appId="391482201883263"
          @login="getUserData"
          @logout="onLogout"
          @sdk-loaded="sdkLoaded">
        </facebook-login>
        <div style="color:#7d7d7d; font-size:13px; margin-top:10px; text-align:center;">서비스 이용을 위해 로그인이 필요합니다.</div>
        <router-link to="/Template" style="text-align:center; margin-top:25px; display:block;">메인으로</router-link>
        <!--<div @click="accountDel">아이디삭제</div>-->
      </div>
    </vs-card>
    <div class="fb-login-button" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
    </vs-col>
  </vs-row>   
  
</template>

<script>
/*https://www.npmjs.com/package/vue-hellojs*/
import facebookLogin from 'facebook-login-vuejs';
import Axios from 'axios'
import qs from 'qs'
export default {
  name: 'Login',
  data() {
    return {
      isConnected: false,
      index: '',
      FB: undefined,
      accessToken: '',
      
      loginIf: false,
      padSrc: null,
    };
  },
  mounted(){
    //this.$store.commit('SET_USER_ID','3');
    //this.$store.state.userEmail = "TEST@TEST.com";
    //console.log(this.$store.state.userId);
  },
  methods:{
    setUser(index){
      /*
      if(index==1){
        this.$store.state.userId = "2";
  	    this.$store.state.userEmail = "choo1982@naver.com";
  	    this.$store.state.salt = "3r2fsdfdgrhtyjtjdvcbvbnvbnbv";
  	    this.$store.state.userType=1;
  	    this.$router.push({ path: '/' });
      }else if(index==2){
        this.$store.state.userId = "4";
  	    this.$store.state.userEmail = "tmdgns5092@gmail.com";
  	    this.$store.state.salt = "12223543tgdfgfjhgkhjljlklkhghfdfds";
  	    this.$store.state.userType=1;
  	    this.$router.push({ path: '/' });
      }else if(index==3){
        this.$store.state.userId = "5";
  	    this.$store.state.userEmail = "byhj0309@gmail.com";
  	    this.$store.state.userType=1;
  	    this.$store.state.salt = "fsdgdfhtio789776uhgjhkkfgdggfmnhjm";
  	    this.$router.push({ path: '/' });
      }else{
        this.$store.state.userId = "3";
  	    this.$store.state.userEmail = "TEST@TEST.com";
  	    this.$store.state.salt = "GK1ADGDYeMuLbVfCfSz9gH85DTj3b/f/SAC//D33U8EfIBjexTBG2OGIDRzSofAL5uiLSSym28Fr6kI5EoiSTw==";
  	    this.$store.state.userType=0;
  	    this.$router.push({ path: '/Template' })
      }
      */
    },
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    signUpPost(){ // 가입
      let path = "https://api.makereducation.net/user/social";
      let param = {params: {
        name:     this.$store.state.userName,
        email:    this.$store.state.userEmail,
        userID: this.$store.state.socialId,
        phone: ""
      }};
      this.$axios.post(path, {name:this.$store.state.userName,email:this.$store.state.userEmail,userID:this.$store.state.socialId})
      .then(res => {
        if(res.data.code == 200) {
          //console.log('가입성공');
          this.$store.state.userId = res.data.data.id;
          this.$store.state.salt = res.data.data.salt;
          this.$router.push("Template");
        }   // 회원가입 성공
        else {}                       // 회원가입 실패 (901: request 에러, 902: Already User 에러)
      })
      .catch(error => {
        console.log("axios catch \nerror : ${error}");
        console.log(error);
      });
    },
    userGet(){ // 조회
      let path = "https://api.makereducation.net/user/";
      let param = {params: { 
          email:  this.$store.state.userEmail,
        }};
      this.$axios.get(path, param)
      .then(res => {
        if(!res.data.data){
          //회원가입으로 처리
          this.signUpPost();
        }else{
          //alert('아이디확인됨='+res.data.data.id);
          this.$store.state.userId = res.data.data.id;
          //alert('salt='+res.data.data.salt);
          this.$store.state.salt = res.data.data.salt;
          this.$router.push('Template');
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    accountDel(){ // 회원 탈퇴 
      let path = "/user";
      let param = {params: { id: this.index }};
      let header = {headers: { "x-access-token": this.$store.state.accessToken }};
        
      this.$axios.delete(path, param, header)
        .then(res => {
          console.log("success");
          console.log(res);
        })
        .catch(error => {
          console.log("fail");
          console.log(error);
        });
    },
    getUserData() {
      console.log('check');
       this.FB.api("/me", "GET", { fields: "id,name,email,picture" },
          user => {
            console.log(user);
             // vuex에 저장
            if(user){
              this.$store.state.userEmail = user.email;
              this.$store.state.userName = user.name;
              this.$store.state.userPicture = user.picture;
              this.$store.state.socialId = user.id;
              this.$store.state.userPicture = user.picture.data.url;
              // 회원 조회
              this.userGet();
            }
          }
        );   
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      //if (this.isConnected) this.getUserData();
      this.accessToken = payload.FB.getAccessToken()
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
      console.log("login");
    },
    onLogout() {
      this.isConnected = this.$store.state.isConnected;
      console.log("logout");
    }
  },
  components: {
     facebookLogin
  }
};

</script>
<style lang="scss" scoped>
  .login-register-bg{
    margin:0 auto;
    background:url(../../assets/images/background/auth-bg.jpg) no-repeat center center;
  }
  .login-register-box{
    max-width:400px;
  }
  
  .logoWrap{
    text-align:center;
    padding-bottom:2rem;
    padding-top:1rem;
    .logo{
      max-width:60%;
    }
  }
  
  .login-register-bg{
    background:none;
  }
</style>
