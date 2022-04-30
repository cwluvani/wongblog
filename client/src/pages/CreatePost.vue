<template>
  <div class="create-post">
      <BlogCoverPreview v-show="false"/>
      <Loading v-show="false"/>

      <div class="container">
          <div class="err-message">
              <p><span>Error:</span>{{ errorMsg }}</p>
          </div>
          <div class="blog-info">
              <input type="text" placeholder="Enter Blog Title" />
              <div class="upload-file">
                  <label for="blog-photo">Upload Cover Photo</label>
                  <input type="file" ref="blogPhoto" id="blog-photo" />
                  <button class="preview">
                      Preview Photo
                  </button>
                  <span>File Chose: {{ this.$store.state.blogPhotoName }}</span>
              </div>
          </div>
          <div class="editor">
              <vue-editor></vue-editor>
          </div>
          <div class="blog-actions">
              <button>Publish Blog</button>
              <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
          </div>
      </div>
  </div>
</template>

<script>
import BlogCoverPreview from '../components/BlogCoverPreview.vue'
import Loading from '../components/Loading.vue';
import { reactive, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import Quill from 'quill'

window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('modules/imageResize', ImageResize);

export default {
    name: 'CreatePost',
    components: {
        BlogCoverPreview,
        Loading
    },

    setup() {
        const store = useStore();

        const error = ref(null);
        const errorMsg = ref(null);
        const loading = ref(null);
        const file = ref(null);
        const editorSettings = reactive({
            modules: {
                ImageResize: {},
            },
        });

        const blogPhoto = ref(null);
        const fileChange = function() {
            file.value = blogPhoto.value.files[0];
            const fileName = file.value.name;
            store.commit('fileNameChange', fileName);
            store.commit('createFileURL', URL.createObjectURL(file.value));
        };
        const openPreview = function() {
            store.commit('openPhotoPreview');
        };
        const imageHandler = function(file, Editor, cursorLocation, resetUploader) {
            const storageRef = {
                child: function(fileName) {
                    return fileName;
                }
            };
        };
        return {
            error,
            errorMsg,
            loading,
            file,
            editorSettings
        }
    }
}
</script>

<style lang="scss" scoped>
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