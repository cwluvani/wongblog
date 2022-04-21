export default {
    blogPostsFeed: (state) => state.blogPosts.slice(0, 2),
    blogPostsCards: (state) => state.blogPosts.slice(2, 6),
}