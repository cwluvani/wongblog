<template>
  <div class="create-post">
      <BlogCoverPreview />
      <Loading />
  </div>
</template>

<script>
import BlogCoverPreview from '../components/BlogCoverPreview.vue'
import Loading from '../components/Loading.vue';

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

        return {

        }
    }
}
</script>

<style lang="scss" scoped>

</style>