<template>
    <section class="readme-view">

        <h4 class="title">
            README
        </h4>

        <div class="markdown">
            <readme-documentation />
        </div>

    </section>
</template>

<script setup>

    import ReadmeDocumentation from '@/../README.md';

</script>

<style src="github-markdown-css/github-markdown-dark.css"></style>

<style
    scoped
    lang="scss"
    src="./ReadmeView.scss"
></style>
