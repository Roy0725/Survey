<template>
    <div class="inside">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="createSurvey-tab" data-bs-toggle="tab" data-bs-target="#createSurvey" type="button" role="tab" aria-controls="createSurvey" aria-selected="true">問卷</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions" type="button" role="tab" aria-controls="questions" aria-selected="false">題目</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="response-tab" data-bs-toggle="tab" data-bs-target="#response" type="button" role="tab" aria-controls="response" aria-selected="false">問卷回饋</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="statis-tab" data-bs-toggle="tab" data-bs-target="#statis" type="button" role="tab" aria-controls="statis" aria-selected="false">統計</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="createSurvey" role="tabpanel" aria-labelledby="createSurvey-tab">
    <CreateSurvey></CreateSurvey>
  </div>
  <div class="tab-pane fade" id="questions" role="tabpanel" aria-labelledby="questions-tab">
    <Questions></Questions>
</div>
  <div class="tab-pane fade" id="response" role="tabpanel" aria-labelledby="response-tab">
    <Response></Response>
  </div>
  <div class="tab-pane fade" id="statis" role="tabpanel" aria-labelledby="statis-tab">
    <Statis></Statis>
  </div>
</div>
</div>
</template>
<script>
import CreateSurvey from '@/components/CreateSurvey.vue'
import Questions from '@/components/Questions.vue'
import Response from '@/components/Response.vue'
import Statis from '@/components/Statis.vue'

export default {
    date(){
        return{

        }
    },
    components:{
        CreateSurvey,
        Questions,
        Response,
        Statis
    }
}
</script>
<style lang="scss" scoped>
    .inside{
        width: 50vw;
        height: 70vh;

        .tab-content{
            width: 50vw;
            height: 70vh;
            border-left: 1px solid black;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
            border-radius: 5px;
        }
    }
</style>