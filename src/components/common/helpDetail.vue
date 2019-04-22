<template>
  <div v-html="qHtml"></div>
</template>

<script>
    export default {
        data(){
            return {
                qHtml:''
            }
        },
        mounted(){
           this.$ajax.get('api/mine/help_guide/get', {
              params: {
                category: this.$route.params.category
              }
            }).then((res)=>{
              this.qHtml=res.data.data+`<style>img{width: 100%;}</style>`
            }).catch(function (err) {
              console.log(err);
           });
        }
    }
</script>

<style scoped>



</style>
