<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" />
    <Loading v-show="loading" />

    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle"/>
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !blogPhotoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ blogCoverPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor 
          :editorOptions="editorSettings" 
          @image-added="imageHandler" 
          useCustomImageHandler 
          v-model="blogHTML" 
        ></vue-editor>
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/firebaseInit';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, reactive, ref, } from "vue";

import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Loading from "../components/Loading.vue";
import Quill from "quill";
import { VueEditor } from 'vue3-editor'
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/ImageResize", ImageResize);

export default {
  name: "CreatePost",
  components: {
    BlogCoverPreview,
    Loading,
    VueEditor
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const error = ref(null);
    const errorMsg = ref(null);
    const loading = ref(null);
    const file = ref(null);
    const blogPhoto = ref(null); // file-type input ref
    const editorSettings = reactive({
      modules: {
        ImageResize: {},
      },
    });

    // computed value
    const blogPhotoFileURL = computed(() => store.state.blogPhotoFileURL);
    const blogPhotoPreview = computed(() => store.state.blogPhotoPreview);
    const profileId = computed(() => store.state.profileId);
    const blogCoverPhotoName = computed(() => store.state.blogPhotoName);
    const blogTitle = computed({
      get: () => store.state.blogTitle,
      set: payload => store.commit('updateBlogTitle', payload)
    });
    const blogHTML = computed({
      get: () => store.state.blogHTML,
      set: payload => store.commit('newBlogPost', payload)
    });

    // methods
    const openPreview = () => store.commit('openPhotoPreview');
    const fileChange = () => {
      file.value = blogPhoto.value.files[0];
      const fileName = file.value.name;
      store.commit('fileNameChange', fileName);
      store.commit('createFileURL', URL.createObjectURL(file.value));
    };
    const uploadBlog = () => {
      if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
        loading.value = true;
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(`documents/BlogCoverPhotos/${store.state.blogPhotoName}`);
        docRef.put(file.value).on(
          'state_changed',
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
            loading.value = false;
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            const timestamp = Date.now();
            const dataBase = await db.collection('blogPosts').doc();

            await dataBase.set({
              blogID: dataBase.id,
              blogHTML: blogHTML.value,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogCoverPhotoName.value,
              blogTitle: blogTitle.value,
              profileId: profileId.value,
              date: timestamp,
            });
            await store.dispatch('getPost');
            loading.value = false;
            router.push({ name: 'ViewBlog', params: { blogid: dataBase.id } });
          }
        )
      }
    };
    const imageHandler = (file, Editor, cursorLocation, resetUploader) => {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.value.name}`);
      docRef.put(file).on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, 'image', downloadURL);
          resetUploader();
        }
      )
    };

    return {
      error,
      errorMsg,
      loading,
      file,
      editorSettings,
      profileId,
      blogCoverPhotoName,
      blogPhotoFileURL,
      blogPhotoPreview,
      blogTitle,
      blogHTML,
      blogPhoto,
      openPreview,
      fileChange,
      uploadBlog,
      imageHandler,
    };
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
