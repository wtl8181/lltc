<template>
    <div id="app">
        <router-view id='content' />
      
        <!--footNav-->
        <footer class="ft" v-show="$route.meta.ftShow==undefined||$route.meta.ftShow">
            <router-link class="link"  :to="{name:'home'}">
                <div class=" svg iconfont  iconhome"></div>
                <p>首页</p>
            </router-link>
         
            <router-link class="link"  :to="{name:'parking'}">
                <div class="svg iconfont icontingche"></div>
                <p>泊位</p>
            </router-link>
            
            <router-link class="link"  :to="{name:'order'}">
                <div class="svg iconfont icondingdan2"></div>
                <p>订单</p>
            </router-link>
            <router-link class="link"  :to="{name:'my'}">
                <div class="svg iconfont iconIcon_wode count"><i class="showNum" v-if="this.pickNum">8</i></div>
                <p>我的</p>
            </router-link>
           
        </footer>
        <!--footNav-->
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                title:'路边停车系统',
                pickNum:true,
               
            }
        },
        computed:{
           
        },
        created(){
            

         
        }
    }
</script>

<style scoped lang="less">
    @rem:1080/10rem;    //这里的1080代表原设计图的宽度
    @font-face {    //引入字体包
        font-family: "webfontSourceHanSansSC";
        src: url(../static/字体包/SourceHanSansCN-Light.ttf);
    } 
    @font-face {
	    font-family: 'lato';
	    src: url(../static/字体包/Lato-Light.ttf);
    }
    
    #app {
        position: relative;
        width: 100%;
        height: 100%;
        font-family: "lato", "SourceHanSansSC-Light", "Source-Han-Light","Source Han Sans CN","webfontSourceHanSansSC"; 
        
        
    }
    
    
    .ft{
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        height:146/@rem;
        border-top: 1/@rem solid #ddd;
        // border:1px solid black;
        background-color: #f3f3f3;
        display: flex;
        text-align: center;

        
        .link{
            display: block;
            flex: 1;
            text-decoration: none;
            color:#b2b2b2
           

        }
        .link .svg{
            margin: 20/@rem auto 5/@rem;
            font-size: 65/@rem;
            
        }

        .link p{
            color: inherit;
            font-size: 38/@rem;
            line-height: 1;
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
            
        }
        .count{
            position: relative;
        }
        .count .showNum{
            position: absolute;
            margin: auto;
            width: 40/@rem;
            height: 40/@rem;
            line-height: 40/@rem;
            background: red;
            color: #fff;
            font-size: 12/@rem;
            border-radius: 50%;
            font-style: normal;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.2s;
        }
        .fade-enter, .fade-leave-to , .fade-leave-active below version  {
            opacity: 0;
        }

    }
</style>
