<template>
    <div class="wrap">

        <div class='item'>
            <div>内容描述:</div>
            <textarea  cols="30" rows="10"
             placeholder="*在这里输入您要反馈的内容吧！" v-model="detail"></textarea>
        </div>
        
        <div class=' item'>
            <div>联系方式:</div>
        <textarea cols="30" rows="1"
            placeholder="*QQ/电话/邮箱" v-model="contact"></textarea>
        </div>
        <button @click="submit">提交</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'466',
            detail:'',
            contact:''
        }
    },
    methods:{
        submit: function(){
            console.log(this.detail,this.contact)
        }
    }
    
}
</script>


<style scoped lang="less">
    @rem:1080/10rem;
    .wrap{
        background-color: #f3f3f3;
        height:100%;
        overflow: hidden
        
    }
    .item div {//标题
        font-size: 48/@rem;
        text-align: left;
        text-indent: 1em;
        // border:1px solid black;
        height: 120/@rem;
        line-height: 120/@rem;
        color: black;

    }
    .item textarea{
        width: 100%;
        border: none;
        font-size: 42/@rem;
        padding: 50/@rem
    }
    button{
        width: 1020/@rem;
        height:135/@rem;
        border: none;
        border-radius: 10/@rem;
        background-color: #fb8972;
        color: white;
        font-size: 48/@rem
    }
    
    
</style>