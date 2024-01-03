<template>
<div class="headerShow">
    <router-link to="/Survey">
        <a alt="前台" class="front">前台</a>
    </router-link>
    <router-link to="/Manage">
        <a alt="後台" class="back">後台</a>
    </router-link>
</div>
</template>
<script>
import {RouterLink, RouterView} from 'vue-router'
export default {
    data(){
        return{
            
        }
    },
    methods:{
        // goFront(){
        //     this.$router.push('/')
        // },
        // goBack(){
        //     this.$router.push('/Manage')
        // }
    },
    components:{
        RouterLink
    }
}
</script>
<style lang="scss" scoped>
    .headerShow{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #384F77;
        a{
            margin: 0px 10px;
            text-decoration: none;
            cursor: pointer;
            font-size: 36px;
            color: rgb(236, 232, 232);
        }
    }
</style>