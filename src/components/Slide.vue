<template>
    <div class="slide">
     <SlideLink />
    </div>
</template>

<script>
import SlideLink from './SildeLink'
    export default {
        components: {
            SlideLink
        }
    }
</script>

<style lang="less" scoped>
    .slide {
        background-color: pink;
        height: inherit;
    }
</style>