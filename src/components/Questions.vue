<template>
    <div class="all">
    <div class="check">
        <div class="top">
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

            <div class="options">
                <div class="left">
                    <label for="options">選項 :</label>
                </div>
                <div class="right">
                    <p>(多個答案以;分隔)</p>
                    <textarea name="" id="options" cols="100" rows="4" v-model="options"></textarea>
                </div>
                <div class="inputs">
                    <input type="button" v-if="!editMode" value="加入" @click="add">
                    <div class="update">
                        <input type="button" v-if="editMode" value="編輯" @click="update">
                    </div>
                    <div class="chancelEdit">
                        <input type="button" v-if="editMode" value="取消" @click="cancelEdit">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="delete">
        <div class="icon">
            <i class="fa-solid fa-trash-can" @click="deleteSelected"></i>
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
                <tr v-for="(q, index) in question_list" :key="q.num">
                    <td><input type="checkbox" v-model="q.selected"></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ q.title }}</td>
                    <td>{{ q.type }}</td>
                    <td><input type="checkbox" :checked="q.necessary" disabled></td>
                    <td @click="edit(q)">編輯</td>
                </tr>
            </table>
        </div>
        <div class="confirm">
                <input type="button" value="上一頁" @click="$emit('prevStep')" style="margin: 10px">
                <input type="button" value="送出" @click="nextStep" style="margin: 10px 50px 10px 20px;">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                question:'',
                optionType:'單選題', //預設單選
                is_necessary: false, //是否必填
                options:'',
                question_list:[],     //儲存新增的問題
                editMode: false,  //顯示加入或編輯，預設加入
                editingQuestion: null,
            }
        },
        methods:{
            optionTypeChange(){
                if(this.optionType === '單選題' || this.optionType === '多選題'){
                     // 將選項以分號分隔並排序
                    const sortedOptions = this.options.split(';').filter(option => option.trim() !== '').sort();
                    // 將排序後的選項重新組合成字串
                    this.options = sortedOptions.split(';');
                }
            },
            add(){
                this.question_list.push({
                    num: this.question_list.length + 1, 
                    title: this.question, 
                    necessary: this.is_necessary,
                    type: this.optionType, 
                    option: this.options,
                })
                //清空欄位
                this.question = ''
                this.optionType = ''
                this.necessary = ''
                this.options = ''
                //回到預設值
                this.optionType = '單選題'
                this.is_necessary = false
            },
            edit(question){
                this.editMode = true
                this.editingQuestion = { ...question }; // 複製問題物件以避免直接修改原始資料
                // 將問題內容填充到表單欄位中
                this.question = this.editingQuestion.title;
                this.optionType = this.editingQuestion.type;
                this.is_necessary = this.editingQuestion.necessary;
                this.options = this.editingQuestion.options;
                
            },
            cancelEdit() {
                this.editMode = false;
                this.editingQuestion = null;
                // 清空表單欄位
                this.question = '';
                this.optionType = '單選題';
                this.is_necessary = false;
                this.options = '';
            },
            update() {
            // 檢查表單是否有效，這裡假設您有一些表單驗證的邏輯
                if (this.validateForm()) {
                    // 更新原始資料
                    this.editingQuestion.title = this.question;
                    this.editingQuestion.type = this.optionType;
                    this.editingQuestion.necessary = this.is_necessary;
                    this.editingQuestion.options = this.options;

                    // 清空表單欄位
                    this.question = '';
                    this.optionType = '單選題';
                    this.is_necessary = false;
                    this.options = '';

                    // 退出編輯模式
                    this.editMode = false;
                    this.editingQuestion = null;
                }
            },
            // 新增表單驗證方法
            validateForm() {
                // 您可以根據實際需求添加表單驗證邏輯
                // 例如，確保問題標題和類型是有效的
                return this.question.trim() !== '' && this.optionType.trim() !== '';
            },
            deleteSelected(){
                this.question_list = this.question_list.filter(q => !q.selected)
            },
            delete(questionId){
                //找到要刪除之問題的索引位置
                const index = this.question_list.findIndex(q => q.id === questionId)
                //若有找到，將其刪除
                if(index !== -1){
                    this.question_list.splice(index, 1)
                }
            },
            nextStep(){
                
                this.$emit('nextStep', {question_list: this.question_list})
            }
        }
    }
</script>
<style lang="scss" scoped>
.all{
position: relative;
    .check{
        padding: 60px;
        
        .top{
            
            .input{
                width: 65.5%;
                margin: 0px 50px;
            }
            .select{
                margin-right: 40px;
            }
            .checkbox{
                margin-right: 7px;
            }
        }
        .options{
            display: flex;
            margin-top: 20px;
            align-items: center;
            .left{
                margin-right: 50px;
            }

            .inputs{
                width: 70px;
                height: 40px;
                margin: 50px;
                display: flex;
                
                input{
                    width: 70px;
                    height: 40px;
                }
                .update{
                    width: 70px;
                    height: 40px;
                    margin-right: 10px;
                }
                .chancelEdit{
                    width: 70px;
                    height: 40px;
                }
            }
        }
    }
    .delete{
        padding: 60px;
        margin-top: 60px;
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
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    
}
</style>