<template>
    <div class="all">
        <div class="time">
            <p>{{ start_date }} - {{ end_date }}</p>
        </div>
        <div class="title">
            <h1>{{ name }}</h1>
            <br>
            <h5>{{ description }}</h5>
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
    <br>
    <br>
    <div class="questions" v-for="question in dataFromQuestions.question_list" :key="question.num">
        <p>{{ question.num }} . {{ question.title }}</p>
           
        <!-- <p>{{ question_list }}</p> -->

        <!-- <p>{{ question.options }}</p> -->
        <template v-if="question.type === '複選題'">
            <div class="options" v-for="(option, index) in optionArr(question.option)" :key="index">
                    <input type="checkbox" :value="option" v-model="selectedOptions">
                    <p>{{ option }}</p>
                    <p>{{ type }}</p>
        </div>
        </template>
        <template v-else-if="question.type === '單選題'">
            <div class="options" v-for="(option, index) in optionArr(question.option)" :key="index">
                <input type="radio" :value="option" v-model="selectedOption">
                <p>{{ option }}</p>
        </div>
        </template>
        <template v-else-if="question.type === '簡答題'">
            <div class="options" v-for="(option, index) in optionArr(question.option)" :key="index">
                <textarea name="" id="" cols="50" rows="5" v-model="showAnswer"></textarea>
        </div>
        </template>
        <br>
    </div>
        
    <br>
    <br>
    <br>
    <br>
    <div class="save">
        <input type="button" value="上一頁" @click="$emit('prevStep')">
        <input type="button" value="僅儲存" @click="unPublisghed">
        <input type="button" value="儲存並發佈" @click="publisghed">
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
        },
        
    },
    data(){
        return{
            selectedOptions:[],
            selectedOption:null,
            is_poblished:false,
            showAnswer:'',
            name:this.dataFromCreateSurvey.name,
            description:this.dataFromCreateSurvey.description,
            start_date:this.dataFromCreateSurvey.start_date,
            end_date:this.dataFromCreateSurvey.end_date,
            question_list:this.dataFromQuestions.question_list,
        }
    },
    methods:{
        optionArr(option){
            return option.split(';').map(option => option.trim())
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

            console.log(this.question_list);

            axios({
                url:'http://localhost:8080/quiz/create',
                method:"POST",
                headers:{"Content-Type": "application/json"},
                data: JSON.stringify({
                    name:this.name,
                    description:this.description,
                    start_date:this.start_date,
                    end_date:this.end_date,
                    question_list: this.question_list,
                    is_published:false,
                })
            })
            .then(res => console.log(res))
            .catch(error => console.error(error))

            alert('已新增問卷，狀態為未發佈')
            this.$router.push('/Manage')
        },
        publisghed(){
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
                data: JSON.stringify({
                    name:this.name,
                    description:this.description,
                    start_date:this.start_date,
                    end_date:this.end_date,
                    question_list: this.question_list,
                    is_published:true,
                })
            })
            .then(res => console.log(res))
            .catch(error => console.error(error))

            alert('已新增問卷，狀態為已發佈')
            this.$router.push('/Manage')
        },
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

        .options{
            display: flex;
            align-items: baseline;
            p{
                margin-left: 10px;
            }
        }

        .save{
            display: flex;
            justify-content: center;

            input{
                margin: 0px 20px;
            }
        }
    }
</style>