<template>
    <div class='wrap'>
      <img class="logo" src="../../../static/image/logo.png" width="100%" height="100%"/>
      <p  class="phoneT">手机号</p>
      <input class="phone" type="number" placeholder="请输入手机号" v-model="phoneNo"
             oninput="if(value.length>11)value=value.slice(0,11)"/>
      <p>验证码</p>
      <input class="psw"   type="number"  placeholder="请输入验证码" v-model="smsCode"
             oninput="if(value.length>6)value=value.slice(0,6)"/>
      <div class="protocol">
        <i class="icontick iconfont" :class="{selected:isAgreed}" @click="agree"></i>
        &nbsp;我已阅读并同意
        <router-link :to="{name:'protocol'}"><span>《用户使用协议》</span></router-link>
      </div>
      <button @click="logIn" ></button>


    </div>
</template>

<script>
    export default{
        data(){
            return {
              phoneNo:'',
              smsCode:'',
              isAgreed:false
            }
        },
        methods:{
          logIn(){
            let isPhone = /^1\d{10}$/.test(this.phoneNo);
            let isCode = /^\d{6}$/.test(this.smsCode);
            if(isPhone && isCode && this.isAgreed){
               this.$ajax({
                             url: 'api/login/login',
                             method: 'post',
                             data: {
                               gzhOpenid:'666',//暂时不管openid
                               code:this.smsCode,
                               mobile:this.phoneNo
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
                             if(res.data.data){
                               console.log('登录成功获取的id为'+res.data.data)
                               localStorage.setItem("userId", res.data.data);//缓存id
                               localStorage.setItem("phoneNo", this.phoneNo)
                               localStorage.setItem("islogin", `true`);//打开路由权限
                               this.$router.push({name:'home'});
                             };
                           }).catch((err) =>{
                             console.log(err);
                           });



            }else{
              alert(
                '请检查输入的信息'
              )
            }

          },
          agree(){
            this.isAgreed=!this.isAgreed
          }
        },
        created(){
          this.$store.commit('setRouting', false);//禁止路由
          console.log('路由权限：'+JSON.parse(localStorage.getItem("islogin")));//给与跳转权限，只要没有被摧毁，关闭应用再打开，值不变。
          if(localStorage.getItem("userId")){//如果缓存里面有userId，直接跳到home
            localStorage.setItem("islogin", `true`);//打开路由权限
            this.$router.push({name:'home'});
          }

        },

    }


</script>

<style scoped lang="less">
    @rem:750/10rem;
    .selected{
      color: #fca392 !important;
    }
    .wrap{
      .logo{
        display: block;
        margin:100/@rem auto 0;
        width: 400/@rem;
        height: 300/@rem;
        /*border: 1px solid black;*/
      }
      input{
        display: block;
        margin: auto;
        width: 600/@rem;
        height: 84/@rem;
        border: 3/@rem solid  #00bbd4;
        border-radius: 5px;
        outline: none;
        font-size: 34/@rem;
      }
      .phoneT{
        margin-top: 50/@rem;
      }
      p{
        font-size: 42/@rem;
        color:#555;
        text-indent: 2em;
      }
      .protocol{
        width: 600/@rem;
        height: 36/@rem;
        margin: 10/@rem auto;
        /*border: 1px solid black;*/
        font-size: 28/@rem;
        color: #d8d8d8;
        span{
          color: #1592db;
        }
        i{
          float: left;
          font-size: 38/@rem;

        }
      }
      button{
        display: block;
        margin:50/@rem auto;
        width:550/@rem;
        height: 110/@rem;
        background-color: transparent;
        background-image: url(../../../static/image/登录页_03.png);
        background-size: cover;
        border: none;
        outline: none;
        font-size: 42/@rem;
        font-weight: bold;
      }
    }

</style>
