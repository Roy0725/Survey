<template>
  <br>
  <br>
    <div class="inside">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" :class="{ active: step === 1 }" @click="changeStep(1)" id="createSurvey-tab" data-bs-toggle="tab" data-bs-target="#createSurvey" type="button" role="tab" aria-controls="createSurvey" aria-selected="true">問卷</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" :class="{ active: step === 2 }" @click="changeStep(2)" id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions" type="button" role="tab" aria-controls="questions" aria-selected="false">題目</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" :class="{ active: step === 3 }" @click="changeStep(3)" id="createConfirm-tab" data-bs-toggle="tab" data-bs-target="#createConfirm" type="button" role="tab" aria-controls="createConfirm" aria-selected="false">確認頁</button>
  </li>
  <!-- <li class="nav-item" role="presentation">
    <button class="nav-link" :class="{ active: step === 4 }" @click="changeStep(4)" id="response-tab" data-bs-toggle="tab" data-bs-target="#response" type="button" role="tab" aria-controls="response" aria-selected="false">問卷回饋</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" :class="{ active: step === 5 }" @click="changeStep(5)" id="statis-tab" data-bs-toggle="tab" data-bs-target="#statis" type="button" role="tab" aria-controls="statis" aria-selected="false">統計</button>
  </li> -->
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" :class="{ show: step === 1, active: step === 1 }" id="createSurvey" role="tabpanel" aria-labelledby="createSurvey-tab">
    <keep-alive>
      <CreateSurvey v-if="step === 1" @nextStep="nextStep"/>
    </keep-alive>
  </div>
  <div class="tab-pane fade" :class="{ show: step === 2, active: step === 2 }" id="questions" role="tabpanel  " aria-labelledby="questions-tab">
    <keep-alive>
      <Questions v-if="step === 2" @nextStep="nextStep" @prevStep="prevStep" />
    </keep-alive>
</div>
<div class="tab-pane fade" :class="{ show: step === 3, active: step === 3 }" id="createConfirm" role="tabpanel" aria-labelledby="createConfirm-tab">
  <CreateConfirm v-if="step === 3" 
    :dataFromCreateSurvey="dataFromCreateSurvey" 
    :dataFromQuestions="dataFromQuestions"
    @nextStep="nextStep"
    @prevStep="prevStep"
    @submitData="submitData"
    />
</div>
  <!-- <div class="tab-pane fade" :class="{ show: step === 4, active: step === 4 }" id="response" role="tabpanel" aria-labelledby="response-tab">
    <Response v-if="step === 4" />
  </div>
  <div class="tab-pane fade" :class="{ show: step === 5, active: step === 5 }" id="statis" role="tabpanel" aria-labelledby="statis-tab">
    <Statis v-if="step === 5" />
  </div> -->
  
</div>
</div>
</template>
<script>
import CreateSurvey from '@/components/CreateSurvey.vue'
import Questions from '@/components/Questions.vue'
import Response from '@/components/Response.vue'
import Statis from '@/components/Statis.vue'
import CreateConfirm from '@/components/CreateConfirm.vue'

export default {
    data(){
      return{
        step: 1,
        dataFromCreateSurvey:'',
        dataFromQuestions:'',
        isLogin:true,
      }
    
    },
    mounted(){
      const quizId = decodeURIComponent(this.$route.params.quizId);
    },
    methods:{
      nextStep(data){
        if(this.step === 1){
          this.dataFromCreateSurvey = data;
        }else if(this.step === 2){
          this.dataFromQuestions = data;
        }
        this.step++
      },
      prevStep(){
        this.step--
      },
      changeStep(newStep) {
        this.step = newStep;
      },
      submitData(){
        
        console.log(dataFromQuestions);
        console.log("To database", {
          dataFromCreateSurvey: this.dataFromCreateSurvey,
          dataFromQuestions:this.dataFromQuestions,
        });
      },
      unPublisghed(){
            if(this.name === "" || this.description === "" || this.start_date === "" || this.end_date === ""){
                alert('格式錯誤')
                return
            }

            const startDate = new Date(this.start_date)
            const endDate = new Date(this.end_date)

            if(endDate <= startDate){
                alert("結束時間不可早於或等於開始時間")
                return
            }

            axios({
                url:'http://localhost:8080/quiz/create',
                method:"POST",
                headers:{"Content-Type": "application/json"},
                data:{
                    name: this.name,
                    description: this.description,
                    start_date: this.start_date,
                    end_date: this.end_date,
                    is_login: this.isLogin,
                    questions:[],
                    published:0,
                }
            }).then(res=>console.log(res))
                
        },
    },
    components:{
    CreateSurvey,
    Questions,
    Response,
    Statis,
    CreateConfirm
}
}
</script>
<style lang="scss" scoped>
    .inside{
        width: 90vw;
        // height: 90vh;
        
        .tab-content{
            width: 90vw;
            height: 100%;
            border-left: 1px solid black;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
            border-radius: 5px;
            
        }
    }
</style>