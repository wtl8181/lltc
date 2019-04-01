<template>

   <div>
       <p></p>
   </div>
   
</template>

<script>

    export default {
        data() {
            return {
                newsDetails:{},
                num:0,
                index:0
            }
        },
        created(){
           
        }
    }    
</script>

<style scoped lang="less">
    @rem:750/10rem;
    div{
        box-sizing: border-box;
        width:375px;
        height: 640/@rem;
        border:  1px solid deeppink;
    }
    
</style>
