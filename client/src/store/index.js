import { createStore } from 'vuex'
import mutations from './mutations'
import action from './action'

const state = {
    sampleBlogCard: [
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
    ],
    sampleBlogPost: [
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
    ],
    editPost: null
}

export default createStore({
    action,
    mutations,
    state,
})