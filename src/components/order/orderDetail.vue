<template>
  <div class="wrap">
    <div class="info">
      <p><i class="icon-_dingdanxinxi iconfont"></i>&nbsp;&nbsp;订单信息</p>
      <ul>
        <li>状态：<span style="color:#fca898;">{{detail.userOrderVo.statusLabel}}</span></li>
        <li>订单号：<span>{{detail.userOrderVo.orderNo}}</span></li>
        <li>车牌号：<span>{{detail.userOrderVo.plateNo}}</span></li>
        <li>停车路段：<span>{{detail.userOrderVo.roadSectionName}}</span></li>
        <li>泊位号：<span>{{detail.userOrderVo.parkingNo}}</span></li>
      </ul>
    </div>
    <div class="counting">
      <p><i class="iconjifeifenzhongshu iconfont" style="color:#b6adfa"></i>&nbsp;&nbsp;计时计费</p>
      <ul>
        <li>开始时间：<span>{{detail.userOrderVo.billDate}}</span></li>
        <li>结束时间：<span>{{detail.userOrderVo.driveOutDate}}</span></li>
        <li>预缴金额：<span>{{detail.userOrderVo.preFeeLabel}}元</span></li>
        <li>当前花费：<span>{{detail.userOrderVo.feeLabel}}元</span></li>
        <li>计时：<span>{{detail.userOrderVo.parkingTimeLabel}}</span></li>
      </ul>
    </div>
    <div class="photo">
      <p><i class="iconche iconfont" style="color:#fdb0a4"></i>&nbsp;&nbsp;停车照片</p>
      <button>申诉</button>
    </div>
  </div>


</template>

<script>
    export default {
        data(){
          return {
            detail:{},
          }
        },
        computed:{

        },
        created(){
           this.$ajax.get('api/order/detail', {
              params: {
                orderNo: this.$route.params.orderNo
              }
            }).then((res)=>{
               this.detail = res.data.data;
               console.log(this.detail.userOrderVo)
            }).catch(function (err) {
              console.log(err);
           });
        }
    }
</script>

<style scoped lang="less">
  @rem:1080/10rem;
  .iconfont{
    color: #0086b3;
    font-size:60/@rem
  }
  .wrap{
    div{
      margin: 30/@rem auto;
      width: 90%;
      border: 1px solid #ddd;
      border-radius: 10/@rem;
      overflow: hidden;
      button{
        float: right;
        margin: 10/@rem 10/@rem;

        width:180/@rem;
        height: 80/@rem;
        background-color: white;
        border: 1px solid #53afe5;
        border-radius: 10/@rem;
        font-size: 38/@rem;
        font-weight: bold;
        color:#53afe5 ;
      }
      >p{
        width: 95%;
        margin: auto;
        border-bottom: 1px solid #ddd;
        font-size: 48/@rem;
        line-height: 100/@rem;
      }
      >ul>li{
        width: 95%;
        margin: auto;
        font-size: 42/@rem;
        height: 70/@rem;
        line-height: 70/@rem;
        color: #cccccc;
        /*border: 1px solid black;*/
        >span{
          float: right;
          color: black;
          line-height: 70/@rem;
        }
      }
    }
  }

</style>
