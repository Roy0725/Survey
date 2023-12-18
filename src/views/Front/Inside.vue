<template>

    <div class="title">
        <h1>探討安樂死</h1>
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

            <label for="">沒有尊嚴</label>
            <input type="radio" v-model="radioText" name="reason">

            <label for="">已無遺憾</label>
            <input type="radio" v-model="radioText" name="reason">
            
            <label for="">不想拖累家人</label>
            <input type="radio" v-model="radioText" name="reason">
            
            <label for="">想自己選擇離去的方式</label>
            <input type="radio" v-model="radioText" name="reason">
            
            <li>請說明理由</li>
            <textarea name="" id="" cols="30" rows="10"></textarea>

            <li>你是從哪些管道了解安樂死的</li>

            <label for="">官方網站</label>
            <input type="checkbox" name="pipe">
            
            <label for="">親友</label>
            <input type="checkbox" name="pipe">
            
            <label for="">社群平台</label>
            <input type="checkbox" name="pipe">
            
            <label for="">廣告</label>
            <input type="checkbox" name="pipe">
            
        </ol>
    </div>
</div>

    <div class="confirm">
        <input type="button" @click="cancel()" value="取消">
        <input type="button" value="確定">
    </div>
</template>
<script>
export default {
    data(){
        return{
            radioText:"",
            checkText:[],
        }
    },
    methods:{
        cancel(){
            this.$router.push('/Survey')
        }
    }
}
</script>
<style lang="scss" scoped>
    

    .content{
        margin: 20px 100px;
    }
    .container{
        display: flex;
        flex-direction: column;

        .info{
            display: flex;
            flex-direction: column;

            .set{
                display: flex;
                flex-direction: column;
            }
            input{
                width: 800px;
                // height: 0px;
            }
        }
    }
</style>