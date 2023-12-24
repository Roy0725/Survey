<template>
    <div class="create">
        <div class="survey">
            <label for="">問卷名稱 :</label>
            <input type="text" class="name">
        </div>
         <br>
         <div class="area">
            <label for="">問卷說明 :</label>
            <textarea name="" id="" cols="80" rows="10" class="block"></textarea>
        </div>   
        <br>
        <div class="start">
            <label for="">開始時間 :</label>
            <input type="date" class="block">
        </div>
        <br>
        <div class="end">
            <label for="">結束時間 :</label>
            <input type="date" class="block">
        </div>
        <br>
        <br>
        <div class="confirm">
            <input type="button" value="取消" class="cancel">
            <input type="button" value="下一步" class="next">
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .create{
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // flex-direction: column;
        padding: 100px;
        
        .name{
            width: 87.5%;
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