<template>
  <div class="container" ref="container">
          <div class="msg" v-show="isShow">{{msg}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lots:[],
        msg:'停车路段',
        isShow:false
      }
    },
    methods:{
      showMsg:function(id){
         this.$ajax.get('index/road_section/detail/get', {
            params: {
              id: id
            }
          }).then((res)=>{
              this.isShow = true;
              this.msg = res.data.data.price2;
          }).catch(function (err) {
            console.log(err);
         });
      }
    //方法
    },
    mounted(){
      //地图的初始化
      let szu = new qq.maps.LatLng(22.532940,113.932750);
      let map = new qq.maps.Map(this.$refs.container, {//地图对象
        center: szu,
        zoom: 6
      });
      qq.maps.event.addListener(map,'click',()=>{
        this.isShow = false
      })
      let szuMarker  = new qq.maps.Marker({
        position: szu,
        map: map
      });
      //初始化完成

      let _this = this;
      !function showLots() {
        _this.$ajax.get('index/road_section/get', {
          params: {
            radius:9999999,
            lng:114,
            lat:22,//获取全部的停车路段
          }
        }).then((res)=>{
          _this.lots = res.data.data.roadSectionList;
          for(let key in _this.lots){
            // console.log(_this.lots[key].id)
            _this.lots[key].position = new qq.maps.LatLng(_this.lots[key].lat,_this.lots[key].lng);
            _this.lots[key].marker = new qq.maps.Marker({
              position: _this.lots[key].position,
              map: map
            });
            _this.lots[key].marker.setAnimation(qq.maps.MarkerAnimation.DOWN);//‘落下’动画效果
            let anchor = new qq.maps.Point(24,48),//x,y
                size = new qq.maps.Size(48,48),
                origin = new qq.maps.Point(0,0),
                icon = new qq.maps.MarkerImage(
                "../../../static/image/定位图标.png",
                size,
                origin,
                anchor
              );
            _this.lots[key].marker.setIcon(icon);
            qq.maps.event.addListener(_this.lots[key].marker,'click',()=>{
                            _this.showMsg(_this.lots[key].id)
            })
          }
        }).catch((err)=>{
          console.log(err);
        });

         //  //注册点击事件
         // for(let key in _this.lots){
         //   qq.maps.event.addListener(_this.lots[key].marker, 'click',(e)=>{
         //     console.dir(e)
         //   })
         //
         // }
         //
         //  //注册点击事件
      }()




    }
  }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .container{
    position: relative;
    height:90%;
    width: 100%;
  }
  .msg{
    z-index: 99;
    position: absolute;
    bottom:60/@rem;
    left:0;
    right:0;
    margin: auto;//绝对定位居中方法
    height: 400/@rem;
    width:600/@rem;
    border:1px solid black;
    background-color: pink;
    font-size: 30/@rem;
  }
  .noShow{
    display: none;
  }
</style>
