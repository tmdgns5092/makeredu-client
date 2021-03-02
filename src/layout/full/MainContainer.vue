<template>
	<div class="main-wrapper" :class="[mainWrapperClass]">
		<!---Navigation-->
		<Navbar :topbarColor="topbarColor" :logo="require('@/assets/images/logo/logo-light-icon.png')" :title="logotitle" />
		<!---Sidebar-->
		<SideBar parent=".main-wrapper" :sidebarLinks="sidebarLinks"/>
		<!---Page Container-->
		<div class="main-container-fluid">
		<Breadcrumb/>	
		<transition name="router-anim" enter-active-class="fade-enter-active fade-enter" leave-active-class="fade-leave-active fade-enter">
			
		<router-view :key="$route.fullPath"></router-view>
		</transition>
		<!---Customizer / Settings-->
		<!--<Customizer @updateTopbarColor="updateTopbarColor" /> 우측 설정 버튼-->

		</div>	
	</div>
</template>

<script>
 
import Navbar from '@/layout/full/header/Navbar.vue';
import SideBar from '@/layout/full/sidebar/SideBar.vue';
//import Customizer from '@/layout/full/customizer/Customizer.vue';
import sidebarLinks from '@/layout/full/sidebar/sidebarlinks.js';
import Breadcrumb from '@/layout/full/breadcrumb/Breadcrumb.vue';
import themeConfig from '@/../themeConfig.js';

export default {
name: "MainContainer",
components: {
Navbar,
SideBar,
//Customizer,
Breadcrumb
},
data:() => ({
	topbarColor: themeConfig.topbarColor,
	logotitle: themeConfig.logotitle,
	sidebarLinks: sidebarLinks,
}),
mounted(){
 /*
 if(this.$store.state.userType!=0){
    this.sidebarLinks[0].name=null;   
 }
 */
 this.load_projectList();
 this.$root.$on('loadSide', () => {
     this.load_projectList();
    }
 );
},
methods: {
  load_projectList(){
    this.$store.state.project.length = 0
    let project = {};
  	this.$axios.post("https://api.makereducation.net/project/list",{userId:this.$store.state.userId}).then(
     (result)=>{
         
       this.sidebarLinks[1].child = [];
    //   console.log(result.data);
       for(var i=0;i<result.data.data.length;i++){
       	var _data = result.data.data[i];
    	this.sidebarLinks[1].child.push({url: "/ProgressProject/"+_data.document_id,name: _data.project_title,icon: "mdi mdi-account-circle"});
    	this.$store.state.projectName[_data.document_id] = _data.project_title;
        this.$store.state.project.push({
            name:_data.project_title,
            url:"/ProgressProject/"+_data.document_id,
            admin_name:_data.admin_name}); 	
       }
       
       
       if(result.data.data.length>0){
           var _data = result.data.data[0];
           this.$router.push("/status");
           //this.$router.push("/ProgressProject/"+_data.document_id);
       }
       
     }  
    ).catch((error)=>{
      console.log(error);
    });
  },
  updateTopbarColor(val) {
     this.topbarColor = val;
  }
},
computed: {
sidebarWidth: function() {
      return this.$store.state.sidebarWidth;
},
mainWrapperClass: function() {
      if(this.sidebarWidth == "default") {
        return "main-wrapper-default"
      } 
      else if(this.sidebarWidth == "mini") {return "main-wrapper-mini"}
      else if(this.sidebarWidth){ return "main-wrapper-full"}
      return "default"	
  },

},

}  	
</script>