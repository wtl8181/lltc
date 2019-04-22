<template>
    <div class="wrap">
        <p class='title'>问题类别：</p>
        <div class='container'>
            <question class="question"  @click.native="toDetail(value)"
                      v-for="(value,key) in qList":key="key"
                      :q-name="value.name">
                      <i class="iconfont iconqianjin"></i>
            </question>
            <!--在prop里面传递动态数据;需要v-bind;给vue组件绑定事件时候，必须加上native -->
        </div>
        <p class='title'>客服电话：</p>
        <p class='phoneNum'>
            <a href="tel:0756-12345678">0756-12345678</a>
        </p>
        <p class='title'>联系巡检：</p>
        <input  class='positionNum' type="number"  v-model="parkingNo"
                placeholder="请输入您所在的地面泊位号，获取联系方式"/>
        <button @click="getInfo">获取</button>

        <div class="result" v-show="isShow">
          <p>获取结果
            <i class="iconfont iconguanbi" @click="close">
            </i></p>
          <ul>
            <li>巡检编号:&nbsp;
              <b>{{checkNo}}</b>
            </li>
            <li>巡检电话:&nbsp;
              <a :href="dialTel">{{tel}}</a>
            </li>
          </ul>
        </div>


    </div>
</template>
<script>

export default {
    data(){
        return{
            qList:[],
            parkingNo:'',
            tel:'',
            checkNo:'',
            isShow:false
        }
    },
    methods:{
    toDetail:function(value){
      this.$router.push({name:'helpdetail',params:{ category: value.id }})
    },
    getInfo:function(){
           if(this.parkingNo){
             this.$ajax({
               url: 'api/mine/inspector/get',
               method: 'post',
               data: {
                 parkingNo:this.parkingNo
               },
               transformRequest: [function (data) {
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
               if(res.data.msg){
                 alert(res.data.msg)
               }else{
                 // console.log(res.data.data);
                 this.tel =  res.data.data.mobile;
                 this.checkNo = res.data.data.code;
                 this.isShow = true;
               };
             }).catch((err) =>{
               console.log(err);
             });
           }else{
             alert('请输入泊位号！')
           }

    },
    close:function(){
      this.isShow = false
    }
  },
    computed:{
      dialTel(){
        return  'tel:'+this.tel
      }
    },
    components:{//注册局部组件
        'question':{
            template:`<div>{{qName}}<slot></slot></div>`,
            props:['qName'],
            data(){
                return {
                }
            },
            // mounted(){
            //   console.log('q')
            // },
          methods:{

          },

        }

    },

    mounted(){
       this.$ajax.get('api//mine/dictionary/list', {
          params: {
            category: 1
          }
        }).then((res)=>{
            this.qList = res.data.data
        }).catch(function (err) {
            console.log(err);
       });
    }

}
</script>



<style scoped lang="less">
    @rem:1080/10rem;
    .wrap{
        position: relative;
        height:100%;
        padding-bottom: 20/@rem;
        background-color: #f3f3f3;
        button{
            display: block;
            margin: 30/@rem auto;
            width: 1020/@rem;
            height:135/@rem;
            border: none;
            border-radius: 10/@rem;
            background-color: #fb8972;
            color: white;
            font-size: 48/@rem;

          }
        .result{
          position: fixed;
          bottom: 0;
          height: 400/@rem;
          width: 100%;
          background-color: white;
          p{
            position: relative;
            font-size: 60/@rem;
            font-weight: bold;
            text-indent: 0.5em;
            line-height: 160/@rem;
            i{
              position: absolute;
              right: 0.5em;
              color: #ddd;
              font-weight: normal;
              font-size: inherit;
            }
          }
          ul{

            font-size: 50/@rem;
            li{
               margin: 20/@rem 0;
               text-indent: 0.5em;
               color: #888888;
               a{
                 color: #1592db;
                 font-weight: bolder;
                 text-decoration: underline;
               }
               b{
                 color: black;
               }
              }

          }
        }

    }
    .title{
        font-size: 48/@rem;
        line-height: 130/@rem;
        text-indent: 1em;
    }
    .phoneNum{

        font-size: 48/@rem;
        line-height: 150/@rem;
        text-indent: 1em;
        text-decoration: underline;
        background-color: white;
    }
    .positionNum{
        position: relative;
        width: 100%;
        border: none;
        text-indent: 2em;
        line-height: 150/@rem;
        font-size: 45/@rem;
        background-color: white;

    }
    .container{
        display: flex;
        flex-wrap: wrap;
        width: 99%;
       .question{
        position: relative;
        margin: 0 auto 15/@rem;
        width:490/@rem;
        height: 110/@rem;
        border-radius: 10/@rem;
        font-size: 44/@rem;
        color: #888888;
        text-align: center;
        line-height: 110/@rem;
        background-color: white;
        i{
          position: absolute;
          right: 20/@rem;
          color: #ddd;
         }
       }
    }


</style>
