<template>
  <div class="test">
    <textarea :value="input" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
  // import marked from 'marked'
  export default {
    name: "test",
    data (){
      return {
        input: '# hello'
      }
    },
    computed: {
      compiledMarkdown: function () {
        console.log(JSON.stringify(this.input))
        // return marked(this.input, {sanitize: true})
      }
    },
    methods: {
      update (e){
        this.input = e.target.value
      }
    }
  }
</script>

<style scoped>

</style>
