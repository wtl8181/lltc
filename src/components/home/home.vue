
<template>
    <div class="hwrap">
        <router-link  :to="{name:'parking'}">
              <img class="toPark" src="static\image\停车按钮.png" alt="我要停车" width="50%" height="50%">
        </router-link>
        <router-link  :to="{name:'parking'}">
              <div class='hbt hbt1'>钱包</div>
        </router-link>
        <router-link  :to="{name:'parking'}">
              <div class='hbt hbt2'>我的消息</div>
        </router-link>

    </div>
</template>

<script>
    export default{
        
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    
    .toPark{
        display: block;
        margin: 150/@rem auto 0;
    }
    .hbt{
        margin:  auto ;
        box-sizing: border-box;
        width: 350/@rem;
        height: 75/@rem;
        line-height: 70/@rem;
        border-radius: 10/@rem;
        font-size: 32/@rem;
        color: #1492db

    }
    .hbt1{
        margin-top: 100/@rem;
        border:2px solid #1492db;
        
    }
    .hbt2{
        margin-top: 50/@rem;
        background-color:  #1492db;
        color: white
        
    }
</style>
