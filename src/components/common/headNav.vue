<template>
    <div>
       
            <mt-header >
                <router-link :to='{name:home}'     slot="left"><!--匹配规则为对象-->
                    <mt-button icon="back">上一个</mt-button>
                    {{title}}
                </router-link>

                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
       
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title:'home'
            }
        },
        props:['title'], // 接收来自父级的参数
        created(){
            //console.log( this.$route.query )

        },
        methods:{
            goBack(){

            }
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    header{
        height: 80/@rem;
        background: #3c3f41;
        color: white !important;
        font-size: 35/@rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        letter-spacing: 2px;
        text-align: center;
        a{

            width: 2rem;
            color: white !important;

        }
    }
</style>
