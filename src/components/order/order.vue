<template>
  <div class="wrap">
    <ul class="oTypes">
      <li  @click="onSel" class="toAll selected">全部
        <b class="noShow"></b>
      </li>
      <li  @click="onSel" class="toIng">进行中
        <b class="noShow"></b>
      </li>
      <li  @click="onSel" class="toUnpaid">待缴费
        <b class="noShow"></b>
      </li>
      <li  @click="onSel" class="toPaid">已缴费
        <b class="noShow"></b>
      </li>
      <li  @click="onSel" class="toDone">已完成
        <b class="noShow"></b>
      </li>
    </ul>
    <div class="noList" v-show="hasList">暂无订单！</div>
    <ul class="oList">
      <li v-for="(item,index) in list " @click = 'oDetail(index)'>
        <p>
          {{list[index].plateNo}}
          <span>订单号：{{list[index].orderNo}}</span>
        </p>
        <ul>
          <li class="fLine">停车路段：{{list[index].roadSectionName}}<span class="statu">{{list[index].statusLabel}}</span></li>
          <li>泊位号：{{list[index].parkingNo}}</li>
          <li>开始时间：{{list[index].billDate}}</li>
          <li class="timing">计时：{{list[index].parkingTimeLabel}}</li>
        </ul>
      </li>
    </ul>
  </div>

</template>

<script>

    export default {
        data() {
            return {
              isSelected:false,
              whichType:'',
              list:[],
              hasList:false
            }
        },
      computed:{

      },
      methods:{
          getType:function(category){
          if(category==='toAll'){return 0}
          if(category==='toIng'){return 1}
          if(category==='toUnpaid'){return 2}
          if(category==='toPaid'){return 3}
          if(category==='toDone'){return 4}
        },
          getList : function(category){
          this.$ajax.get('api/order/get', {
            params: {
              userId: localStorage.getItem("userId"),
              start:0,
              limit:9999,
              category:category
            }
          }).then((res)=>{
            this.list = res.data.data;
            if(this.list[0]){//收不到数据则显示无订单
              this.hasList = false
            }else{
              this.hasList = true
            }

          }).catch(function (err) {
            console.log(err);
          });
        },
          onSel:function (e) {
            let aLi = document.querySelectorAll('.oTypes>li')
            for(let i=0;i<5;i++ ){
              aLi[i].classList.remove('selected')
            }
            e.target.classList.add('selected');
            this.whichType = e.target.classList['0'];//决定要请求的数据类型
            this.getList(this.getType(this.whichType))//请求数据
          },
          oDetail:function(index){
            this.$router.push({name:`orderdetail`,params:{orderNo:this.list[index].orderNo}})
          }
        },
        mounted(){
          this.getList(0)//进入获取全部

        }
    }
</script>

<style scoped lang="less">
    @rem:1080/10rem;
    .noList{
      text-align: center;
      font-size: 60/@rem;
      color: #ddd;
    }
    .oTypes{
      display: flex;
      width: 100%;
      height: 136/@rem;

      background-color: #e4f3fb;
      li{
        position: relative;
        font-size: 36/@rem;
        height: 100%;
        width: 20%;
        text-align: center;
        line-height: 136/@rem;
        /*border: 1px solid black;*/
        b{
           position: absolute;
           left: 0;
           right: 0;
           margin: auto ;
           bottom: 0;
           height: 10/@rem;
           width: 30%;
           background-color: #1592db;
        }
        .noShow{
          opacity: 0;
        }
      }
      .selected{
        font-weight: bolder;
        font-size: 48/@rem;
        b{
          opacity: 1;
        }
      }
    }
    .oList{
      width: 100%;
      padding-bottom: 300/@rem;
      >li{
        margin: 30/@rem auto;
        width: 995/@rem;
        height: 370/@rem;
        box-shadow: 0 0 10/@rem 5/@rem #ddd;
        >p{
          height: 90/@rem;
          width: 90%;
          margin: auto;
          border-bottom: 1px solid #ddd;
          font-size: 48/@rem;
          font-weight: bold;
          line-height: 90/@rem;
          span{
            float: right;
            color: #0086b3;
            font-size: 38/@rem;
            text-align: right;
          }
        }
        >ul{
          >li{
            margin: auto;
            width: 90%;
            font-size: 38/@rem;
            line-height: 70/@rem;
            /*border: 1px solid black;*/
            .statu{
              float: right;
              color: #fb8972;
            }
          }
          .timing{
            width: 40%;
            text-align: center;
            color: #fb8972;
          }
        }

      }
    }


</style>
