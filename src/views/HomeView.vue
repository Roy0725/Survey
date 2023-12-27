<template>
<div class="login">

    <label for="account">帳號</label>
    <input type="text" v-model="account" id="account" required>

    <label for="password">密碼</label>
    <input type="password" v-model="password" id="password" required>


  <div class="button">
    <input type="button" class="button1" @click="login()" value="登入">
    <input type="button" class="button2" @click="goSurvey" value="填寫問卷">
</div>
</div>

</template>
<script>
import axios from 'axios'

export default {
  data(){
    return{
      account:"",
      password:"",
      
    }
  },
  methods:{
    goSurvey(){
      this.$router.push('/Survey')
    },
    login(){
      

        axios({
          url:'http://localhost:8080/api/login',
          method:"POST",
          headers:{"Content-Type": "application/json"},
          data:{
              account:"",
              password:"",
          }
      }).then(res=>console.log(res))
            
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