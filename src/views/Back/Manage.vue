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
    <div class="add">
      <i class="fa-solid fa-plus" @click="goCreate"></i>
    </div>
  </div>

      <table>
        <tr>
          <th>刪除</th>
          <th>編號</th>
          <th>名稱</th>
          <th>狀態</th>
          <th>開始時間</th>
          <th>結束時間</th>
          <th>結果</th>
        </tr>
        <tr v-for="(item, index) in dataArr" :key="index">
          <td class="iconDelete"><i class="fa-sharp fa-solid fa-xmark" @click="confirmDelete(item.num)"></i></td>
          <td>{{ item.num }}</td>
          <td>
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target='#exampleModal' @click="upData(item.num)">
                {{ item.name }}
              </button>
          </td>
          <td :style="{ color: getStatusColor(item.startDate, item.endDate) }">{{ getStatus(item.startDate, item.endDate, item.is_published) }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.endDate }}</td>
          <td>
            <button @click="goResponsePage(item.num)" class="goRes">回饋</button>
          </td>
        </tr>
      </table>
    <br>
    <br>
    <div class="modal fade" id='exampleModal'  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <div class="create" style="padding: 10px;">
                    <div class="survey">
                      <label for="name">問卷名稱 :</label>
                      <input type="text" class="name" v-model="this.upName" style="width: 37.5vw;margin-left: 10px;">
                    </div>
                  <br>
                  <div class="area" style="display: flex;align-items: baseline;">
                      <label for="description">問卷說明 :</label>
                      <textarea name="" id="" cols="69" rows="4" class="block" v-model="this.upDescription" style="margin-left: 10px;"></textarea>
                  </div>   
                  <br>
                  <div class="start">
                      <label for="start_date">開始時間 :</label>
                      <input type="date" class="block" v-model="this.upStartData" style="margin-left: 10px;">
                  </div>
                  <br>
                  <div class="end">
                      <label for="end_date">結束時間 :</label>
                      <input type="date" class="block" v-model="this.upEndDate" style="margin-left: 10px;">
                  </div>
                  <br>
                  <div class="list" v-for="(item, index) in upQuestionList" :key="index">
                  <div class="question">
                      <p>第{{ item.num }}題</p>
                      <label for="question">問題 :</label>
                      <input type="text" class="input" v-model="item.title" style="margin-left: 10px;width: 30vw;">
                      <select name="" id="" class="select"  style="margin: 0 30px;" v-model="item.type">
                          <option value="單選題">單選題</option>
                          <option value="複選題">複選題</option>
                          <option value="簡答題">簡答題</option>
                      </select>
                      <input type="checkbox" class="checkbox" v-model="item.necessary">必填
                  </div>
                  <br>
                  <div class="options" style="display: flex; align-items: center;">
                      <div class="left">
                          <label for="options" style="margin-right: 10px;">選項 :</label>
                      </div>
                      <div class="right">
                          <p style="text-align: center;">(多個答案以;分隔)</p>
                          <textarea name="" id="options" cols="55" rows="4" v-model="item.option"></textarea>
                      </div>
                    </div>
                    <br>
                  </div>
                </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateUnPublished">僅儲存</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updatePublished">儲存並發佈</button>
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
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            num: '',
            name: "",
            description: "",
            startDate:'',
            endDate:'',
            start_date: "",
            end_date: "",
            searchTitle: '',
            searchStartDate: '',
            searchEndDate: '',
            currentPage: 1, //初始化當前頁數為1
            surveyArr: [],
            selectedSurvey: [],
            dataArr: [],
            isLogin: true,
            dataPages: [],
            editArr:[],
            upName:'',
            upDescription:'',
            upStartData:'',
            upEndDate:'',
            upQuestionList:'',
            upNum: 0,
            question:'',
            is_necessary: false,
            optionType:'單選題',
            options:'',
            question_list:[],
            is_published: true,
        };
    },
    mounted() {
        this.search();
    },
    methods: {
      confirmDelete(num) {
      Swal.fire({
        title: '真的要刪除嗎?',
        text: '刪了就回不來囉',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        preConfirm: () => {
          // 在這裡執行你的 Vue 組件方法，並將 item 作為參數傳遞
          return this.deleteSurvey(num)
        },
      })
    },
    goResponsePage(quizNum) {
      this.$router.push({ name: 'Responsive', params: { quizNum: quizNum } });
    },
      updatePublished(){
        axios({
          url:'http://localhost:8080/quiz/update',
          method:"POST",
          headers:{
              "Content-Type": "application/json",
          },
          params:{
            quiz_num:this.upNum
          },
          data: JSON.stringify({
              name:this.upName,
              description:this.upDescription,
              start_date:this.upStartData,
              end_date:this.upEndDate,
              question_list: this.upQuestionList,
              is_published: true,
          })
      })
      .then(res => console.log(res))
      .catch(error => console.error(error))
      
      alert('已更新問卷，狀態為已發佈')
      this.search()
      },
      updateUnPublished(){
        axios({
          url:'http://localhost:8080/quiz/update',
          method:"POST",
          headers:{
              "Content-Type": "application/json",
          },
          params:{
            quiz_num:this.upNum
          },
          data: JSON.stringify({
              name:this.upName,
              description:this.upDescription,
              start_date:this.upStartData,
              end_date:this.upEndDate,
              question_list: this.upQuestionList,
              // is_published: true,  //註解變成false
          })
      })
      .then(res => console.log(res))
      .catch(error => console.error(error))
      
      alert('已更新問卷，狀態為未發佈')
      this.search()
      },

    add(){
        this.question_list.push({
          num: this.question_list.length + 1, 
          title: this.question, 
          necessary: this.is_necessary,
          type: this.optionType, 
          option: this.options,
        })
        //清空欄位
        this.question = ''
        this.optionType = ''
        this.necessary = ''
        this.options = ''
        //回到預設值
        this.optionType = '單選題'
        this.is_necessary = false
    },
    goCreate() {
        this.$router.push('/ManageCreate');
    },
    deleteSelected(){
      this.question_list = this.question_list.filter(item => !item.selected)
    },
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
          this.upStartData = item.startDate
          this.upEndDate = item.endDate
          this.upNum = item.num

          if(this.upQuestionList != ""){
            this.upQuestionList = ""
          }
          this.upQuestionList=JSON.parse(test)
          console.log(this.upQuestionList);

        })
      })
    },
    pagination(data, nowPage) {
        //全部資料長度
        const dataTotal = data.length;
        //每頁顯示筆數
        const pageData = 10;
        //總頁數
        const pageTotal = Math.ceil(dataTotal / pageData);
        //頁碼列表
        this.dataPages = [];
        for (let i = 1; i <= pageTotal; i++) {
            this.dataPages.push(i);
        }
        //當前頁數，從第一頁開始
        let currentPage = nowPage;
        //避免當前頁數超出總頁數
        currentPage = Math.max(1, Math.min(currentPage, pageTotal));
        //每個分頁第一筆
        const minData = (currentPage * pageData) - pageData;
        //每個分頁最後一筆
        const maxData = currentPage * pageData;
        this.dataArr = this.surveyArr.slice(minData, maxData);
    },
    search() {
            this.surveyArr = [];
        axios({
            url: 'http://localhost:8080/quiz/search',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
                quiz_name: this.searchTitle,
                start_date: this.searchStartDate,
                end_date: this.searchEndDate,
                is_login: this.isLogin,
            }
        })
            .then(res => {
            res.data.quizList.forEach(element => {
            const status = this.getStatus(element.startDate, element.endDate, element.published);
                this.surveyArr.push({
                    name: element.name,
                    description: element.description,
                    startDate: element.startDate,
                    endDate: element.endDate,
                    is_published: element.published,
                    question: element.questionStr,
                    num: element.num,
                    status: status,
                });
              });
              this.editArr.push(res.data.quizList)
            this.surveyArr.reverse(); //倒序排列
            this.pagination(this.surveyArr, 1);
        });
    },
    deleteSurvey(num) {
        axios({
            url: 'http://localhost:8080/quiz/delete_quiz',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params: {
                quiz_num_list: num,
            },
        })
            .then((res) => {
            this.search(); // 刪除後重新搜尋資料
        })
            .catch((error) => {
            console.error(error);
        });
        
        this.search()
    },
    getStatus(startDate, endDate, isPublished) {
        const now = new Date();
        const startTime = new Date(startDate);
        const endTime = new Date(endDate);
        if (now < startTime && isPublished) {
            return '尚未開始(已發佈)';
        }
        else if (now < startTime && !isPublished) {
            return '尚未開始(未發佈)';
        }
        else if (now >= startTime && now <= endTime) {
            return '進行中';
        }
        else {
            return '已結束';
        }
    },
    getStatusColor(startDate, endDate, isPublished) {
        const status = this.getStatus(startDate, endDate, isPublished);
            if (status === "尚未開始(已發佈)") {
                return '#5b21b6';
            }
            else if (status === "尚未開始(未發佈)") {
                return '#5b21b6';
            }
            else if (status === "進行中") {
                return '#365314';
            }
            else if (status === "已結束") {
                return '#b91c1c';
            }
            else {
                return 'black';
            }
        },
    },
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
            .iconDelete{
              opacity: 0;
              
              &:hover{
                color: red;
                opacity: 1;
                cursor: pointer;
              }
            }
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
        
        .goRes{
          border: 0;
          outline: none;
          color: blue;
          text-decoration: underline;
          background-color: transparent;
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