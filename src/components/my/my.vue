<template>
    <div class="wrap">
        <!--banner-->
        <div class='user'>
            <div class='userImg'>

            </div>
            <span class='p-nam'>个人账号:</span>
            <span class='p-num'>{{pNum}}</span>

        </div>
        <!--banner-->

        <!--九宫格-->
        <div class="flex-container">
            <router-link class="flex-item" :to="{name:'my-money'}">
                <p>
                    <span class="iconfont iconqianbao1" style="color:#fc8a72"> </span>
                    <span class='text'>我的钱包</span>
                </p>
            </router-link>

            <router-link class="flex-item" :to="{name:'my-complain'}">
                <p>
                    <span class="iconfont iconfankui" style="color:#febb2d"></span>
                    <span class='text'>反馈消息</span>
                </p>
            </router-link>

            <router-link class="flex-item" :to="{name:'my-myplate'}">
                <p>
                    <span class="iconfont iconchepai1" style="color:#25a0e8"></span>
                    <span class='text'>我的车牌</span>
                </p>

            </router-link>
            <router-link class="flex-item" :to="{name:'my-helpcenter'}">
                <p>
                    <span class="iconfont iconbangzhu" style="color:#6bd4da"></span>
                    <span class='text'>帮助中心</span>
                </p>
            </router-link>
             <router-link class="flex-item" :to="{name:'my-mynews'}">
                <p>
                    <span class="iconfont iconmsg-fill" style="color:#b2da17"></span>
                    <span class='text'>我的消息</span>
                </p>
            </router-link>
            <router-link class="flex-item" :to="{name:'my-aboutus'}">
                <p>
                    <span class="iconfont iconguanyuwomen" style="color:#fc8888"></span>
                    <span class='text'>关于我们</span>
                </p>
            </router-link>
        </div>
        <!--九宫格-->

      <div class='logOff' @click='exit'>退出登录</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pNum:localStorage.getItem("phoneNo"),
                url:'../static/image/logo.png'
            }
        },
        methods:{
            exit:function(){
                let index = confirm('确认退出？')
                if(index){
                  window.localStorage.clear();//清空所有的存储数据
                  console.log('清空所有的缓存');
                  this.$router.push({name:`login`})
                }

            }
        },
        mounted() {

            // 在dom文档渲染完毕之后将要执行的函数 在Vue1.0版本中名字为compiled
            /*changeHigh()
            window.addEventListener('resize', changeHigh);

            function changeHigh() {
                let hd = document.getElementsByClassName('hd')[0];
                let ft = document.getElementsByClassName('ft')[0];
                let banner = document.getElementsByClassName('banner')[0];
                let grids = document.getElementsByClassName('grids')[0];
                let cw = window.innerHeight;
                grids.style.height = cw - hd.offsetHeight - banner.offsetHeight - ft.offsetHeight + 'px';
                //console.log( cw , hd.offsetHeight , banner.offsetHeight , ft.offsetHeight );
            }*/
        },
        created() {


        }
    }
</script>

<style scoped lang="less">
    @rem:1080/10rem;
    .wrap{
         position: relative;
         background: linear-gradient( to bottom,#1692dc 0,#1692dc 600/@rem,transparent 600/@rem);
         padding-top: 1/@rem;
         padding-bottom: 200/@rem;
      .logOff{
        margin: 50/@rem auto 0;
        font-size: 50/@rem;
        text-align: center;
        width:270/@rem;
        height: 80/@rem;
        color: #b2b2b2;
      }


    }
    .user{
        position: relative;
        margin: 220/@rem auto 0;
        width: 95%;
        font-size: 17px;
        text-align: left;
        text-indent: 1em;
    }
    .userImg{
        margin-left: 20/@rem;
        height:180/@rem;
        width: 180/@rem;
        border-radius: 10/@rem;
        background: url(../../../static/image/logo.png) no-repeat;
        background-size: contain;
        overflow: hidden;
    }
    .user .p-nam{
        position: absolute;
        font-size: 35/@rem;
        top: 10/@rem;
        left:180/@rem;
        vertical-align: top;
        font-size: 42/@rem;
        color: #ddd;

    }

    .user .p-num{
        position: absolute;
        font-size: 35/@rem;
        top: 90/@rem;
        left:180/@rem;
        vertical-align: top;
        font-size: 54/@rem;
        color: white;

    }

    .flex-container {

        display: flex;//使用弹性盒模型布局，使元素排成一行
        // flex-direction: column-reverse;排成竖的，row 横的；
        flex-wrap: wrap;
        margin: 90/@rem auto 0;
        width: 1000/@rem;
        height: 715/@rem;

        // height: 500/@rem;
        // border: 1px solid black;
        font-size: 25/@rem
    }

   .flex-item {

        width: 470/@rem;//item的大小，外层盒子说了算
        height: 210/@rem;
        margin: 14/@rem;
        border-radius:4px;
        box-shadow:  0 0 20px #ddd;
        font-size: 32/@rem;
        background-color: white;




    }
    .flex-item  p{
    //    border: 1px solid black;
        height: 60/@rem;
        margin-top: 75/@rem;
        line-height: 55/@rem ;
        text-align: left;
        text-indent: 1.5em;
        font-size: 46/@rem;


    }
     .flex-item  .iconfont{
         font-size: 70/@rem
     }
     .flex-item  .text{
         position: relative;
         top:-10/@rem;
         left: 10/@rem;
     }
</style>
