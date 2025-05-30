<template>
    <div class="main-title">
        <h1
            v-if="msg"
            class="green"
            v-text="msg"
        />
        <h3>
            Project created with<br>
            <a
                href="https://vite.dev/"
                rel="noopener"
                target="_blank"
            >
                Vite
            </a> +
            <a
                href="https://vuejs.org/"
                rel="noopener"
                target="_blank"
            >
                Vue 3
            </a>
        </h3>
    </div>
</template>

<script setup>

    defineProps(
        {
            msg: {
                type: String,
                default: '',
            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./MainTitle.scss"
></style>
