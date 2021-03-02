<template>
    <div class="canvasPop">
        <vs-col class="canvasPop_cont">
            <i class="canvasPop_close mr-2 mdi mdi-close" @click="popClose"></i>
            <div>
                <p style="font-size:2rem; text-align:center; line-height:800px">캔버스 준비중</p>
            </div>
        </vs-col>
        <div class="canvasPop_back" @click="popClose"></div>
    </div>    
</template>
<script>
    export default {
        name: "canvasPop",
        data() {
            return {
                
            }
        },
        methods: {
            popClose() {
                 this.$store.state.canvasStatus = !this.$store.state.canvasStatus
            }
        }
    }
</script>
<style lang="scss">
    .canvasPop{
        -webkit-transition: all .2s;
        transition: all .2s;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 100px;
        top: 100px;
        left: 0;
        top: 0;
        z-index: 30000;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        opacity: 1;
        
        .canvasPop_cont{
            -webkit-transition: all .2s;
            transition: all .2s;
            z-index: 100;
            width: calc(100% - 20px);
            height:calc(100% - 40px);
            max-height:800px;
            margin: 10px !important;
            max-width: 1600px;
            border-radius: 6px;
            -webkit-box-shadow: 0 5px 20px 0 rgba(0,0,0,.1);
            box-shadow: 0 5px 20px 0 rgba(0,0,0,.1);
            background: #fff;
            -webkit-animation: rebound .3s;
            animation: rebound .3s;
            box-sizing:border-box;
            position:relative;
            
            .canvasPop_close{
                width:50px;
                height:50px;
                font-size:2.5rem;
                text-align:center;
                line-height:50px;
                color:#7d7d7d;
                position:absolute;
                right:-5px;
                top:0;
                cursor:pointer;
            }
        }
        
        .canvasPop_back{
            width: 100%;
            background: rgba(0,0,0,.4);
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            z-index: 10;
            -webkit-transition: all .25s ease;
            transition: all .25s ease;
            opacity: 1;
        }
    }
</style>