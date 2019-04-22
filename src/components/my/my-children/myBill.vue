<template>
  <div class="wrap">
    <div class="bill">
      <li v-for="(item,index) in bill":key="index">
        <p class="p1">
          {{bill[index].typeLabel}}
          <span>
            <b v-text="bill[index].payMode===4?'-':'+'"></b>
            {{bill[index].amountLabel}}
          </span>
        </p>
        <p class="p2">
          <i  :class="bill[index].payMode===4?icon4:icon1"
              class="iconfont"></i>
          {{bill[index].payModeLabel}}支付
          <span>{{bill[index].createDate}}</span>
        </p>
      </li>
    </div>
  </div>
</template>
<script>
  export  default {
    data(){
      return{
        bill:[],
        symbol:'+',
        iconfont:'iconfont',
        icon4:'icontubiaolunkuo-',
        icon1:'iconweixin'
      }
    },
    created() {
       this.$ajax.get('api/mine/user/bill/get', {
          params: {
            userId: localStorage.getItem('userId'),
            start:0,
            limit:100,
          }
        }).then((res)=>{
           this.bill = res.data.data;
           console.log(this.bill);
       }).catch(function (err) {
          console.log(err);
       });
    }
  }
</script>
<style lang="less" scoped>
  @rem:1080/10rem;
  .wrap{
    padding-bottom: 200/@rem;
    width: 100%;
    background-color: #f3f3f3;
    padding-bottom: 20/@rem;
    .bill li{
      margin: auto;
      height: 230/@rem;
      width:90%;
      border-bottom: 1px solid #ddd;
      font-size: 48/@rem;
      p{
        line-height: 115/@rem;
        span{
          float: right;
        }
      }
      .p2{
        color: #666;
        font-size: 42/@rem;
        .iconweixin{
          color: green;
        }
        .icontubiaolunkuo-{
          color: #0086b3;
          font-size: bold;
        }

      }
    }
  }
</style>
