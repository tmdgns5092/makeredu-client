<template>
    <div id="profile">
        <div class="con-vs-card">
            <div class="vs-card--content">
                <h3 class="settings_title card-title d-flex">프로필 사진</h3>
                <div class="common_row vs-component vs-con-input-label vs-input w-100 vs-input-primary" style="margin-bottom:50px; position:relative;">
                    <div class="con-vs-avatar 70px" style="width: 70px; height: 70px; background: rgb(195, 195, 195);">
                        <div class="con-img vs-avatar--con-img">
                            <img src="/img/2.92fb17ec.jpg" alt="">
                        </div>
                    </div>
                    <label style="width:100px; height:45px; border:1px solid #5345b5; border-radius:3px; text-align:center; line-height:45px; display:inline-block; position:absolute; left:100px; font-weight:bold; top:20px; cursor:pointer; color:#5345b5;">
                        변경하기
                        <input type="file" style="display:none;" />
                    </label>
                </div>
                
                <h3 class="settings_title card-title d-flex">정보</h3>
                <div class="vs-row" style="display: flex; width: 100%;">
                    <div class="vs-col vs-xs-12 vs-sm- vs-lg-4" style="margin-left: 0%; width: 100%;">
                        <div class="common_row vs-component vs-con-input-label vs-input w-100 vs-input-primary">
                        <label for="" class="vs-input--label">이름</label>
                            <div class="vs-con-input">
                                <input type="text" class="vs-inputx vs-input--input normal" style="border: 1px solid rgba(0, 0, 0, 0.2);" placeholder="이름을 입력해주세요." value="김에듀">
                            </div>
                        </div>
                        <div class="common_row vs-component vs-con-input-label vs-input w-100 vs-input-primary">
                        <label for="" class="vs-input--label">직업</label>
                            <div class="vs-con-input">
                                <input type="text" class="vs-inputx vs-input--input normal" style="border: 1px solid rgba(0, 0, 0, 0.2);" placeholder="직책을 입력해주세요." value="학생">
                            </div>
                        </div>
                        <div class="common_row vs-component vs-con-input-label vs-input w-100 vs-input-primary">
                        <label for="" class="vs-input--label">이메일</label>
                            <div class="vs-con-input">
                                <input type="text" class="vs-inputx vs-input--input normal" style="border: 1px solid rgba(0, 0, 0, 0.2);" value="makeredutaion@gmail.com" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled" style="width:120px; height:45px; background:#5345b5 !important; float:right; margin-bottom:20px;">
            <span class="vs-button-backgroundx vs-button--background" style="opacity: 1; left: 20px; top: 20px; width: 0px; height: 0px; transition: width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s;"></span><!---->
            <span class="vs-button-text vs-button--text">저장</span>
            <span class="vs-button-linex" style="top: auto; bottom: -2px; left: 50%; transform: translate(-50%);"></span>
        </button>
    </div>
</template>
<script>
    export default {
        name: "profile",
        data() {
            return {
                
            }
        },
        methods: {
            successUpload(){
                this.$vs.notify({
                    color:'success',
                    title:'Upload Success',
                    text:'Lorem ipsum dolor sit amet, consectetur'})
            }
        }
    }
</script>
<style lang="scss">
    .settings_title{
        margin-bottom:30px !important;
    }
    
    .common_row{
        margin-bottom:20px;
    }
</style>
