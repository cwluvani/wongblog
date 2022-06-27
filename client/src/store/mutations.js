
export default {
    newBlogPost: (state, payload) => {
        state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
        state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
        state.blogPhotoFileName = payload;
    },
    createFileURL(state, payload) {
        state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
        state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
        state.editPost = payload;
        // console.log(state.editPost);
    },
    setProfileState(state, payload) {
        state.blogTitle = payload.blogTitle;
        state.blogHTML = payload.blogHTML;
        state.blogPhotoFileURL = payload.blogCoverPhoto;
        state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
        state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
    },
    updateUser(state, payload) {
        state.user = payload;
    },
    setProfileInfo: (state, doc) => {
        state.profileId = doc.id;
        state.profileEmail = doc.data().email;
        state.profileFirstName = doc.data().firstName;
        state.profileLastName = doc.data().lastName;
        state.profileUserName = doc.data().userName;
        console.log(state.profileId);
    },
    setProfileInitials: (state) => {
        state.profileInitials = 
            state.profileFirstName.match(/(\b\S)?/g).join('')
                +
            state.profileLastName.match(/(\b\S)?/g).join('');
    },
    setProfileAdmin: (state, payload) => {
        state.profileAdmin = payload;
        console.log(state.profileAdmin);
    },
    changeFirstName(state, payload) {
        state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
        state.profileLastName = payload;
    },
    changeUserName(state, payload) {
        state.profileUserName = payload;
    },
};