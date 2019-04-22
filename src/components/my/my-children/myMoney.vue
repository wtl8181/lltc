
<template>
  <div class="wrap">
    <i class="iconqianbao iconfont"> </i>
    <article class="title1">钱包余额(元):</article>
    <div class="balance">{{balance}}</div>
    <button>充值</button>

    <router-link :to="{name:'my-bill'}">
      <article class="title2">我的账单<i class="iconqianjin iconfont"></i></article>
    </router-link>


  </div>
</template>
<script>
  export  default {
    data(){
      return {
        balance:'',
      }
    },
    created(){
       this.$ajax.get('api/wallet/balance/get', {
          params: {
            userId: localStorage.getItem('userId')
          }
        }).then((res)=>{
          this.balance = res.data.data
       }).catch(function (err) {
          console.log(err);
       });
    }

  }

</script>
<style scoped lang="less" >
  @rem:1080/10rem;
  .wrap{
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    padding-bottom: 20/@rem;
    padding-top: 1/@rem;
    .iconqianbao{
      display: block;
      margin-top: 120/@rem;
      text-align: center;
      font-size: 260/@rem;
      color: #fb8972;

    }
    .title1{
      color: #aeaeae;
      font-size: 42/@rem;
      text-align: center;
      margin: 25/@rem 0;
    }
    .title2{
      /*border: 1px solid black;*/
      color: #aeaeae;
      text-align: center;
      font-size: 42/@rem;
      margin: 80/@rem 0;
    }
    .balance{
      font-size: 72/@rem;
      color: #fb8972;
      font-weight: bold;
      text-align: center;
    }
    button{
      margin: 50/@rem auto;
      width: 80%;
      border: none;
      background-color:#fb8972 ;
      border-radius: 10/@rem;
      color: white;
      height:120/@rem;
      display: block;
      text-align: center;
      font-size: 60/@rem;
    }

  }

</style>

