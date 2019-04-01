<template>
     <section class="wrap">
         <!--车牌显示模块-->
         <section class="plate">
             <header class="pTitle">录入车牌号：</header>
                 <ul class="pInput">
                     <li  v-for="(item,index) in 7">{{plate[index]}}</li>
                     <li  class='lastNum'>
                         {{plate[7]}}
                         <div v-show="plate.length<8?true:false">
                            <p>+</p>
                            <p>新能源</p>
                         </div>
                     </li>
                 </ul>
             <article>绑定车牌说明：一个用户可以绑定多个车牌号。</article>
             <button @click='submit'>确认绑定</button>
         </section>
         <!--键盘输入模块-->
         <section class="keyboard">
             <!-- <header class="pkey-header2">
                 <label class="pkey-chacelbtn" @click="closewin">取消</label><label class="pkey-okbtn" @click="checkplate">完成</label>
             </header> -->
             <section class="keyscontainer">
                 <ul>
                     <li v-show="txtboardshow" v-for="(item,index) in cartxt" class='txtboard'>
                         <span class='key english' v-show="index==cartxt.length-1" @click="txtboardshow=false,numboardshow=true">ABC</span><!--切换到英文输入-->
                         <label class='key' v-for="(items,indexi) in item" @click="txtclick(items,indexi,item.length)">{{items}}</label>
                         <span class='key delete icondel  iconfont' 
                            v-show="index==cartxt.length-1" @click="plate=plate.substr(0, plate.length-1)">
                         </span><!--删除-->
                     </li>
                     <li v-show="numboardshow" v-for="(item,index) in numtxt" class='numboard'>  <!--一个li为一行-->                       
                         <span class='key chinese'v-show="index==cartxt.length-1" @click="txtboardshow=true,numboardshow=false">
                             中文
                         </span><!--切换到中文输入-->
                         <label class='key' v-for="(items,indexi) in item" @click="numclick(items,indexi,item.length)">{{items}}</label>
                        <span class='key delete icondel  iconfont '
                            v-show="index==cartxt.length-1" @click="plate=plate.substr(0, plate.length-1)">
                        </span><!--删除-->
                     </li>
                 </ul>
            </section>
             <transition name="fade">
                <section class="showkey" v-show="keyshow" :keyshow="keyshow" :style="{marginLeft:mleft+'px'}">{{keyb}}</section>
             </transition>
         </section>
     </section>
</template>

<script>
import eventBus from './eventBus.js'//引入中间商
 export default{
      data(){
         return{
             disabled:true,
             addNumber:[1,2,31,1],
             plate:"",
             keyb:'',
             txtboardshow:false,
             numboardshow:true,
             keyshow:false,
             mleft:0,
             tips:'',
             cartxt:[
                  ['京','津','渝','沪','冀','晋','辽','吉','黑','苏'],
                  ['浙','皖','闽','赣','鲁','豫','鄂','湘','粤','琼'],
                  ['川','贵','云','陕','甘','青','蒙','桂','宁','新'],
                  ['藏','使','领','警','学','港','澳']
              ],
              numtxt:[
                  ['1','2','3','4','5','6','7','8','9','0'],
                  ['Q','W','E','R','T','Y','U','I','O','P'],
                  ['A','S','D','F','G','H','J','K','L',],
                  ['Z','X','C','V','B','N','M'],
              ]
            }
      },
      mounted(){
        this.plate = !this.$store.state.editPlate?'湘D':this.$store.state.editPlate
        //打开显示不是湘D，就必定是点开修改进来的
      },


      computed:{

          showLast(){
              return true
          }
      },
      methods: {
          txtclick : function(txt,indexi,size){
              
              if(this.plate.length>7){
                  return
              }
              this.txtboardshow = false;
              this.numboardshow = true;
              this.plate+=txt;
              this.keyb = txt;
              console.log(this.plate)
            //   this.composition(indexi,size);            
          },
          numclick : function(num,indexi,size){
              
              if(this.plate.length>7){
                  return
              }
              
              this.plate+=num;            
              this.keyb = num;
              
            //   this.composition(indexi,size);
              
          },
          submit : function(){
              if(this.plate==''){
                  this.tips = '请输入车牌号码';
                  alert( this.tips)     
                  return;
              }            
              if(!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}[A-Z0-9]{0,1}[A-Z0-9]{0,1}$/.test(this.plate))){
                  //不是车牌
                  this.tips = '车牌号格式不正确'
                  alert( this.tips)        
                  return;
              }
                this.tips = '';
                

            //绑定车牌
              this.$ajax({
                url: 'mine/plate/bind',
                method: 'post',
                data: {
                  plateNo: this.plate,
                  userId:this.$store.state.userId,
                  cityCode:"1",
                  markType:1,
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
              }).then(function (res) {
                // console.log(res);
              }).catch(function (err) {
                console.log(err);
              });
            //post绑定的车牌


            //按需解绑
            if (this.$store.state.editPlate){
                let plateNo = this.$store.state.editPlate;
                console.log(plateNo)
                this.$ajax({
                  url: 'mine/plate/unbind',
                  method: 'post',
                  data: {
                    plateNo:plateNo,
                    userId : this.$store.state.userId,
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
                  if(res.data.msg===null){
                    console.log(`已解绑旧的车牌`)
                  }else{
                    alert(res.data.msg)
                  }
                }).catch((err) =>{
                  console.log(err);
                })
              }

            //按需解绑
            this.plate = '湘D';
            this.$store.commit('plateErase')
            this.txtboardshow = true;
            this.numboardshow = false;
            this.$router.go(-1),10000//返回上一页
          },
     }
 }    
</script>

<style lang="less" scoped>
     @rem:1080/10rem;
     .wrap{

       position: relative;
       width: 100%;
        height:100%;
       background-color: #f3f3f3;
     }
     //表单板块
     .pTitle{
         font-size: 48/@rem;
         line-height: 150/@rem;
         text-indent: 0.5em;
     }
     .pInput{
         display: flex;
         height: 150/@rem;
         width: 100%;
        
     }
     .pInput li{
         margin: auto;
         background-color: white;
         width: 110/@rem;
         height: 120/@rem;
         font-size: 60/@rem;
         font-weight: bold;
         text-align: center;
         line-height: 120/@rem;
     }
     .pInput li:nth-child(2){
         margin-left: 0;
         margin-right: 80/@rem
     }
     .pInput li:first-child{
         margin-right: 0;
         margin-left: 20/@rem
     }
     .plate article{
         
         font-size: 36/@rem;
         text-indent: 0.5em;
         line-height: 150/@rem;
         opacity: 0.6;
     }
     .plate button{
         display: block;
         width:1000/@rem;
         height: 130/@rem;
         border: none;
         border-radius: 5px;
         margin: 20/@rem auto 0;
         font-size: 60/@rem;
         color: white;
         background-color: #fb8972;

     }
     .lastNum p{
         font-size: 10/@rem;
         color: #b2b2b2;
         line-height: 60/@rem;
     }
     
 
     //键盘板块
     .keyscontainer{
         position: absolute;
         bottom: 0;
         background-color: #ddd;
         height: 800/@rem;
         width: 100%;
         
     }
     .keyscontainer li{//每一行都是一个弹性盒子
         display: flex;
         justify-content:center;
         box-sizing: border-box;
         height: 200/@rem;
     }
     .keyscontainer li .key{
        
         width: 9%;
         height:90%;
         margin:10/@rem auto ;
         box-shadow: 0 0  5px 1px grey;
         border-radius: 5px;
         font-size: 80/@rem;
         font-weight: bold;
         line-height: 180/@rem;
         text-align: center;
         background-color: white;
     }
     .keyscontainer li .delete{
         width: 15%;
         background-color: #fb8972;
         
     }
     .keyscontainer li .english,.keyscontainer li .chinese{
         width: 15%;
         background-color: #fb8972;
         font-size: 50/@rem;
         color: #f3f3f3
     }
    //  .keyscontainer li .chinese,{
    //      width: 18%;
    //  }
    
</style>
