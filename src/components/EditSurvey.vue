<template>
    <div class="create">
        <div class="survey">
            <label for="name">問卷名稱 :</label>
            <input type="text" class="name" v-model="name">
        </div>
        <br>
         <div class="area">
            <label for="description">問卷說明 :</label>
            <textarea name="" id="" cols="69" rows="4" class="block" v-model="description"></textarea>
        </div>   
        <br>
        <div class="start">
            <label for="start_date">開始時間 :</label>
            <input type="date" class="block" v-model="start_date">
        </div>
        <br>
        <div class="end">
            <label for="end_date">結束時間 :</label>
            <input type="date" class="block" v-model="end_date">
        </div>
        <br>
        <div class="question">
            <label for="question">問題 :</label>
            <input type="text" class="input" v-model="question">
            <select name="" id="" class="select" v-model="optionType" @change="optionTypeChange">
                <option value="單選題">單選題</option>
                <option value="複選題">複選題</option>
                <option value="簡答題">簡答題</option>
            </select>
            <input type="checkbox" class="checkbox" v-model="is_necessary">必填
        </div>
        <br>
        <div class="options">
            <div class="left">
                <label for="options">選項 :</label>
            </div>
            <div class="right">
                <p>(多個答案以;分隔)</p>
                <textarea name="" id="options" cols="30" rows="4" v-model="options"></textarea>
            </div>
            <div class="inputs">
                <!-- <input type="button" v-if="!editMode" value="加入" @click="add"> -->
                <div class="update">
                    <input type="button" value="編輯">
                </div>
                <div class="chancelEdit">
                    <input type="button" value="取消">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        value: Object,
    },
    data(){
        return{
            name:this.value ? this.value.name: "",
            description: this.value ? this.value.description: "",
            start_date: this.value ? this.value.start_date: "",
            end_date: this.value ? this.value.end_date: "",
            question: this.value ? this.value.question: "",
            optionType: this.value ? this.value.optionType: "",
            is_necessary: this.value ? this.value.is_necessary: "",
            options: this.value ? this.value.options: "",
            // editMode: false,
        }
    },
    mounted(){
        // console.log(this.surveyArr);
    }
}
</script>
<style lang="scss" scoped>
    .create{
        padding: 10px;
        // width: 100%;
        // height: 100%;

        .survey{
            display: flex;
            align-items: baseline;

            input{
                margin-left: 10px;
                width: 30vw;
            }
        }

        .area{
            display: flex;
            align-items: baseline;

            textarea{
                margin-left: 10px;
            }
        }

        .start{
            display: flex;
            align-items: baseline;

            input{
                margin-left: 10px;
            }
        }

        .end{
            display: flex;
            align-items: baseline;

            input{
                margin-left: 10px;
            }
            
        }

        .question{
            display: flex;
            align-items: baseline;
            .input{
                width: 22vw;
                margin-left: 10px;
            }
            .select{
                margin-left: 40px;
            }
            .checkbox{
                margin-left: 20px;
            }
        }

        .options{
            display: flex;
            align-items: baseline;
        }
    }
</style>