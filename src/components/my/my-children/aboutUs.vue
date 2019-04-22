<template>
    <div class="wrap">
        <div class="logo"></div>
        <div class="version">V 1.1.1</div>
        <div class="text" v-html='text'></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           text:""
        }
    },
    methods:{
        exit:function(){
            alert('确定退出？')
        }

    },
    mounted(){
        this.$ajax.get('api/mine/about_us/get')
        .then((res)=>{
            this.text=res.data.data
        })
        .catch(function (error) {
        console.log(error)
        });
    }

}
</script>


<style scoped lang="less">
    @rem:1080/10rem;
    .wrap{
      padding-bottom: 20/@rem;
    }
    .logo{
        margin: 145/@rem auto 0;
        width: 430/@rem;
        height: 210/@rem;
        background-image: url(../../../../static/image/logo.png);
        background-position: center;
        background-repeat: no-repeat;
        // border: 1px solid black
    }
    .version{
        margin: 80/@rem auto 0;
        width: 160/@rem;
        height: 55/@rem;

        font-size: 48/@rem
    }
    .text{
        margin: 80/@rem auto 0;
        font-size: 42/@rem;
        // border: 1px solid black;
        font-size: 42/@rem;
        width:960/@rem;
        height:700/@rem;
        text-indent: 2em;
        color: #b2b2b2;
    }


</style>
