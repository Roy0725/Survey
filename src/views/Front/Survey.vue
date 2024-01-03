<template>
    <div class="top">
      <div class="name">
        <p>問卷名稱 :</p>
        <input type="text" v-model="searchTitle">
      </div>
      
      <div class="time">
        <p>開始時間 :</p>
        <input type="date" v-model="searchStartDate">
        <p class="at">到</p>
        <input type="date" v-model="searchEndDate">
        <button type="button"  @click="search">搜尋</button>
      </div>
    </div>
    
      <table>
        <tr>
          <th>編號</th>
          <th>名稱</th>
          <th>狀態</th>
          <th>開始時間</th>
          <th>結束時間</th>
          <th>結果</th>
        </tr>
        <tr v-for="(item, index) in dataArr" :key="index">
          <td>{{item.num}}</td>
          <td class="survey">
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="upData(item.num)">
              {{ item.name }}
            </button>
          </td>
          <td :style="{ color: getStatusColor(item.startDate, item.endDate) }">{{ getStatus(item.startDate, item.endDate) }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.endDate }}</td>
          <td></td>
        </tr>
      </table>
    <br>
    <br>
    <div class="modal fade" id='exampleModal'  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="padding: 10px;">
              <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="surveyTime">
                    <p>{{ upStartDate }} - {{ upEndDate }}</p>
                  </div>
                  <div class="modal-body">
                    <div class="mainTitle" style="text-align: center;">
                      <h1>{{ upName }}</h1>
                    </div>
                    <div class="content" style="text-align: center;">
                      <p>{{ upDescription }}</p>
                    </div>
                      <div class="container">
                        <div class="info">
                          <div class="set">
                            <label for="">姓名 :</label>
                            <input type="text" style="margin-left: 10px;" v-model="name" required>
                          </div>
                          <br>
                          <div class="set">
                            <label for="">手機 :</label>
                                <input type="number" style="margin-left: 10px;" v-model="phone">
                          </div>
                          <br>
                          <div class="set">
                            <label for="">信箱 :</label>
                            <input type="email" style="margin-left: 10px;" v-model="email">
                          </div>
                          <br>
                          <div class="set">
                            <label for="">年齡 :</label>
                            <input type="number" style="margin-left: 10px;" v-model="age">
                          </div>
                          <br>
                        </div>
                        <p style="color: red;margin-left: 20px;">*為必填</p>
                        <div class="list" v-for="(item, index) in upQuestionList" :key="index">
                  <div class="question">
                      <p>{{ item.num }} . {{ item.title }}</p>
                      <span v-if="item.necessary === true" style="color: red;">*</span>
                      <p>({{ item.type }})</p>
                  </div>
                  <br>
                  <div class="options" v-for="op in (typeof item.option === 'string' ? item.option.split(';') : [])">
                      <div class="left">
                          <label for="" style="margin-right: 10px;" ></label>
                      </div>
                        <input class="check" type="checkbox" name="checkbox" v-if="item.type === '複選題'">                       
                        <input class="radio" type="radio" name="radio" v-if="item.type === '單選題'">
                        <textarea class="text" name="" id="" cols="50" rows="5" v-if="item.type === '簡答題'" v-model="message"></textarea>
                        <p>{{ op }}</p>
                        </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="write">送出</button>
                  </div>
                </div>
              </div>
            </div>
    </div> 
    <div class="pages">
      <i class="fa-solid fa-angles-left" @click="pagination(surveyArr, currentPage - 1)"></i>
      <p v-for="pageNumber in dataPages" :key="pageNumber" @click="pagination(surveyArr, pageNumber)">{{ pageNumber }}</p>
      <i class="fa-solid fa-angles-right" @click="pagination(surveyArr, currentPage + 1)"></i>
    </div>
    </template>
    <script>
    import axios from 'axios'

    export default {
      data(){
        return{
          searchTitle:'',
          searchStartDate:'',
          searchEndDate:'',
          surveyArr:[],
          isLogin:false,
          dataArr:[],
          dataPages:[],
          currentPage: 1, //預設當前頁數1
          upName: '',
          upDescription: '',
          upStartDate: '',
          upEndDate: '',
          upQuestionList: [],
          num:'',
          editArr:[],
          name:'',
          phone:'',
          email:'',
          age: '',
          test:[],
          writeArr:[],
          answer:[],
          message: '',
          optionArr:[],
        }
      },
      mounted(){
        this.search()
      },
      methods:{
        upData(num){
          this.editArr.forEach(editArr => {
            editArr.forEach((item) => {
              if(num != item.num){
                return
              }
              console.log(item.name);
              let test = item.questionStr
              this.upName = item.name
              this.upDescription = item.description
              this.upStartDate = item.startDate
              this.upEndDate = item.endDate
              this.upNum = item.num

              if(this.upQuestionList != ""){
                this.upQuestionList = ""
              }
              this.upQuestionList=JSON.parse(test)
              // console.log(this.upQuestionList);
              
            })
          })
        },
        pagination(data, nowPage){
          //全部資料長度
          const dataTotal = data.length
          //每頁顯示筆數
          const pageData = 10
          //總頁數
          const pageTotal = Math.ceil(dataTotal / pageData)

          //頁碼列表
          this.dataPages = []
          for(let i = 1; i <= pageTotal; i++){
            this.dataPages.push(i)
          }
          
          //當前頁數，從第一頁開始
          let currentPage = nowPage
          //避免當前頁數超出總頁數
          currentPage = Math.max(1, Math.min(currentPage, pageTotal))

          //每個分頁第一筆
          const minData = (currentPage - 1) * pageData
          //每個分頁最後一筆
          const maxData = currentPage * pageData

          this.dataArr = this.surveyArr.slice(minData, maxData)
        },
        changePages(nowPage){
          this.pagination(this.surveyArr, nowPage)
          this.currentIndex = nowPage
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
                })
              });
              this.surveyArr.reverse()
              this.editArr.push(res.data.quizList)
              
              this.pagination(this.surveyArr, 1)
            })
        },
        getStatus(startDate, endDate) {
            const now = new Date();
            const startTime = new Date(startDate);
            const endTime = new Date(endDate);

            if (now >= startTime && now <= endTime) {
                return '進行中';
            } else {
                return '已結束';
            }
        },
        getStatusColor(startDate, endDate){
          const status = this.getStatus(startDate, endDate)

          if(status === "進行中"){
            return '#365314'
          }else if(status === "已結束"){
            return '#b91c1c'
          }else{
            return 'black'
          }
        }, 
        write(){
          const radio = document.querySelectorAll(".radio")
          const check = document.querySelectorAll(".check")
          const text = document.querySelectorAll(".text")

          this.upQuestionList.forEach((item, index) => {
            item.option = Array.isArray(item.option) ? item.option : item.option.split(';');
            radio.forEach((radio, radioIndex) => {
              if (radio.checked) {
                if(item.type === '單選題') {
                  const optValue = Object.values(item.option)
                  this.answer.push({ qNum: index + 1, optionList:[optValue[radioIndex]] })
                }
              }
            })
            check.forEach((check, checkIndex) => {
              if (check.checked) {
                if(item.type === '複選題') {
                  const optValue = Object.values(item.option)
                  this.answer.push({ qNum: index + 1, optionList:[optValue[checkIndex]] })
                }
              }
            })
            text.forEach(text => {
                if(item.type === '簡答題') {
                  this.answer.push({ qNum: index + 1, optionList: [this.message] })
                }
            })
            })


          axios({
            url:'http://localhost:8080/writer/write',
            method:"POST",
            headers:{"Content-Type": "application/json"},
            data:{  
              quiz_num: this.upNum,
              name: this.name,
              phone: this.phone,
              email: this.email,
              age: this.age,
              answer: JSON.stringify(this.answer),
            }
          })
          .then(res => console.log(res.data))

          this.name = "",
          this.phone = "",
          this.email = "",
          this.age = "",
          this.message = ""
        },
      }
    }
    </script>
    <style lang="scss" scoped>
    

      .top{
        width: 1200px;
        height: 150px;
        border: 1px solid black;
        margin: 20px 0px;
        border-radius: 5px;
        
        
        .name{
          display: flex;
          flex-direction: row;
          margin-left: 11%;
          margin-top: 17px;
    
          input{
            height: 30px;
            margin-top: 12px;
            margin-left: 10px;
            width: 800px;
          }
    
          p{
            margin-top: 13px;
          }
        }
        
        .time{
          display: flex;
          flex-direction: row;
          margin-left: 11%;
        }
        input{
            margin: 0px 10px;
            width: 280px;
            height: 35px; 
            margin-top: 12px;
          }

          p{
            margin-top: 17px;
          }
    
          .at{
            margin: 0px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
    
          button{
            height: 38px;
            margin-top: 12px;
            margin-left: 32px;
            width: 82px;
            border-radius: 5px;
            cursor: pointer;
          }
      }
      
      .surveyTime{
        padding: 10px;
        display: flex;
        justify-content: flex-end;
      }
        table{
          width: 1200px;
          margin-top: 30px;
          text-align: center;
          
          tr{
            
            th{
              border: 2px solid black;
              border-radius: 5px;
            }
            
            td{
              border: 2px solid black;
              border-radius: 5px;
    
              .survey{
                cursor: pointer;
                color: blue;
    
                &:hover{
                  text-decoration: underline;
                }
              }
            }
          }
        }
    
        
        
        
    
        .pages{
      width: 1200px;
      height: 100px;
      display: flex;
      align-items: baseline;
      justify-content: center;
      i{
        font-size: 20pt;
        cursor: pointer;
      }
      p{
        font-size: 20pt;
        cursor: pointer;
        margin: 3px;
      }
    }
    .question{
      display: flex;

      p{
        margin: 0 10px;
      }
    }
    .options{
      display: flex;
      align-items: baseline;
      input{
        margin-left: 10px;
      }
      p{
        margin-left: 10px;
      }
    }
    </style>