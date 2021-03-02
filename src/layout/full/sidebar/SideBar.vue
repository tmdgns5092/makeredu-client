<template lang="html">
   <div id="parentx">
    
    <vs-sidebar default-index="1" :parent="parent"  :hiddenBackground="doNotClose" class="left-sidebar" spacer v-model="isSidebarActive" :click-not-close="doNotClose" :reduce="isSidebarReduced">
      
      <div class="header-sidebar text-center" slot="header">
        <vs-avatar size="100px" :src="this.$store.state.userPicture"/> <!-- 페이스북 이미지 -->
        <h4 style="color:#000">{{ this.$store.state.userName }}</h4> <!-- 페이스북 이름 -->
        <div class="header-sidebar-mail" style="color:#7d7d7d">{{ this.$store.state.userEmail }}</div> <!-- 페이스북 이메일 -->
      </div>
      
      <div v-bar class="vs-scrollable">
      <div>
      <template v-for="(sidebarLink, index) in sidebarLinks">

        <!-- Small Cap -->
        <span v-if="sidebarLink.title"  :key="index + '.' + index" class="small-cap">{{ sidebarLink.title }}</span>
        <template v-else-if="!sidebarLink.title">
          <!-- Single Menu -->
          <vs-sidebar-item :key="sidebarLink.index" :icon-pack="sidebarLink.icon" :index="sidebarLink.index" v-if="!sidebarLink.child && sidebarLink.name" :to="sidebarLink.url">
            <span class="hide-in-minisidebar">{{ sidebarLink.name }}</span>
          </vs-sidebar-item>
          <!-- Dropdown Menu --> 
          <template v-else-if="sidebarLink.name" >
            <vs-sidebar-group :title="sidebarLink.name" :key="sidebarLink.index" :icon-pack="sidebarLink.icon" :open="isSubLinkActive(sidebarLink)">
              <li v-for="(subLink) in sidebarLink.child" :key="subLink.index">
                  <vs-sidebar-item :to="subLink.url" :index="subLink.index">
                    <span class="hide-in-minisidebar">{{ subLink.name }}</span>
                  </vs-sidebar-item>
              </li>
          </vs-sidebar-group> 
        </template>
          <!--/Dropdown Menu -->
        </template>
         
      </template> 
      </div>
      </div>
      <div class="footer-sidebar" slot="footer">
        
      <!--<div id="pdfBtn" @click="createPDF" data-value="$route.params.id">-->
      <!--  PDF 문서로 변환-->
      <!--</div>-->
      <!--<div id="pdfBtn" @click="createPDFWithCSS">-->
      <!--  PDF 문서로 변환 With CSS-->
      <!--</div>-->
        <vs-button icon="reply" color="danger" type="flat" @click="logOut"><span class="hide-in-minisidebar">log out</span></vs-button>
      </div>
      
    </vs-sidebar>

  </div>


</template>

<script>

export default {
  name: "SideBar",
  props: {
    parent: {
      type: String
    },
    sidebarLinks: {
      type: Array,
      required: true
    },
    subLink: {
      type: Object
    },
    index: {
      default: null,
      type: [String, Number]
    }
  },
  data: () => ({
    doNotClose: false,
    windowWidth: window.innerWidth,
    round: true
  }),
  computed: {
    //This is for mobile trigger
    isSidebarActive: {
      get() {
        return this.$store.state.isSidebarActive;
      },
      set(val) {
        this.$store.commit("IS_SIDEBAR_ACTIVE", val);
      }
    },
    getActive: function getActive() {
      return this.$destroy();
    },
    //This is for mini sidebar
    reduceSidebar() {
      return Boolean(this.isSidebarReduced);
    },
    isSidebarReduced: {
      get() {
        return this.$store.state.isSidebarReduced;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_SIDEBAR", val);
      }
    },
    //This is for active group link
    isSubLinkActive() {
      return sidebarLink => {
        let open = false;
        if (sidebarLink.child) {
          sidebarLink.child.forEach(link => {
            if (this.$route.fullPath == link.url) {
              open = true;
            }
          });
        }
        
        return open;
      };
    },
    email() {
      this.$store.state.userEmail;
    },
    name() {
      this.$store.state.userName;
    }
  },
  watch: {
    '$route'() {
        if(this.windowWidth < 1170 ) this.$store.commit('IS_SIDEBAR_ACTIVE', false);
    },
  },
  methods: {
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1170) {
        this.$store.commit("IS_SIDEBAR_ACTIVE", false);
        (this.doNotClose = false),
        this.$store.dispatch("updateSidebarWidth", "no-sidebar");
        
      } else {
        this.$store.commit("IS_SIDEBAR_ACTIVE", true);
        this.doNotClose = true;
        
        if (this.isSidebarReduced)
          this.$store.dispatch("updateSidebarWidth", "mini");
        else this.$store.dispatch("updateSidebarWidth", "default");
      }
    },
    logOut() {
      this.$router.push("login");
      //this.$store.state.isConnected = false;
      console.log(this.$store.state.isConnected);
    },
    
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.setSidebarWidth();
  }
};
</script>
<style lang="scss">
  body{background:#f7f8fa}
  .vs-sidebar--header{padding-top:30px;}
  .vs-sidebar{background:#2b303c; color:#818691;}
  .vs-sidebar--group-items li{box-sizing:border-box; padding-left:20px;}
  #pdfBtn{width:calc(100% - 2rem); margin:0 auto; border-radius:5px; margin-bottom:30px; height:3rem; background:rgb(41, 98, 255); color:#fff; text-align:center; line-height:3rem;}  
  .vs-sidebar-group h4 i{right:15px !important}

  .left-sidebar .vs-sidebar-primary a.router-link-exact-active{color:#5345b5 !important}
  .header-sidebar-mail{width:100%; padding:0 20px 25px 20px; font-size:0.75rem; text-overflow:ellipsis; white-space:nowrap; word-wrap:normal; overflow:hidden;}
  .left-sidebar .vs-sidebar.vs-sidebar-parent{background:#fff !important; border-right:1px solid #e5e5e5}
  .left-sidebar .vs-sidebar-group .group-title{color:#7d7d7d; opacity:0.8}
  .left-sidebar .vs-sidebar--item a:hover{color:#5345b5 !important}
  .vb-content{overflow:auto !important}
  .left-sidebar .vb-content{width:100% !important}
</style>

