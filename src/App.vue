<template>
    <div class="app layout" :class="{ 'layout--dark': dark }">

        <button
            class="theme-toggle"
            type="button"
            v-text="dark ? '🌙' : '🌞'"
            @click="() => darkToggle()"
        />

        <header>
            <img
                alt="logo"
                class="logo"
                height="125"
                src="/favicon.png"
            >

            <div class="wrapper">

                <main-title msg="Vuejs - Iubenda" />

                <nav>
                    <router-link to="/">
                        Home
                    </router-link>
                    <router-link to="/readme">
                        Readme
                    </router-link>
                    <router-link to="/challenge">
                        Challenge
                    </router-link>
                    <router-link to="/about">
                        About
                    </router-link>
                </nav>
                <br>
                <nav>
                    <a
                        href="https://github.com/LuXDAmore/vuejs-iubenda"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Repository (private)
                    </a>
                    <a
                        href="https://github.com/LuXDAmore"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Luca Iaconelli (github)
                    </a>
                    <a
                        href="https://curriculumvitae.lucaiaconelli.it"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Luca Iaconelli (cv)
                    </a>
                </nav>
            </div>

        </header>

        <main>
            <router-view />
        </main>

    </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';

    import MainTitle from '@/components/MainTitle/MainTitle.vue';

    const
        dark = ref( true )
        , darkToggle = () => {

            dark.value = ! dark.value;

        }
    ;

</script>

<style
    scoped
    lang="scss"
    src="./App.scss"
></style>
