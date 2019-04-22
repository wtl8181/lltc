<template>
  <div class="container" ref="container">
      <input type="search" placeholder="搜索" maxlength = "12"
              v-model="inp" @input="isBlank"/>
      <ul class="seResult" v-show="showSearch">
        <li v-for="(item,index) in searchList":key="index"
          @click="bindMarker(item.id)">
          {{item.name}}
          <i class="iconqianjin iconfont"></i>
        </li>
      </ul>
      <i class="iconsousuo_huaban iconfont" @click="searching">
      </i>
      <div class="msg" v-show="isShow">
            <p><i class='iconluduan1 iconfont'></i> {{msg.name}}<span>咪表停车</span></p>
            <ul>
              <li>总泊位数：{{msg.total}}   ；  空泊位数：{{msg.idle}}</li>
              <li>价格：{{separate(msg.busy)}}</li>
              <li>闲时：{{msg.free}} ；假期：{{msg.holiday}}</li>
            </ul>
            <button @click="goThere(msg.lng,msg.lat)"><i class='iconquzheli iconfont'
                        style="font-size: inherit"></i>去这里</button>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lots:[],
        searchList:[],
        msg:{name:'',total:0,free:0,busy:'' },
        isShow:false,
        showSearch:false,
        inp:'',
        olderKey:undefined,
        icon:{},
        icon2:{}
      }
    },
    computed:{

    },
    methods:{
      isBlank:function(){
        if(this.inp=== ''){
          this.showSearch = false
        }
      },
      separate:function(string){
        let arr = string.split(' ');
        let re = arr[0]+'：'+arr[1]
        return re
      },
      showMsg:function(id,name){
         this.$ajax.get('api/index/road_section/detail/get', {
            params: {
              id: id
            }
          }).then((res)=>{
              this.isShow = true;//显示信息框
              this.msg.name  = name;//路段名
              this.msg.idle = res.data.data.parkingIdleCount;//空闲泊位
              this.msg.total = res.data.data.parkingTotalCount;//总泊位
              this.msg.busy = res.data.data.price2.busy;//忙时价格
              this.msg.free = res.data.data.price2.free;//闲时价格
              this.msg.holiday = res.data.data.price2.holiday;
              this.msg.lng = res.data.data.lng;
              this.msg.lat = res.data.data.lat;
          }).catch(function (err) {
              console.log(err);
         });
      },
      goThere:function(lat,lng){},
      searching:function(){
        let _this = this;
        this.$ajax.get('api/index/road_section/search', {
            params: {
              keyword: this.inp
            }
          }).then((res)=>{
               _this.searchList = res.data.data;
                console.log(_this.searchList)
              if(_this.searchList.length!=0){
                _this.showSearch = true;
              }else{
                alert('没有搜索到该路段')
              }
          }).catch(function (err) {
            console.log(err);
         });

      },
      bindMarker:function (id){ //设置每个marker的点击事件
        let _this = this;
        for(let key in _this.lots){
           if(_this.lots[key].id===id){
             if(key === _this.olderKey) return
             _this.showMsg(_this.lots[key].id,_this.lots[key].name);
             _this.lots[key].marker.setIcon(_this.icon2);
             try {
               _this.lots[_this.olderKey].marker.setIcon(_this.icon);
             }catch (err) {
               console.log(_this.olderKey)
             }
             _this.olderKey = key
           }
        }

      }
    //方法
    },
    created(){
      let _this=this;
      !function removeLogo(){
        _this.$jq(function(){
          _this.$jq(".container").bind("DOMNodeInserted",function(e){
            let tempCount = 0;
            _this.$jq(".container .smnoprint").siblings().each(function(){
              tempCount++;
              if(tempCount==2||tempCount==3){
                _this.$jq(this).remove();
              }
            });
          });
        });
      }()

    },
    mounted(){
      let _this = this;
      //地图的初始化
      let user = new qq.maps.LatLng(22.532940,113.932750);//用户坐标
      let map = new qq.maps.Map(this.$refs.container, {//地图对象
        center: user,
        zoom: 8,
      });
      let userMarker  = new qq.maps.Marker({
        position: user,
        map: map
      });
      let anchor = new qq.maps.Point(24,48),//x,y
        size = new qq.maps.Size(48,48),
        origin = new qq.maps.Point(0,0);

      let icon = new qq.maps.MarkerImage(
        "../../../static/image/定位图标.png",
        size,
        origin,
        anchor
      );
      _this.icon = icon
      let icon2 = new qq.maps.MarkerImage(
        "../../../static/image/close2.png",
        size,
        origin,
        anchor
      );
      _this.icon2 = icon2
      qq.maps.event.addListener(map,'click',()=>{
        _this.isShow = false;
        try {
          _this.lots[_this.olderKey].marker.setIcon(icon);
        }catch (err) {
          console.log(_this.olderKey)
        };
        _this.olderKey = undefined;
      });//设置地图的点击事件
      //初始化完成


      !function showLots() {
        _this.$ajax.get('api/index/road_section/get', {
          params: {
            radius:9999999,
            lng:114,
            lat:22,//获取全部的停车路段
          }
        }).then((res)=>{
          _this.lots = res.data.data.roadSectionList;
          for(let key in _this.lots){
            _this.lots[key].key = key;//存序号
            _this.lots[key].position = new qq.maps.LatLng(_this.lots[key].lat,_this.lots[key].lng);
            _this.lots[key].marker = new qq.maps.Marker({
              position: _this.lots[key].position,
              map: map
            });
            _this.lots[key].marker.setAnimation(qq.maps.MarkerAnimation.DOWN);//‘落下’动画效果
            _this.lots[key].marker.setIcon(icon);//所有的marker的图标
            qq.maps.event.addListener(_this.lots[key].marker,'click',()=>{ //设置每个marker的点击事件
              console.log(key)
              if(key === _this.olderKey) return
              _this.showMsg(_this.lots[key].id,_this.lots[key].name);
              _this.lots[key].marker.setIcon(icon2);
              try {
                _this.lots[_this.olderKey].marker.setIcon(icon);
              }catch (err) {
                console.log(_this.olderKey)
              }
              _this.olderKey = key
            })

          }
        }).catch((err)=>{
          console.log(err);
        });

      }();

    },

  }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .container{
    position: relative;
    height:100%;
    width: 100%;
    .iconsousuo_huaban{
      z-index: 101;
      position: absolute;
      right: 11%;
      top: 40/@rem;
      height:80/@rem ;
      width:80/@rem ;
      border-radius: 50%;
      text-align: center;
      line-height: 80/@rem;
      font-size: 46/@rem;
      color: white;
      background-color:#1592db;


    }
    input[type=search] {
      /*background: #ededed url(images/search-icon.png) no-repeat 9px center;*/
      z-index: 100;
      opacity: 0.9;
      position: absolute;
      margin:40/@rem auto 0;
      border: 6/@rem solid #ddd;
      left: 0;
      right: 0;
      width: 80%;
      height: 80/@rem;
      padding: 9px 10px 9px 32px;
      -webkit-border-radius: 10em;
      -moz-border-radius: 10em;
      border-radius: 10em;
      font-size:32/@rem;
    }
    .seResult{
      z-index: 99;
      position: absolute;
      top: 110/@rem;
      left: 0;
      right: 0;
      width: 60%;
      margin: auto;
      padding: 10/@rem 0;
      border: 1px solid #ddd;
      background-color: white;
      overflow: auto;
      font-size: 30/@rem;
      opacity: 0.9;
      >li{
        position: relative;
        margin: auto;
        width: 90%;
        color: grey;
        border-bottom: 2/@rem solid #60b5e7;
        >i{
          position: absolute;
          right: 10/@rem;
          top:8/@rem
        }
      }
    }
  }
  .msg{
    z-index: 99;
    position: absolute;
    bottom:200/@rem;
    left:0;
    right:0;
    margin: auto;//绝对定位居中方法
    height: 360/@rem;
    width:600/@rem;
    border-radius: 5px;
    box-shadow: 0 0 10/@rem 5/@rem #ddd;
    background-color: white;
    font-size: 30/@rem;
    >ul{
      width: 90%;
      margin: 10/@rem auto  30/@rem;
    }
  }

  .msg>p {
    position: relative;
    width: 90%;
    margin: auto;
    height: 80/@rem;
    line-height: 80/@rem;
    font-size: 32/@rem;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
  }
  .msg>p>span{
    position: absolute;
    height: 80/@rem;
    line-height:80/@rem;
    right: 0;
    font-size: 32/@rem;
    color: #1592db;
  }
  .msg>p>i{
    color: #00acc1;
    font-size: 48/@rem;
  }
  button{
    display: block;
    margin: auto;
    width: 90%;
    height: 70/@rem;
    border: none;
    background-color: #1592db;
    outline: none;
    color: white;
    font-size: 36/@rem;
    line-height: 70/@rem;
  }
  .noShow{
    display: none;
  }
</style>
