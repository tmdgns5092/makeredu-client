<template>
    <div>
        <div class="item">
            <h2 class="subTitle">진행중인 프로젝트</h2>
            <!-- 템플릿 리스트 -->
            <div class="item_listWrap">
                
                <!--<div class="templateItem" v-for="(item,index) in $store.state.project" :key="index" @click="$router.push(item.name)"> -->
                <div class="templateItem" v-for="(item,index) in $store.state.project" :key="index" @click="go2Pad(item)"> 
                    <p class="templateTitle">{{item.name}}</p>
                    <!--<p class="templateSubtitle">프로젝트 매니저:{{item.admin_name}}</p>-->
                    <!--<p class="templateSubtitle">item url:{{item.url}}</p>-->
                    <!--<p class="templateSubtitle">item :{{item}}</p>-->
                </div>
            </div>
        </div>
        <div class="item">
            <h2 class="subTitle">완료된 프로젝트</h2>
            <!-- 템플릿 리스트 -->
            <div class="item_listWrap">
                <div class="templateItem"> 
                    <p class="templateTitle">dd</p>
                    <p class="templateSubtitle">ㅇㅇ</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'Status',
        data() {
            return {
                
            }
        },
        methods: {
            go2Pad(item) {
                // let path = `/ProgressProject/${item.name}`;
                let path = `${item.url}`;
                this.$store.thisProject = item
                item.name
                this.$router.push(path)
            },
        },
    }    
</script>
<style>
    .subTitle{font-size:1.2rem; margin-bottom:20px;}
    
    .templateItem{
        width:80%;
        float:left;
        margin-right:1.2rem;
        border-radius:5px;
        overflow:hidden;
        background:#fff;
        padding:1rem;
        margin-bottom:1.2rem;
        transition:0.3s all;
        border:1px solid #e5e5e5;
        /*box-shadow:5px 5px 7px #e5e5e5;*/
        cursor:pointer;
        transition:all 0.2s;
        box-shadow:3px 3px 7px #e5e5e5;
    }
    
    .templateItem:hover{
        border:1px solid #5345b5 !important;
        color:#5345b5 !important;
    }
    
    .templateTitle{
        font-size:1rem;
        font-weight:700;
        margin-top:0.5rem;
        margin-bottom:0.25rem;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-wrap:normal;
        overflow:hidden;
    }
    
    .templateSubtitle{
        font-size:0.8rem;
        text-align:right;
        color:#7d7d7d;
        margin-bottom:0;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-wrap:normal;
        overflow:hidden;
    }
    
    .item{
        width:100%;
        margin-bottom:35px;
    }
    
    .item_listWrap{
        width:100%;
        overflow:hidden;
    }

@media (min-width:768px){
    .templateItem{
        width:calc(50% - 0.9rem);
    }
    
    .templateItem:nth-child(2n){
        margin-right:0;
    }
}
    
@media (min-width:1200px) {    
    .templateItem{
        width:calc(16.6% - 0.9rem);
    }
    
    .templateItem:nth-child(2n){
        margin-right:0.9rem;
    }
    
    .templateItem:nth-child(6n){
        margin-right:0;
    }
    
    .templateTitle{
        margin-bottom:0.65rem !important;
    }
}
</style>
