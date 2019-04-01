<template>
    <div class="wrap">
        <h2>我的消息页</h2>
        <p>总数：{{total}}</p>
        <son 
            @increase='getTotal'
            @decrease='getTotal'>
        </son>
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
        'son':{
            template:`
                <div>
                    <button @click='plus'>+1</button>
                    <button @click='minus'>-1</button>
                </div>
            
            `,
            data(){
                return {
                    counter:0
                }
            },
            methods:{
                plus:function(){
                    this.counter++;
                    this.$emit('increase',this.counter)
                    
                },
                minus:function(){
                    this.counter--;
                    this.$emit('decrease',this.counter);//(发射的事件名，发射的参数)
                    
        }
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
        background-color: #f3f3f3;
        height:100%;
        overflow: hidden
        
    } 
</style>