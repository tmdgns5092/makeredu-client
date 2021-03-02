<template>
    <div id="invite" v-if="editorShow">
        <div @click="modalState = true" class="invite_btn">초대</div>
        
        <div v-if="modalState" class="invite_modal">
            <div class="invite_modal_cont">
                <h2 class="common_title">사용자 초대</h2>
                <ul class="invite_list">
                    <li v-for="(item, index) in users" :key="index">
                        <div class="invite_list_name" v-bind:data-value="item.id">{{ item.name }}</div>
                        <div class="invite_list_btn" @click="invite">초대</div>
                    </li>
                </ul>
                <div class="common_btnWrap">
                    <div class="common_btn" @click="modalState = false">취소</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'invite',
    props: ['editorShow'],
    data() {
        return {
            modalState: false,
            btnState: '초대',
            // users: [
            //     '김테스트',
            //     '이테스트',
            //     '박테스트',
            //     '최테스트',
            //     '항테스트',
            //     '킴테스트'
            // ]
            users: this.load_userList()
        }
    },
    mounted() {
        // this.load_userList();
    },
    methods: {
        invite(event) {
            
            let tmp = this.$store.thisProject.url;
            let tmps = tmp.split('/')
            let padID = tmps[tmps.length -1];
            let title = this.$store.thisProject.name;
            let user_id = event.target.parentElement.children[0].dataset.value;
            this.$axios.post(`https://api.makereducation.net/pad/users`, {padID: padID, userIdArray: user_id, title: title }).then(
                (result)=> {
                    if(result.data.code == 200){
                        alert(`초대가 완료되었습니다.`)
                        event.target.parentElement.parentElement.children[0].remove();
                    }
                })
        },
        load_userList() {
            console.log('load_userList')
            let tmp = this.$store.thisProject.url;
            let tmps = tmp.split('/')
            let padID = tmps[tmps.length -1];
            
            let userArray = new Array();
            // console.log(`${padID} : padID`)
            this.$axios.get(`https://api.makereducation.net/pad/getReqestList?padID=${padID}`).then(
    		  (result)=>{
		      //  console.log(result);
		        result.data.map((user, index) => {
		            console.log({
		                id:   user.id,
		                name: user.name
		            })
		            userArray.push({
		                id:   user.id,
		                name: user.name
		            })
		        });
    		  }	
    		)
    		return userArray;
        }, 
    }
}
</script>

<style lang="scss" scopded>
/*.common_input{*/
/*    width:100%;*/
/*    height:40px;*/
/*    padding-left:15px;*/
/*    border:1px solid #e5e5e5;*/
/*    font-size:0.9rem;*/
/*    margin-bottom:10px;*/
/*}*/
.common_title{
    font-size:1.2rem;
    margin-bottom:15px !important;
}
.common_btnWrap{
    width:100%;
    overflow:hidden;
}
.common_btn{
    float:right;
    color:#7d7d7d;
    font-weight:bold;
    font-size:0.9rem;
}
.invite_btn{
    position:absolute;
    z-index:99999;
    right:100px;
    top:20px;
    font-size:0.8rem;
    color:#816dff;
    font-weight:bold;
}

.invite_modal{
    width:100%;
    height:100vh;
    background:rgba(0,0,0, 0.7);
    position:fixed;
    left:0;
    top:0;
    z-index:999999;
}

.invite_modal_cont{
    width:calc(100% - 40px);
    max-width:350px;
    margin:0 auto;
    background:#fff;
    padding:20px;
    margin-top:100px;
    border-radius:10px;
}

.invite_list{
    width:100%;
}

.invite_list li{
    width:100%;
    overflow:hidden;
}

.invite_list_name{
    width:calc(100% - 50px);
    height:40px;
    line-height:40px;
    float:left;
    padding-right:15px;
    font-weight:bold;
}

.invite_list_btn{
    width:50px;
    height:40px;
    line-height:40px;
    font-size:0.9rem;
    font-weight:bold;
    text-align:right;
    color:#816dff;
    background:#fff;
    float:left;
    cursor: pointer;
}

@media (min-width:768px) {
    .invite_btn{
    position: absolute;
    right: 100px;
    top: 10px;
    z-index: 99999;
    padding: 7px 20px;
    background: #fff;
    color: #816dff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 0.8rem;
    border:1px solid #816dff;
    cursor:pointer;
    }
    
    .invite_modal_cont{
        margin-top:200px;
    }
}
</style>
