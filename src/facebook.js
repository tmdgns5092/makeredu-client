export init(){
    window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '200147388048943',
      cookie     : true,
      xfbml      : true,
      version    : 'v7.0'
    });
      
    FB.AppEvents.logPageView();   
      
    };
    
    (function(d, s, id){
     var js, 
     fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {
         return;
         
     }
     js = d.createElement(s); 
     js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export Login() {
    window.FB.getLoginStatus(res => {
       // 처음 로그인
       window.FB.login(
           response => {
               if (response.status === 'connected') {
                   const accessToken = response.authResponse.accessToken;
                   window.FB.api('/me', {fields: 'id, name, email, picture' }, res => {
                       if (!res) LoginFailure();
                       const req_body = {
                           facebookAccessToken : accessToken,
                           id: res.id,
                           email: res.email,
                           name: res.name,
                           profileIMG: res.picture,
                           //login from facebook
                           source: 'f',
                       };
                       social_login(req_boy);
                   });
                   
               } else {
                   LoginFailure();
               }
           },
           { scope: 'public_profile, email'},
           );
    });
}

export Logout() {
    window.FB.getLoginStatus(response => {
        window.FB.logout(async res => {
            if (!res) return LogoutFailure();
            socual_logout();
        });
    });
}

