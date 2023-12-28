<template>
    <div class="top">
      <div class="name">
        <p>問卷名稱 :</p>
        <input type="text" v-model="searchTitle">
      </div>
      
      <div class="time">
        <p>統計時間 :</p>
        <input type="date" v-model="searchStartDate">
        <p class="at">到</p>
        <input type="date" v-model="searchEndDate">
        <button type="button" @click="search">搜尋</button>
      </div>
    </div>
    
    <div class="icons">
    <div class="delete">
      <i class="fa-solid fa-trash-can"></i>
    </div>

    <div class="add">
      <i class="fa-solid fa-plus" @click="goCreate()"></i>
    </div>
  </div>

      <table>
        <tr>
          <th></th>
          <th>編號</th>
          <th>名稱</th>
          <th>狀態</th>
          <th>開始時間</th>
          <th>結束時間</th>
          <th>結果</th>
        </tr>
        <tr v-for="(item, index) in dataArr" :key="index">
          <td><input type="checkbox" :value="item.num"></td>
          <td>{{ item.num }}</td>
          <td>{{ item.name }}</td>
          <td :style="{ color: getStatusColor(item.startDate, item.endDate) }">{{ getStatus(item.startDate, item.endDate) }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.endDate }}</td>
          <td></td>
        </tr>
      </table>
    <br>
    <br>
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
          name:"",
          description:"",
          start_date:"",
          end_date:"",
          searchTitle:'',
          searchStartDate:'',
          searchEndDate:'',
          currentPage: 1, //初始化當前頁數為1
          surveyArr:[],
          selectedSurvey:[],
          dataArr:[],
          isLogin:true,
          dataPages:[],
          isPublished: false,
        }
      },
      mounted(){
        this.search()
      },
      methods:{
        goCreate(){
          this.$router.push('/ManageCreate')
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
          const minData = (currentPage * pageData) - pageData
          //每個分頁最後一筆
          const maxData = currentPage * pageData

          this.dataArr = this.surveyArr.slice(minData, maxData)
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
                // this.currentPage = 1
                this.pagination(this.surveyArr, 1)
            })
              
        },
        getStatus(startDate, endDate) {
            const now = new Date();
            const startTime = new Date(startDate);
            const endTime = new Date(endDate);

            if (now < startTime) {
                return '尚未開始';
            } else if (now >= startTime && now <= endTime) {
                return '進行中';
            } else {
                return '已結束';
            }
        },
        getStatusColor(startDate, endDate){
          const status = this.getStatus(startDate, endDate)

          if(status === "尚未開始"){
            return '#5b21b6'
          }else if(status === "進行中"){
            return '#365314'
          }else if(status === "已結束"){
            return '#b91c1c'
          }else{
            return 'black'
          }
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
            margin-top: 17px
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
      
      .icons{
        display: flex;
        position: relative;
        .delete{
          font-size: 26pt;
          cursor: pointer;
          position: absolute;
          top: -10px;
          left: -570px;
        }
        
        .add{
          font-size: 26pt;
          position: absolute;
          top: -10px;
          left: -500px;
          cursor: pointer;
        }
      }

        table{
          width: 1200px;
          margin-top: 50px;
          text-align: center;
          
          tr{
            
            th{
              border: 2px solid black;
              border-radius: 5px;
            }
            
            td{
              border: 2px solid black;
              border-radius: 5px;
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
    </style>