<template>
    <div class="all">
        <div class="time">
            <p>2023/12/30-2024/01/01</p>
        </div>
        <div class="title">
            <h1>問卷題目</h1>
        </div>
        <div class="questions">
            <div class="left">
                <p>1.第一個題目</p>
                <p>統計圖</p>
            </div>
            <div class="right">
                <p>80%</p>
                <p>第一個選項</p>
                <P>總票數</P>
            </div>
        </div>
    </div>
    </template>
    <script>
    export default {
        
    }
    </script>
    <style lang="scss" scoped>
        .all{
            width: 100%;
            height: 100%;
            padding: 20px;
            .time{
                display: flex;
                justify-content: flex-end;
            }
            .title{
                text-align: center;
            }
            .questions{
                display: flex;
                justify-content: space-around;
                margin-top: 50px;
                .left{

                }
                .right{
                    margin-top: 70px;
                    width: 50%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    p{
                        
                    }
                }
            }
        }
    </style>