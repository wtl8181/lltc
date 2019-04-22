<template>
    <div class="wrap">
        <ul class='plateList' >
            <li class='plateItem'  v-for="(item,index) in pArr":key="index">
              <p>{{item}}</p>
              <button class="edit"  @click="edit(index)" >修改</button>
              <!--edit(index)通过事件获取索引值index-->
              <button class="unbind" @click = 'unbind(index)' >解除</button>
            </li>
        </ul>
        <router-link class='bindPlate':to="{name:'platewrite'}">去绑定车牌</router-link>


    </div>
</template>
<script>
export default {
    data(){
        return{
            pArr:[],//放用户车牌的地方
            msg:'',
            bb:false,
        }
    },
    components:{
      'plate':{
        template:''
      }
    },
    methods:{
        unbind(index){
           let isSure = confirm('确定解除绑定?')
                if(isSure===true){
                  let str1 = this.pArr[index].slice(0,2);
                  let str2 = this.pArr[index].slice(3,this.pArr[index].length);
                  let plateNo = str1+str2;
                  this.$ajax({
                    url: 'api/mine/plate/unbind',
                    method: 'post',
                    data: {
                      plateNo:plateNo,
                      userId : this.$store.state.userId,
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
                    if(res.data.msg===null){
                      location. reload()
                      alert('解绑成功le')
                    }else{
                      alert(res.data.msg)
                    }
                  }).catch((err) =>{
                    console.log(err);
                  })
                }
              },
        edit(index){
          let editPlate = this.pArr[index].slice(0,2)+this.pArr[index].slice(3,this.pArr[index].length)

          //把车牌中间的空格去掉
          this.$store.commit('plateBus',editPlate)
          this.$router.push({name:'platewrite'})
          //用router的name需要加上引号，以免被识别为变量。

        }
    },

    computed:{

    },

    mounted(){
      this.$ajax.get('api/mine/plate/get', {
        params: {
          // userId: this.$store.state.userId
          userId:localStorage.getItem('userId')
        }
      }).then((res)=>{
        for( let i = 1; i<res.data.data.length;i++){
          let str1 = res.data.data[i].plateNo.slice(0,2);
          let str2 = res.data.data[i].plateNo.slice(2,res.data.data[i].length);//往车牌号加空格
          this.pArr.push(str1+' '+str2)
        }
      }).catch(function (err) {
          console.log(err);
        });

    }


}
</script>
<style lang="less" scoped>
    @rem:1080/10rem;
    .wrap{
      height: 100%;
      padding-top: 20/@rem;
      padding-bottom: 20/@rem;
      width: 100%;
      background-color:#f3f3f3 ;
    }
    .bindPlate{
        display: block;
        margin:auto;
        width: 1020/@rem;
        height: 140/@rem;
        border-radius: 5px;
        font-size: 60/@rem;
        text-align: center;
        line-height: 140/@rem;
        color: white;
        background-color: #fb8972
    }
    .plateItem{
      position: relative;
      margin: 40/@rem auto;
      height:390/@rem;
      width: 100%;
      background-color: white;
      button {
        position: absolute;
        right: 50/@rem;
        width:215/@rem;
        height:85/@rem;
        border: none;
        border-radius: 5px;
        font-size: 48/@rem;
        color: #8888;
        background-color:#f3f3f3 ;
      }
      .edit{
        top:90/@rem
      }
      .unbind{
        top:220/@rem
      }
      p{
        position: absolute;
        top:50/@rem ;
        left: 50/@rem ;
        height:288/@rem;
        width: 740/@rem;
        border-radius: 5px;
        font-size: 90/@rem;
        color: white;
        font-weight: bold;
        text-align: center;
        line-height: 288/@rem;
        background-image: url(../../../../static/image/车牌背景.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
    }

</style>


