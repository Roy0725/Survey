<template>
    <div class="all">
    <div class="check">
        <div class="top">
            <div class="question">
                <label for="">問題 :</label>
                <input type="text" class="input">
                <select name="" id="" class="select">
                    <option value="">單選題</option>
                    <option value="">複選題</option>
                    <option value="">簡答題</option>
                </select>
                <input type="checkbox" class="checkbox">必填
            </div>

            <div class="options">
                <div class="left">
                    <p>選項 :</p>
                </div>
                <div class="right">
                    <p>(多個答案以;分隔)</p>
                    <textarea name="" id="" cols="60" rows="3"></textarea>
                </div>
                <input type="button" value="加入">
            </div>
        </div>
            
        
    </div>
    <div class="delete">
        <div class="icon">
            <i class="fa-solid fa-trash-can"></i>
        </div>
        <br>
            <table>
                <tr>
                    <th></th>
                    <th>編號</th>
                    <th>內容</th>
                    <th>問題種類</th>
                    <th>必填</th>
                    <th>編輯</th>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>#1</td>
                    <td>這裡比旁邊那個問題種類寬多了</td>
                    <td>三個字</td>
                    <td><input type="checkbox"></td>
                    <td><a href="#">編輯</a></td>
                </tr>
            </table>
        </div>
        <div class="confirm">
                <input type="button" value="上一步">
                <input type="button" value="送出">
        </div>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style lang="scss" scoped>
.all{
position: relative;
    .check{
        padding: 60px;
        
        .top{
            
            .input{
                width: 60%;
                margin: 0px 50px;
            }
            .select{
                margin-right: 20px;
            }
            .checkbox{
                margin-right: 7px;
            }
        }
        .options{
            display: flex;
            margin-top: 20px;
            position: absolute;
            .left{
                margin-right: 50px;
            }
            input{
                position: absolute;
                right: -150px;
                top: 55px;
                width: 70px;
                height: 40px;
            }
        }
    }
    .delete{
        padding: 60px;
        margin-top: 40px;
        i{
            cursor: pointer;
            font-size: 24pt;
            margin-left: 10px;
        }
        table{
            width: 100%;
            
            tr{
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
    }
    .confirm{
        width: 150px;
        position: absolute;
        right:7%;
        bottom: -40%;
        display: flex;
        justify-content: space-around;
    }
    
}
</style>