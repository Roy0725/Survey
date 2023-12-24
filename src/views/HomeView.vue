<template>
<div class="login">

    <label for="">帳號</label>
    <input type="text">

    <label for="">密碼</label>
    <input type="password">


  <div class="button">
  <button type="button" class="button1">登入</button>
  <button type="button" class="button2" @click="goSurvey">填寫問卷</button>
</div>
</div>

</template>
<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    goSurvey(){
      this.$router.push('/Survey')
    }
  }
}
</script>
<style lang="scss" scoped>

*{
  margin: 0;
  padding: 0;
}

.login{
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px;

  label{
    margin-top: 20px;
  }
  .button{
    margin: 30px;
    margin-left: 5px;

    .button1{
      position: absolute;
      left: 15px;
      bottom: 0;
    }
    .button2{
      position: absolute;
      right: 15px;
      bottom: 0;
    }
  }
}

</style>