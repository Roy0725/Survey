<template>
    <div class="top">
      <div class="name">
        <p>問卷名稱 :</p>
        <input type="text">
      </div>
      
      <div class="time">
        <p>開始時間 :</p>
        <input type="date">
        <p class="at">到</p>
        <input type="date">
        <button type="button">搜尋</button>
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
        <tr>
          <td></td>
          <td @click=goQuestion() class="survey" style="cursor: pointer;">大概有這麼高</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    
    <div class="pages">
      <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>
    </template>
    <script>
    export default {
      data(){
        return{
          
        }
      },
      methods:{
        goQuestion(){
          this.$router.push('/Question')
        }
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
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: -50px;
    }
    </style>