<template>
  <div class="home">
      <BlogPost :post="welcomeScreen" />
      <BlogPost
       v-for="(post, index) in sampleBlogPost"
       :key="index" 
       :post="post"
      />

      <div class="blog-card-wrap">
          <div class="container">
              <h3>View More Recent Blogs</h3>
              <div class="blog-cards">
                <BlogCard 
                    v-for="(cardContent, index) in sampleBlogCard"
                    :key="index"
                    :cardContent = "cardContent"
                />
              </div>
          </div>
      </div>

      <div  class="updates">
          <div class="container">
              <h2>never miss a post. Register for your free account today!</h2>
              <router-link class="router-button" to="#">
                  Register for WongBlogs <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" class="arrow arrow-light svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';

export default {
    name: 'Home',
    components: {
        BlogPost,
        BlogCard
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
                blogCoverPhoto: "beautiful-stories"
            },
            {
                title: "this is a Filler Title!",
                blogHTML: "This is a filler blog title!",
                blogCoverPhoto: "designed-for-everyone"
            }
        ]);
        const sampleBlogCard = ref([
            {
                blogTitle: "Blog Card #1",
                blogCoverPhoto: "stock-1",
                blogDate: "Hey 1, 2022"
            },
            {
                blogTitle: "Blog Card #2",
                blogCoverPhoto: "stock-2",
                blogDate: "Hey 1, 2022"
            },
            {
                blogTitle: "Blog Card #3",
                blogCoverPhoto: "stock-3",
                blogDate: "Hey 1, 2022"
            },
            {
                blogTitle: "Blog Card #4",
                blogCoverPhoto: "stock-4",
                blogDate: "Hey 1, 2022"
            }
        ]);
        return {
            welcomeScreen,
            sampleBlogPost,
            sampleBlogCard
        }
    },

    data() {
        return {
            
        }
    },
}
</script>

<style lang='scss' scoped>
.blog-card-wrap {

  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>