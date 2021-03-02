<template>
    <div id="chatArea">
        <div id="chatList">
            <ul>
                <li @click="chatRoom = true" v-for="list in chatList">
                    <div class="chatImg">
                        <div :style="{ backgroundImage: 'url(' + list.chatImg1 + ')' }"></div>
                        <div :style="{ backgroundImage: 'url(' + list.chatImg2 + ')' }"></div>
                        <div :style="{ backgroundImage: 'url(' + list.chatImg3 + ')' }"></div>
                        <div :style="{ backgroundImage: 'url(' + list.chatImg4 + ')' }"></div>
                    </div>
                    <p class="ChatRoomName">{{ list.roomName }}</p>
                    <p class="chatLastChat">{{ list.lastChat }}</p>
                </li>
            </ul>
        </div>
        <div id="chatRoom" v-if="chatRoom">
            <div class="chatRoom_header" style="width:100%; height:50px; border-bottom:1px solid #e5e5e5; line-height:50px;">
                <div style="font-size:1rem; cursor:pointer;" @click="chatRoom = false">임시 뒤로 click</div>  
            </div>
            
            <div id="chatRoomWrap">
                <div class="chatRoom_left chatRoom_cont"> <!-- 상대방 채팅 -->
                    <div class="chatRoom_img" style="background:url(http://placeimg.com/640/480/any) no-repeat;"></div>
                    <p class="chatRoom_name">민수</p>
                    <p class="chatRoom_text">내용 내용 내용 내용 내용 내용 내용 내용</p>
                </div>
                <div class="chatRoom_right chatRoom_cont"> <!-- 내 채팅 -->
                    <p class="chatRoom_text">내용 내용 내용 내용 내용 내용 내용 내용</p>
                </div>
                <div class="chatRoom_left chatRoom_cont"> <!-- 상대방 채팅 -->
                    <div class="chatRoom_img" style="background:url(http://placeimg.com/640/480/any) no-repeat;"></div>
                    <p class="chatRoom_name">민수</p>
                    <p class="chatRoom_text">내용 내용 내용 내용 내용 내용 내용 내용</p>
                </div>
            </div>
            
            <div id="chatRoomInput">
                <input type="text" placeholder="내용 입력" />
                <button id="chatSend">전송</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "chatArea",
        data() {
            return {
                chatRoom: false,
                chatList: [
                    {
                        chatImg1: "http://placeimg.com/640/480/any",
                        chatImg2: "http://placeimg.com/640/480/arch",
                        chatImg3: "http://placeimg.com/640/480/nature",
                        chatImg4: "http://placeimg.com/640/480/tech",
                        roomName: "2학년 1반 과제",
                        lastChat: "마지막 채팅입니다. 마지막 채팅입니다."
                    },
                    {
                        chatImg1: "http://placeimg.com/640/480/any",
                        chatImg2: "http://placeimg.com/640/480/arch",
                        chatImg3: "http://placeimg.com/640/480/nature",
                        chatImg4: "http://placeimg.com/640/480/tech",
                        roomName: "2학년 1반 과제",
                        lastChat: "마지막 채팅입니다. 마지막 채팅입니다."
                    },
                    {
                        chatImg1: "http://placeimg.com/640/480/any",
                        chatImg2: "http://placeimg.com/640/480/arch",
                        chatImg3: "http://placeimg.com/640/480/nature",
                        chatImg4: "http://placeimg.com/640/480/tech",
                        roomName: "2학년 1반 과제",
                        lastChat: "마지막 채팅입니다. 마지막 채팅입니다."
                    },
                    {
                        chatImg1: "http://placeimg.com/640/480/any",
                        chatImg2: "http://placeimg.com/640/480/arch",
                        chatImg3: "http://placeimg.com/640/480/nature",
                        chatImg4: "http://placeimg.com/640/480/tech",
                        roomName: "2학년 1반 과제",
                        lastChat: "마지막 채팅입니다. 마지막 채팅입니다."
                    }
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    #chatArea{
        width:100%;
        height:100%;
        position:relative;
    }
    
    #chatList{
        width:100%;
        height:100%;
        background:#fff;
        overflow:auto;
        
        li{
            width:100%;
            height:70px;
            list-style:none;
            border-bottom:1px solid #e5e5e5;
            overflow:hidden;
            cursor:pointer;
        }
    }
    
    .chatImg{
        width:70px;
        height:70px;
        overflow:hidden;
        float:left;
        padding:0.125rem;
        margin-right:0.5rem;
    }
    
     .chatImg>div{
        width:calc(50% - 0.25rem) !important;
        height:calc(50% - 0.25rem) !important;
        float:left;
        margin:0.125rem;
        border-radius:10px;
    }
    
    .ChatRoomName{
        padding-top:0.7rem;
        margin-bottom:0.25rem;
        font-weight:bold;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-wrap:normal;
        overflow:hidden;
    }
    
    .chatLastChat{
        font-size:0.8rem;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-wrap:normal;
        overflow:hidden;
    }
    
    #chatRoom{
        width:100%;
        height:100%;
        background:#fff;
        position:absolute;
        left:0;
        top:0;
    }
    
    #chatRoomWrap{
        width:100%;
        height:calc(100% - 90px);
        overflow:auto;
    }
    
    .chatRoom_cont{
        width:100%;
        box-sizing:border-box;
        padding:15px;
        overflow:hidden;
        position:relative;
    }
    
    .chatRoom_left .chatRoom_img{
        width:40px;
        height:40px;
        border-radius:10px;
        position:absolute;
        left:15px;
        top:15px;
    }
    
    .chatRoom_left .chatRoom_name{
        padding-left:50px;
        font-size:0.9rem;
        font-weight:bold !important;
        margin-bottom:3px !important;
    }
    
    .chatRoom_left .chatRoom_text{
        display:inline-block;
        border-radius:10px;
        background:#F0EDFC;
        padding:10px;
        margin-left:50px;
        font-size:0.8rem;
    }
    
    .chatRoom_right .chatRoom_text{
        display:inline-block;
        border-radius:10px;
        background:rgb(41, 98, 255);
        color:#fff;
        padding:10px;
        font-size:0.8rem;
        float:right;
    }
    
    #chatRoomInput{
        width:100%;
        height:50px;
    }
    
    #chatRoomInput input{
        width:calc(100% - 50px);
        height:39px;
        border:1px solid #e5e5e5;
        padding-left:15px;
    }
    
    #chatRoomInput input::placeholder{
        font-size:0.8rem;
    }
    
    #chatSend{
        width:50px;
        height:40px;
        background:#2962ff;
        border:none;
        color:#fff;
        font-size:0.8rem;
    }
</style>