<template>
    <div class="info">
        <table>
            <tr>
                <th>編號</th>
                <th>姓名</th>
                <th>填寫時間</th>
                <th>查看回覆</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
                <td>#{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.writeDateTime }}</td>
                <td><a href="#">前往</a></td>
            </tr>
        </table>
    </div>
    <div class="pages">
      <i class="fa-solid fa-angles-left" @click="pagination(list, currentPage - 1)"></i>
      <p v-for="pageNumber in dataPages" :key="pageNumber" @click="pagination(list, pageNumber)">{{ pageNumber }}</p>
      <i class="fa-solid fa-angles-right" @click="pagination(list, currentPage + 1)"></i>  
    </div>
</template>
<script>
import axios from 'axios';

    export default {
      props: ['quizNum'],

      data(){
        return{
            surveyArr:[],
            list:[],
            writerId:'',
            name:'',
            writeDateTime:'',
            useList:[],
            dataPages: [],
        }
      },
      mounted(){
        this.feedback()
      },
      methods:{
        feedback(){
            axios({
                url: 'http://localhost:8080/writer/find_by_quiz_num',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                params:{
                    quiz_num: this.quizNum
                }
            })
            .then(res => {
                this.list = res.data.writerList
                this.list.forEach(item=>{
                    let time=new Date(item.writeDateTime)
                    item.writeDateTime= time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
                })
                this.list.reverse()
            })
            .catch((error) => {
            console.error('Error fetching results:', error);
            });
            // console.log(list);
            this.pagination(this.list, 1)
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
        this.dataArr = this.list.slice(minData, maxData);
    },
    },
    }
</script>
<style lang="scss" scoped>

  .info{
    width: 100%;
    height: 100%;
    padding: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    table{
      width: 100%;
        th{
            text-align: center;
            border: 2px solid black;
            border-radius: 5px;
          }
          td{
            text-align: center;
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