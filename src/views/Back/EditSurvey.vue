<template>
    <div>
        <h1>安安</h1>
    </div>
</template>
<script>
export default {
    data(){
        return{
            surveyArr:[]
        }
    },
    methods:{
        search() {
            this.surveyArr = [];
            axios({
                url: 'http://localhost:8080/quiz/search',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                data: {
                    quiz_name: this.searchTitle,
                    start_date: this.searchStartDate,
                    end_date: this.searchEndDate,
                    is_login: this.isLogin,
                }
            })
                .then(res => {
                res.data.quizList.forEach(element => {
                    const status = this.getStatus(element.startDate, element.endDate, element.published);
                    this.surveyArr.push({
                        name: element.name,
                        description: element.description,
                        startDate: element.startDate,
                        endDate: element.endDate,
                        is_published: element.published,
                        question: element.questionStr,
                        num: element.num,
                        status: status,
                    });
                });
                this.surveyArr.reverse(); //倒序排列
                this.pagination(this.surveyArr, 1);
            });
        },
        update(){
            
        },
    }
}
</script>
<style lang="scss" scoped>
    
</style>