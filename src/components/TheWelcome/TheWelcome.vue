<template>
    <welcome-item>
        <template #icon>
            <support-icon />
        </template>
        <template #heading>
            Challenge
        </template>

        Check the
        <router-link to="/challenge">
            <strong>home-challenge</strong>&nbsp; here &raquo;
        </router-link>
        <br>
    </welcome-item>

    <welcome-item>
        <template #icon>
            <documentation-icon />
        </template>
        <template #heading>
            Documentation
        </template>

        Here you can read the <router-link to="/readme">
            scaffolding steps
        </router-link>
    </welcome-item>

    <welcome-item>
        <template #icon>
            <tooling-icon />
        </template>
        <template #heading>
            Tooling
        </template>

        This project is served and bundled with
        <a
            href="https://vite.dev/guide/features.html"
            rel="noopener"
            target="_blank"
        >
            Vite
        </a>;
        <br>
        The
        recommended IDE setup is
        <a
            href="https://code.visualstudio.com/"
            rel="noopener"
            target="_blank"
        >
            VSCode
        </a>
        +
        <a
            href="https://github.com/vuejs/language-tools"
            rel="noopener"
            target="_blank"
        >Vue - Official</a>. If you need to test your components and web pages, check out
        <a
            href="https://vitest.dev/"
            rel="noopener"
            target="_blank"
        >
            Vitest
        </a>
        and
        <a
            href="https://playwright.dev/"
            rel="noopener"
            target="_blank"
        >
            Playwright
        </a>;

        <br>

        More instructions are available in the
        <router-link to="/readme">
            <code>README.md</code>
        </router-link>
        file

    </welcome-item>

    <welcome-item>
        <template #icon>
            <ecosystem-icon />
        </template>
        <template #heading>
            Ecosystem
        </template>

        Official tools and libraries in the project:
        <br>
        <a
            href="https://pinia.vuejs.org/"
            rel="noopener"
            target="_blank"
        >
            Pinia
        </a>,
        <a
            href="https://router.vuejs.org/"
            rel="noopener"
            target="_blank"
        >
            Vue Router
        </a>,
        <a
            href="https://test-utils.vuejs.org/"
            rel="noopener"
            target="_blank"
        >
            Vue TestUtils
        </a>, and
        <a
            href="https://github.com/vuejs/devtools"
            rel="noopener"
            target="_blank"
        >
            Vue DevTools
        </a>
    </welcome-item>
</template>

<script setup>

    import WelcomeItem from '@/components/WelcomeItem/WelcomeItem.vue';
    import DocumentationIcon from '@/components/Icons/IconDocumentation.vue';
    import EcosystemIcon from '@/components/Icons/IconEcosystem.vue';
    import ToolingIcon from '@/components/Icons/IconTooling.vue';
    import SupportIcon from '@/components/Icons/IconSupport.vue';

</script>
