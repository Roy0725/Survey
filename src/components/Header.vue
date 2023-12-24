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
        
        a{
            margin: 0px 10px;
            text-decoration: none;
            cursor: pointer;
            font-size: 36px;
            opacity: 0;

            &:hover{
                opacity: 1;
                transform: scale(1.2);
                color: black;
            }
        }
    }
</style>