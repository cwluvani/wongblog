import db from '../firebase/firebaseInit';
import 'firebase/auth';
import firebase from 'firebase/app';

// export global action
export default {
    getCurrentUser: async ({ commit }, user) => {
        try {
            const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
            const dbResult = await database.get()
            commit('setProfileInfo', dbResult);
            commit('setProfileInitials');
            const token = await user.getIdTokenResult();
            const admin = await token.claims.admin;
            commit('setProfileAdmin', admin);
        } catch(err) {
            console.log(err.message);
        }
       
    },
    getPost: async ({state}) => {
        const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
        const dbResults = await dataBase.get();
        dbResults.forEach((doc) => {
            if (!state.blogPosts.some((post) => post.blogId === doc.id)) {
                const data = {
                    blogID: doc.data().blogID,
                    blogHTML: doc.data().blogHTML,
                    blogCoverPhoto: doc.data().blogCoverPhoto,
                    blogTitle: doc.data().blogTitle,
                    blogDate: doc.data().date,
                    blogCoverPhotoName: doc.data().blogCoverPhotoName,
                };
                state.blogPosts.push(data);
            }
        });
        state.postLoaded = true;
    },
    updatePost: async ({ commit, dispatch }, payload) => {
        commit('filterBlogPost', payload);
        await dispatch('getPost');
    },
    deletePost: async ({ commit }, payload) => {
        const getPost = await db.collection('blogPosts').doc(payload);
        await getPost.delete();
        commit('filterBlogPost', payload);
    },
    updateUserSettings: async ({ commit, state }) => {
        const dataBase = await db.collection("users").doc(state.profileId);
        await dataBase.update({
          firstName: state.profileFirstName,
          lastName: state.profileLastName,
          username: state.profileUsername,
        });
        commit('setProfileInitials');
    },
};