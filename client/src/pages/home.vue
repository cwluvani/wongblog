<template>
  <div class="home">
      <BlogPost :post="welcomeScreen" />
      <BlogPost
       v-for="(post, index) in sampleBlogPost"
       :key="index" 
       :post="post"
      />
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import BlogPost from '../components/BlogPost.vue';

export default {
    name: 'Home',
    components: {
        BlogPost
    },
    
    setup() {
        const welcomeScreen = reactive({
            title: "Welcome!",
            blogPost:
                "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
            welcomeScreen: true,
            photo: "coding",
        });
        const sampleBlogPost = ref([
            {
                title: "this is a Filler Title!",
                blogHTML: "This is a filler blog title!",
                blogCoverPhoto: "beautiful stories"
            },
            {
                title: "this is a Filler Title!",
                blogHTML: "This is a filler blog title!",
                blogCoverPhoto: "beautiful stories"
            }
        ]);

        return {
            welcomeScreen,
            sampleBlogPost
        }
    },

    data() {
        return {
            
        }
    },
}
</script>

<style lang='scss' scoped>

</style>