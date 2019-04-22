<template>
  <div class="wrap" v-html="protocol"></div>
</template>

<script>
    export default {
      data(){
          return {
            protocol:''
          }

      },
      created(){

      },
      mounted() {
           this.$ajax.get('api/login/user_protocol/get', {
            }).then((res)=>{
                   this.protocol = res.data.data
            }).catch(function (err) {
              console.log(err);
           });

      }
    }
</script>

<style lang="less" scoped>
  @rem:1080/10rem;
  .wrap{
    /*background-color: #fefefe ;*/

  }

</style>
