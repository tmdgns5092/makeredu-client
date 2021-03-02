<template>
  <vs-row vs-justify="center" vs-align="center" class="full-height login-register-bg">
    <vs-col type="flex"  vs-justify="center" vs-align="center" class="login-register-box" vs-lg="12" vs-xs="12">
    <vs-card class="mb-0">
      <div slot="header">
        <h3 class="mb-1">{{msg}}</h3>
        <p class="mb-0">다시 오신 것을 환영합니다.</p>
      </div>
      <vs-alert v-if="errors.length" class="mb-3 mt-2"  color="danger" :active="inputValid">
        <!--<b>다음 오류를 수정해주세요.</b>-->
        <ul class="common-list">
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </vs-alert>
      <form @submit="checkForm" action="/login" novalidate="true">

      <vs-input icon-after="true" size="large" class="w-100 mb-2 mt-2 vs-input-large" icon="mail" placeholder="Email ID" v-model="email" type="email"/>
      <!--<vs-input icon-after="true" size="large" class="w-100 vs-input-large" type="password" icon="lock" placeholder="Password" v-model="pwd"/>-->
      <vs-input icon-after="true" size="large" class="w-100 mb-2 mt-2 vs-input-large" icon="person" placeholder="Name" v-model="name" type="text"/>
      <vs-input icon-after="true" size="large" class="w-100 mb-4 mt-2 vs-input-large" icon="phone" placeholder="Phone" v-model="phone" type="text"/>
      <input class="btn-block btn btn-primary submit-button mt-3" type="submit" @click="resGet" value="계정등록"/>
    </form>
     <div class="d-flex justify-content-center mt-3">
        계정이 있습니까?  &nbsp;<router-link to="/login"> 로그인</router-link>
     </div>
    </vs-card>
    </vs-col>
  </vs-row>   
  
</template>

<script>

export default {
  name: 'login-register-box',
  data:()=>({
    msg: "계정 등록",
    rememberme:false,
    email:'',
    pwd:'',
    name:'',
    phone:'',
    errors:[],
    maxlength: 13
  }),
  methods: {
    checkForm:function(e) {
      this.errors = [];
      if(!this.email) {
        this.errors.push("이메일을 입력해주세요.");
      } else if(!this.validEmail(this.email)) {
        this.errors.push("이메일 형식이 올바르지 않습니다.");        
      }
      // if(!this.pwd) this.errors.push("비밀번호를 입력해주세요.");
      if(!this.name) this.errors.push("이름을 입력해주세요.");
      if(!this.phone) this.errors.push("전화번호를 입력해주세요.");
      if(!this.errors.length) return true;
      e.preventDefault();
    },
    /* eslint-disable */
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },
    
  },
  watch:{
    phone(){
      if(this.phone.length > this.maxlength) {
        return this.phone = this.phone.slice(0, this.maxlength);
      }  
      var strOriginal = this.phone.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
      this.phone = strOriginal;
      }
    },
  computed: {
    inputValid(){
      if(this.validEmail(this.email) && this.pwd && this.firstname && this.lastname){
        return false
      } else {
        return true
      }
    },
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

