import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";
import themeConfig from '@/../themeConfig.js'
import mails from '@/views/apps/email/emails'
import createPersistedState from 'vuex-persistedstate';
//참고해야함 

Vue.use(Vuex)
/* eslint-disable */
export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    theme: themeConfig.theme,
    pageIndex:0,
  	isSidebarActive: false,
  	isSidebarReduced: themeConfig.sidebarCollapsed,
  	sidebarWidth: "default",
    themeColor: themeConfig.themeColor,

    // Calendar Events
    calendarEvents: [{
      title: "test",
      allDay: true,
      start: moment(),
      end: moment().add(1, "d")
    }],

    // Email States
    emails: mails,
    filtered_mail: "Inbox",
    
    // custom
    canvasStatus: false,
    tet: 1,
    
    // login
    userId: "",
    userEmail: "",
    userName: "",
    userType:"",
    userPicture: "",
    socialId:"",
    salt:"",
    accessToken: "",
    isConnected: "",
    projectName:[],
    project:[],
    thisProject: "",
    thisprojectTitle: "",
    
    // 새로운 문서 만들기
    createDocShow: false
  },
  mutations: {
  	//This is for Sidbar trigger in mobile
  	IS_SIDEBAR_ACTIVE(state, value) {
        state.isSidebarActive = value;
    },
    //This is for Sidebar toggle in desktop
    TOGGLE_REDUCE_SIDEBAR(state, val) {
        state.isSidebarReduced = val;
    },
    //This is for Themeset
    SET_THEME(state, val) {
        state.theme = val;
    },
    //This is for Theme color
    SET_THEME_COLOR(state, val) {
        state.themeColor = val;
    },
    SET_SIDEBAR_WIDTH(state, width) {
        state.sidebarWidth = width;
    },
    SET_USER_ID(state,value){
      state.userId = value;
    },
    // Add Calendar event
    ADD_CALENDAR_EVENT(state, event) {
      const newEvent = Object.assign({}, event);
      state.calendarEvents.push(newEvent);
    },
    
     

    // Filter emails
    FILTERED_MAIL(state, filterCategory) {
      state.filtered_mail = filterCategory
    },
  },  
  actions: {
  	updateSidebarWidth({ commit }, width) {
        commit('SET_SIDEBAR_WIDTH', width);
    },
    //Calendar Action 
    addCalendarEvent({ commit }, event) {
        commit('ADD_CALENDAR_EVENT', event);
    },
    
    // Email Action
    filteredMail({ commit }, filterCategory){
        commit('FILTERED_MAIL', filterCategory)
    },
    
  },
  getters:{
    // Get Filtered Email
    getPageIndex(state){
      return state.pageIndex;
    },
    getFilteredMails: state => state.emails.filter((email) => {
      if (state.filtered_mail == 'Inbox') return email.mail_type == "inbox";
      if (state.filtered_mail == 'Spam') return email.mail_type == "spam"; 
      if (state.filtered_mail == 'Draft') return email.mail_type == "draft";
      if (state.filtered_mail == 'Sent') return email.mail_type == "sent";
    }),
    getCurrentMail: state => (emailId) => state.emails.filter((email) => email.id == emailId)[0],
    getInboxCount: state => state.emails.filter((email) => email.mail_type == 'inbox').length,
  }
})