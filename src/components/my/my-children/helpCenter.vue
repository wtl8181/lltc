<template>
    <div class="wrap">
        <p class='title'>问题类别：</p>
        <div class='container'>
            <question class='item' q-type='泊位问题'></question>
            <question class='item' q-type='计费问题'></question>
            <question class='item' q-type='车牌问题'></question>
            <question class='item' q-type='订单问题'></question>
            <question class='item' q-type='缴费问题'></question>
            <question class='item' q-type='其他问题' style="opacity:0"></question>
        </div>
        <p class='title'>客服电话：</p>
        <p class='phoneNumber'>
            <a href="tel:0756-12345678">0756-12345678</a>
        </p>
        <p class='title'>联系巡检：</p>
        <input  class='positionNumber' type="text"  
                placeholder="请输入您所在的地面泊位号，获取联系方式">
        
       
    </div>
</template>
<script>

export default {
    data(){
        return{
            total:0
        }
    },
    components:{//注册局部组件
        'question':{
            
            template:`
                <div>
                    {{qType}}
                </div>
            
            `,
            props:['qType'],
            data(){
                return {
                    counter:0
                }
            },
            methods:{
                
            }
        }

    },
    methods:{
        getTotal:function(total){
            console.log(total)
            this.total = total
        }
    }
 
}
</script>



<style scoped lang="less">
    @rem:1080/10rem;
    .wrap{
        height:100%;
        overflow: hidden;
        background-color: #f3f3f3
        
    } 
    .title{
        font-size: 48/@rem;
        line-height: 130/@rem;
        text-indent: 1em;

    }
    .phoneNumber{
       
        font-size: 48/@rem;
        line-height: 150/@rem;
        text-indent: 1em;
        text-decoration: underline;
        background-color: white;
    }
    .positionNumber{
        position: relative;
        width: 100%;
        border: none;
        text-indent: 6em;
        line-height: 150/@rem;
        background-color: white;
        
    }
       
    
    .container{
        display: flex;
        flex-wrap: wrap;
        width: 99%;
        height: 450/@rem;
       
    }
    .container .item{
        margin: auto;
        width:490/@rem;
        height: 110/@rem;
        border-radius: 10/@rem;
        font-size: 48/@rem;
        color: #888888;
        text-align: center;
        line-height: 110/@rem;
        background-color: white;
    }

    
</style>