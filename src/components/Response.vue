<template>

    <div class="info">
        <table>
            <tr>
                <th>編號</th>
                <th>姓名</th>
                <th>填寫時間</th>
                <th>查看回覆</th>
            </tr>
            <tr>
                <td>#1</td>
                <td>三個字</td>
                <td>2023/12/24 10:01</td>
                <td><a href="#">前往</a></td>
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
    </div>


</template>
<script>
    export default {
        
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
            .pages{
               
            }
        }
    
    </style>