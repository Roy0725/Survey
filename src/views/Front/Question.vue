<template>
    <br>
    <br>

    <div class="mainTitle" v-for="(item, index) in surveyArr" :key="index">
        <h1>{{ item.name }}</h1>
    </div>

    <div class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos error reiciendis ratione, exercitationem assumenda dicta illum quibusdam earum porro delectus magni placeat nihil tempore, itaque iure, omnis provident cupiditate? Maxime nemo fugit tenetur quibusdam voluptatum laboriosam architecto quidem perspiciatis ipsa!
    </div>

<div class="container">
    <div class="info">
    <div class="set">
        <label for="">姓名 :</label>
        <input type="text">
    </div>

    <div class="set">
        <label for="">手機 :</label>
        <input type="number">
    </div>

    <div class="set">
        <label for="">信箱 :</label>
        <input type="email">
    </div>

    <div class="set">
        <label for="">年齡 :</label>
        <input type="number">
    </div>
    </div>

    <div class="select">
        <ol>
            <li>你會想要安樂死的原因</li>
            
            <div class="answer1">
                <input type="radio" name="reason">
                <label for="">沒有尊嚴</label>
                <br>
                <input type="radio" name="reason">
                <label for="">已無遺憾</label>
                <br>
                <input type="radio" name="reason">
                <label for="">不想拖累家人</label>
                <br>
                <input type="radio" name="reason">
                <label for="">想自己選擇離去的方式</label>
            </div>

            <li>請說明理由</li>
            <textarea name="" id="" cols="50" rows="5"></textarea>

            <li>你是從哪些管道了解安樂死的</li>

            <input type="checkbox" name="pipe">
            <label for="">官方網站</label>
            <br>
            <input type="checkbox" name="pipe">
            <label for="">親友</label>
            <br>
            <input type="checkbox" name="pipe">
            <label for="">社群平台</label>
            <br>
            <input type="checkbox" name="pipe">
            <label for="">廣告</label>
            
        </ol>
    </div>
</div>


    <div class="confirm">   
        <input type="button" @click="cancel()" value="取消" class="btn1">
        <input type="button" value="送出" class="btn2">
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            surveyTitle:'',
            surveyStartDate:'',
            surveyEndDate:'',
            isLogin:false,
            radioText:"",
            checkText:[],
            surveyArr:[],
        }
    },
    mounted(){
        this.search()
        console.log(this.surveyArr);
  },
    methods:{
        cancel(){
            this.$router.push('/Survey')
        },
        search(){
          this.surveyArr = [];

          axios({
                url:'http://localhost:8080/quiz/search',
                method:"POST",
                headers:{"Content-Type": "application/json"},
                data:{
                  quiz_name:this.searchTitle,
                  start_date:this.searchStartDate,
                  end_date:this.searchEndDate,
                  is_login:this.isLogin,
                }
            })
            .then(res => {
              res.data.quizList.forEach(element => {
                this.surveyArr.push({
                  name:element.name,
                  description:element.description,
                  startDate:element.startDate,
                  endDate:element.endDate,
                  is_published:element.published,
                  question:element.questionStr,
                  num:element.num
                })});

                // this.surveyArr.reverse()
                
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    
    .content{
        margin: 20px 100px;
        font-size: 24px;
        width: 60%;
        
    }
    .container{
        display: flex;
        flex-direction: column;
        margin-bottom: 50px;
        width: 60%;
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
        
        .select{
            margin-top: 20px;

            li{
                font-size: 20px;
                margin: 20px 10px;
            }
            
            input{
                margin:10px;
            }
        }
    }
    .confirm{
        width: 100%;
        height: 100px;
       position: relative;
       

        .btn1{
            position: absolute;
            right: 40%;
            bottom: 30%;
        }

        .btn2{
            position: absolute;
            right: 35%;
            bottom: 30%;
        }

    }
</style>