<template>
    <div class="create">
        <div class="survey">
            <label for="name">問卷名稱 :</label>
            <input type="text" class="name" v-model="name">
        </div>
         <br>
         <div class="area">
            <label for="description">問卷說明 :</label>
            <textarea name="" id="" cols="131" rows="10" class="block" v-model="description"></textarea>
        </div>   
        <br>
        <br>
        <div class="start">
            <label for="start_date">開始時間 :</label>
            <input type="date" class="block" v-model="start_date">
        </div>
        <br>
        <br>
        <div class="end">
            <label for="end_date">結束時間 :</label>
            <input type="date" class="block" v-model="end_date">
        </div>
        <br>
        <br>
        <div class="confirm">
            <input type="button" value="取消" class="cancel" @click="cancel()">
            <input type="button" value="下一頁" class="next" @click="nextStep">
        </div>
    </div>
</template>
<script>
// import { DATE } from 'mysql/lib/protocol/constants/types'
import axios from 'axios'
    
export default {
    data(){
        return{
            name:"",
            description:"",
            start_date:"",
            end_date:"",
            
        }
    },
    methods:{
        cancel(){
            this.$router.push('/Manage')
        },
        nextStep(){
            const sendData = {
                name:this.name,
                description:this.description,
                start_date:this.start_date,
                end_date:this.end_date,
            };
            this.$emit('nextStep', sendData)
        },
        // createQuestion(){
        //     const newQuestion ={
        //         questionType:'',
        //         questionText:'',
        //         optionText:'',
        //         necessary:'', //是否必填，以0,1表示
        //         question:[],
        //         options:[],
        //     }
        //     this.questionArr.push(newQuestion)
        //     this.questionList.push(newQuestion) //新增位置

        // },
        UnPublisghed(){
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

            const newQuestionIn = {
                questionIn:{
                    name:this.name,
                    description:this.description,
                    start_date:this.start_date,
                    end_date:this.end_date,
                    questions:[],
                    published: 0,
                },
                question_list: this.question_list,
            }

            // this.questionArr.forEach((item, questionIndex) => {
            //     const optionTextArr = item.options.map(option => option.text)
            //     this.questionArr[questionIndex].optionText = optionTextArr.join(';')
            // })

            console.log(newQuestionIn);

            axios({
                url:'http://localhost:8080/quiz/create',
                method:"POST",
                headers:{"Content-Type": "application/json"},
                data:{
                    name:this.name,
                    description:this.description,
                    start_date:this.start_date,
                    end_date:this.end_date,
                    questions:[],
                    published:0,
                }
            }).then(res=>console.log(res))
                
        },
    },
    
}
</script>
<style lang="scss" scoped>
    .create{
        padding: 70px;
        
        .name{
            width: 86.3%;
            margin-left: 10px;
        }
        .area{
            display: flex;
            flex-direction: row;
            align-items: baseline;

        }
        .block{
            margin-left: 10px;
        }

        .confirm{
            display: flex;
            justify-content: flex-end;
            .cancel{
                margin-right: 20px;
            }
            .next{
                margin-right: 10px;
            }
        }
    }
</style>