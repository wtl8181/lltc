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
            if(this.detail&&this.contact){
               this.$ajax({
                             url: 'api/mine/feedback/submit',
                             method: 'post',
                             data: {
                               content:this.detail,
                               contactInfo:this.contact,
                               userId:this.$store.state.userId
                             },
                             transformRequest: [function (data) {
                               // 以表单形式发送数据
                               let ret = ''
                               for (let it in data) {
                                 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                               }
                               return ret
                             }],
                             headers: {
                               'Content-Type': 'application/x-www-form-urlencoded'
                             }
                           }).then((res) =>{
                               if(res.data.success===true){
                                 alert('提交成功，谢谢您的反馈！')
                               }else{
                                 alert('网络错误！')
                               }
                           }).catch((err) =>{
                             console.log(err);
                           });

            }

        }
    }

}
</script>


<style scoped lang="less">
    @rem:1080/10rem;
    .wrap{
        background-color: #f3f3f3;
        height:100%;
        padding-bottom: 20/@rem;

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
        font-size: 50/@rem;
        padding: 50/@rem
    }
    button{
        display: block;
        margin: 30/@rem auto;
        width: 1020/@rem;
        height:135/@rem;
        border: none;
        border-radius: 10/@rem;
        background-color: #fb8972;
        color: white;
        font-size: 48/@rem
    }


</style>
