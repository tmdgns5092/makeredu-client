<template>
  <header class="gridx">
  <vs-navbar v-model="indexActive" :color="topbarColor" class="topnavbar" text-color="rgba(255,255,255,0.7)" active-text-color="rgba(255,255,255,1)" 
  style="box-shadow:none; border-bottom:1px solid #e5e5e5">
    <div slot="title" class="themelogo">
      <router-link to="/status"><img src="@/assets/colorLogo2.png" v-if="logo" alt="Dashboard" style="width:100px" /></router-link>
    </div>
    <div slot="title">
      <div class="hiddenDesktop cursor-pointer" @click.stop="activeSidebar">
        <vs-icon icon="menu"></vs-icon>
      </div>
    </div>
    <vs-spacer></vs-spacer>
  </vs-navbar>
  </header>
</template>

<script>
import RecentMessages from "../../../views/widgets/other-widgets/recent-messages/RecentMessages";
import friends from "@/components/friends";

export default {
  name: "Navbar",
  props: {
    topbarColor: {
      type: String,
      default: "#fff"
    },
    title: {
      type: String
    },
    logo: {
      type: String
    },
    // Obj for Userdropdown
    user: Object
  },
  data: () => ({
    indexActive: 0,
    showToggle: false,
    searchvalue: "",
    // Data For User Dropdown
    users: [
      {
        img: "/3.jpg",
        name: "Steave Jobs",
        email: "varun@gmail.com",
        dditem1: "My Profile",
        dditem2: "My Balance",
        dditem3: "Inbox",
        dditem4: "Account Setting"
      }
    ]
  }),

  methods: {
    //This is for sidebar trigger in mobile
    activeSidebar() {
      this.$store.commit("IS_SIDEBAR_ACTIVE", true);
    },
    //This is for sidebar trigger in Desktop
    reduceSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", true);
      this.$store.dispatch("updateSidebarWidth", "mini");
      this.showToggle = true;
    },
    fullSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", false);
      this.$store.dispatch("updateSidebarWidth", "default");
      this.showToggle = false;
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    }
  },
  computed: {
    getCurrentLanguage() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { lang: "English" };
      else if (locale == "fr") return { lang: "French" };
      else if (locale == "ch") return { lang: "Chinese" };
      else if (locale == "gr") return { lang: "German" };
      return this.locale;
    }
  },
  components: {
    RecentMessages,
    // RecentNotification
    friends
  }
};
</script>
<style lang="scss" scoped>
  #inviteBtn{
    display:inline-block;
    background:#007bff;
    color:#fff;
    margin-top:10px;
    min-width:200px;
    height:35px;
    border-radius:5px;
    font-size:0.9rem;
    font-weight:400;
    border:none;
  }
  
  .topnavbar{
    background:#fff !important; color:#2d2d2d !important;
  }
</style>
