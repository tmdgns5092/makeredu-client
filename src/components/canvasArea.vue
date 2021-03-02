<template>
    <div class="editor" id="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/bold.svg" alt="">
            <!--<icon nmae="bold" />-->
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/italic.svg" alt="">
            <!--<icon name="italic" />-->
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/strike.svg" alt="">
            <!--<icon name="strike" />-->
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/underline.svg" alt="">
            <!--<icon name="underline" />-->
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/code.svg" alt="">
            <!--<icon name="code" />-->
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/paragraph.svg" alt="">
            <!--<icon name="paragraph" />-->
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>
          
          <button
						class="menubar__button"
						@click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
					>
						<img class="icon" src="@/assets/images/tiptapIcons/table.svg"/>
					</button>
  <!--
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/ul.svg" alt="">
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/ol.svg" alt="">
          </button>
  -->
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/quote.svg" alt="">
            <!--<icon name="quote" />-->
          </button>
  
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/code.svg" alt="">
            <!--<icon name="code" />-->
          </button>
  
          <button
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/hr.svg" alt="">
            <!--<icon name="hr" />-->
          </button>
          <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <!--<icon name="image" />-->
        </button>
  
          <button
            class="menubar__button"
            @click="commands.undo"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/undo.svg" alt="">
            <!--<icon name="undo" />-->
          </button>
  
          <button
            class="menubar__button"
            @click="commands.redo"
          >
            <img class="icon" src="@/assets/images/tiptapIcons/redo.svg" alt="">
            <!--<icon name="redo" />-->
          </button>
  
        </div>
      </editor-menu-bar>
  
      <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script>
// import Icon from '@/components/Icon'
import io from 'socket.io-client'
import Collaboration from './extensions/Collaboration.js'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  //OrderedList,
  //BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Image,
  Table,
	TableHeader,
	TableCell,
	TableRow,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
    // Icon,
  },
  computed:{
    pageIndex(){
        return this.$store.getters.getPageIndex;
    }
  },
  watch:{
    pageIndex(value){
      //console.log("change"+value);
      //console.log(this.contents[value]);
      this.editor.setContent(this.contents[value]);
    }
  },
  data() {
    return {
      editor: null,
      contents:[""],
      collaboration:false //템플릿에서는 콜라보레이션 중지
    }
  },
  methods: {  
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
    loadContentsList(){
      
    },
    emptyTemplate(){
      console.log("only load editor:"+this.$store.getters.getPageIndex); 
       this.editor = new Editor({
        content: this.contents[this.$store.state.pageIndex],
        extensions: [
          new Blockquote(),
          //new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          //new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Image(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
					new Table({
  					resizable: true,
					}),
					new TableHeader(),
					new TableCell(),
					new TableRow()
        ],
        onUpdate:({getJSON,getHTML})=>{
          alert('this update????');
          this.contents[this.$store.state.pageIndex] = getHTML();
        }
      })
    },
    onInit({ doc, version }) {
     
      this.loading = false
      if (this.editor) {
        this.editor.destroy()
      }
      this.editor = new Editor({
        content: doc,
        extensions: [
          new Blockquote(),
          //new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          //new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Image(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
					new Table({
  					resizable: true,
					}),
					new TableHeader(),
					new TableCell(),
					new TableRow(),
          new Collaboration({
            socket: this.socket,
            clientID: this.socket.id,
            /*
            me: {
              //displayname: document.querySelector('meta[name="userName"]').getAttribute('content'),
              //displayname: this.randomuser.name.first+" "+this.randomuser.name.last,
              displayname: "bla",
              //displaycolor: '#555';
              displaycolor: this.getDisplaycolor(this.socket.id),
            },
            */
            //me: {},
            // the initial version we start with
            // version is an integer which is incremented with every change
            version,
            // debounce changes so we can save some requests
            debounce: 0,
            // onSendable is called whenever there are changed we have to send to our server
            onSendable: ({ sendable }) => {
              if(this.collaboration==false){
                this.socket.emit('update', sendable)
              }
            },
          }),
        ],
      })
      // Load Random Userdata, after Editor is intiated
      
      //사용자 정보 가져오는듯
      /*
      this.$axios
        .get('http://3.34.75.24:3003/')
        .then(response => {
          
          let me = {
            displayname: response.data.results[0].name.first+" "+response.data.results[0].name.last,
            displaycolor: this.getDisplaycolor(this.socket.id),
            thumbnail: response.data.results[0].picture.thumbnail
          }
          let me = {displayname:"park",displaycolor:"#ccc",thumbnail:""}
          this.editor.extensions.options.collaboration.me = me
          this.me = me
          this.socket.emit("init", me)
        })
      */
      
      if(this.collaboration){
        let me = {displayname:"park",displaycolor:"#ccc",thumbnail:""}
          this.editor.extensions.options.collaboration.me = me
          this.me = me
          this.socket.emit("init", me)
      }
      
    },
    setCount(count) {
      this.count = count
    },
    setParticipants(participants) {
      this.participants = participants
    },
    getDisplayname(){
      return this.randomuser.name.first+" "+this.randomuser.name.last
    },
    getDisplaycolor (str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = '#';
      for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
      }
      return colour;
    },
  },
  mounted(){
    if(this.$route.params.id){
      console.log(`this route params id : ${this.$route.params.id}`)
      this.socket = io("https://socket.makereducation.net"+'/'+this.$route.params.id)
      // this.socket = io("https://socket.makereducation.net")
      .on('init', data => { console.log(data); this.onInit(data)})
      .on('update', data => {
          this.editor.extensions.options.collaboration.update(data)
          if(this.collaboration){
            this.editor.extensions.options.collaboration.updateCursors(data) //콜라보시 사용자 이름표시
          }
      })
      .on('getCount', count => this.setCount(count))
      .on('cursorupdate', data => {
          if(this.collaboration){
          this.editor.extensions.options.collaboration.updateCursors(data) //콜라보시 사용자 이름표시 가져오기
          }
          this.setParticipants(data.participants)
      })
    }else{
      this.emptyTemplate('');
    }
  },
  beforeDestroy() {
    if(this.editor != null){
      this.editor.destroy()
    }
  },
}
</script>
<style lang="scss" scope>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 .3rem;
  top: -.05rem;
  fill: currentColor;

  // &.has-align-fix {
  // 	top: -.1rem;
  // }

  &__svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

}

// svg sprite
body > svg,
.icon use > svg,
symbol {
  path,
  rect,
  circle,
  g {
    fill: currentColor;
    stroke: none;
  }

  *[d="M0 0h24v24H0z"] {
    display: none;
  }
}

//

.editor{
  width:100%;
  min-height:calc(100vh - 200px);
  box-sizing:border-box;
  background:#fff;
  max-width:100%;
  padding:1rem;
  margin-bottom:1rem;
}

/*@media (min-width:768px){*/
/*  .editor{height:891px;}*/
/*}*/

/*@media (min-width:1440px){*/
/*  .editor{height:1184px;}*/
/*}*/
  
</style>
