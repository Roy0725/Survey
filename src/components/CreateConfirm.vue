<template>
    <div class="all">
        <div class="time">
            <p>{{ dataFromCreateSurvey.start_date }} - {{ dataFromCreateSurvey.end_date }}</p>
        </div>
        <div class="title">
            <h1>{{ dataFromCreateSurvey.name }}</h1>
            <br>
            <h5>{{ dataFromCreateSurvey.description }}</h5>
        </div>
        <br>
    <div class="info">
        <div class="set">
            <label for="">姓名 :</label>
            <input type="text" disabled>
        </div>

        <div class="set">
            <label for="">手機 :</label>
            <input type="number" disabled>
        </div>

        <div class="set">
            <label for="">信箱 :</label>
            <input type="email" disabled>
        </div>

        <div class="set">
            <label for="">年齡 :</label>
            <input type="number" disabled>
        </div>
    </div>

    <div class="questions" v-for="question in dataFromQuestions.question_list" :key="question.id">
        <p>{{ question.id }} . {{ question.question }}</p>
        <p>{{ dataFromQuestions }} </p>
    </div>
</div>
</template>
<script>
import axios from 'axios';


export default {
    props:{
        dataFromCreateSurvey:{
            type:String,
            default:'',
        },
        dataFromQuestions:{
            type:String,
            default:'',
        }
    }
}
</script>
<style lang="scss" scoped>
    .all{
        padding: 30px;

        .time{
            display: flex;
            justify-content: flex-end;
        }
        .title{
            text-align: center;
        }

        .info{
            display: flex;
            flex-direction: column;

            .set{
                display: flex;
                padding: 10px;
            }
            input{
                width: 800px;
                // height: 0px;
                margin-left: 10px;
            }

        }
    }
</style>