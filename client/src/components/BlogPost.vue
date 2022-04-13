<template>
  <div class="blog-wrapper">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen"> {{ post.title }} </h2>
        <h2 v-else> {{ post.title }} </h2>
        <!-- <p v-if="post"></p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BlogPost',
    components: {

    },

    props: {
      post: Object
    },

    setup() {

        return {

        }
    },

    computed: {
      // standardizePostInfo: () => post.welcomeScreen.toLowerCase()
    }
}
</script>

<style lang='scss' scoped>

</style>