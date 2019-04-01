<template>
    <div class='wrap'>
        <h2>登录界面</h2>
        <router-link to="home">
            <button>登录</button>
        </router-link>
        
    </div>
</template>

<script>
    export default{
        data(){
            return {
                nextLocation:'home',
                //以这个变量指定登录以后出现的界面
            }
        },
    }
            
    
</script>

<style scoped lang="less">
    @rem:750/10rem;
    
</style>
