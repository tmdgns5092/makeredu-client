<template>
    <div>
        <div class="friendList">
            <ul>
                <li class="friendItem" v-for="friend in friendList" :key="friendList.userID">
                    <div class="img">
                        <img :src="friend.picture" alt="" />
                    </div>
                    <div class="text">
                        <p class="name"> {{ friend.name }}</p>
                        <p class="email"> {{ friend.email }}</p>
                    </div>
                    <div class="invite">초대</div>
                </li>
            </ul>
        </div>
    </div>    
</template>
<script>
    export default {
        name: "friends",
        data() {
            return {
                friendList: [
                    {
                        name: "김테스트1",
                        email: "test@test.com",
                        picture: "http://placeimg.com/640/480/people",
                        userID: "1"
                    },
                    {
                        name: "김테스트2",
                        email: "test@test.com",
                        picture: "http://placeimg.com/640/480/people",
                        userID: "2"
                    },
                    {
                        name: "김테스트3",
                        email: "test@test.com",
                        picture: "http://placeimg.com/640/480/people",
                        userID: "3"
                    },
                    {
                        name: "김테스트4",
                        email: "test@test.com",
                        picture: "http://placeimg.com/640/480/people",
                        userID: "4"
                    },
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .friendItem{
        width:100%;
        height:70px;
        overflow:hidden;
        padding:0.5rem 1rem 0.5rem 1rem;
        position:relative;
        
        &:last-child{
            
        }
        
        .img{
            width:50px;
            height:50px;
            float:left;
            border-radius:50%;
            overflow:hidden;
            
            img{
                min-width:100%;
                max-width:100%;
            }
        } 
        
        .text{
            width:calc(100% - 70px);
            float:left;
            padding-left:1rem;
            
            p{
                margin:0;
            }
            
            .name{
                font-weight:600;
                font-size:0.9rem;
            }
            
            .email{
                font-size:0.8rem;
                color:#7d7d7d;
            }
        }
        
        .invite{
            width:60px;
            height:30px;
            text-align:center;
            line-height:30px;
            border-radius:5px;
            position:absolute;
            right:20px;
            top:14px;
            font-size:0.7rem;
            background:#2962ff;
            color:#fff;
            cursor:pointer;
        }
    }
</style>
