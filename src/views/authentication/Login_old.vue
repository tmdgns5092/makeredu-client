<template>
  <vs-row vs-justify="center" vs-align="center" class="full-height login-register-bg">
    <vs-col type="flex"  vs-justify="center" vs-align="center" class="login-register-box" vs-lg="12" vs-xs="12">
    <vs-card class=" mb-0">
      <div slot="header">
        <h3 class="mb-1">{{msg}}</h3>
        <p class="mb-0">다시 오신 것을 환영합니다. 계정에 로그인하십시오.</p>
      </div>
      <vs-alert v-if="errors.length" class="mb-3 mt-2"  color="danger" :active="inputValid">
        <!--<b>다음 오류를 수정해주세요.</b>-->
        <ul class="common-list">
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </vs-alert>
      <form @submit="checkForm" novalidate="true">

      <vs-input icon-after="true" size="large" class="w-100 mb-4 mt-2 vs-input-large" icon="person" placeholder="Email ID" v-model="email" type="email"/>
      <vs-input icon-after="true" size="large" class="w-100 vs-input-large" type="password" icon="lock" placeholder="Password" v-model="pwd"/>
      <div class="d-flex pt-3 pb-3">
          <!--<vs-checkbox v-model="rememberme">Remember me?</vs-checkbox>-->
          <router-link to="forgotpassword" class="ml-auto">비밀번호를 잊으셨나요? </router-link> 
      </div>
      <input class="btn-block btn btn-primary submit-button" type="submit" @click.stop.prevent="checkForm" value="로그인"/>
    </form>

     <div class="d-flex justify-content-center mt-3">
        계정이 없으신가요?  &nbsp; <router-link to="/register"> 계정 만들기</router-link>
     </div>
     <hr class="custom-hr"/>
     <div class="mt-2 text-center"><b>Email ID:</b> admins@admin.com, <b>pwd:</b> admin</div>
    </vs-card>
    </vs-col>
  </vs-row>   
  
</template>

<script>
export default {
  name: 'Login',
  data:()=>({
    msg: "로그인",
    rememberme:false,
    email:'',
    pwd:'',
    errors:[],
  }),
  methods:{
    checkForm:function(e) {
      this.errors = [];
      if(!this.email) {
        this.errors.push("이메일을 입력해주세요.");
      } else if(!this.validEmail(this.email)) {
        this.errors.push("이메일 형식이 올바르지 않습니다.");        
      } else {
        this.$router.push('/starterkit');
      }
      if(!this.pwd) this.errors.push("비밀번호를 입력해주세요.");
      if(!this.errors.length) return true;
      e.preventDefault();
      
    },
    /* eslint-disable */
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    return re.test(email);
    },
    /* eslint-enable */
    submit(){
      if(this.validEmail(this.email)){
        this.$router.push('/search')
      }
    }
  },  
  computed: {
    inputValid(){
      if(this.validEmail(this.email) && this.pwd){
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style>
.login-register-bg{
  margin:0 auto;
  background:url(../../assets/images/background/auth-bg.jpg) no-repeat center center;
}
.login-register-box{
  max-width:400px;
}

</style>

