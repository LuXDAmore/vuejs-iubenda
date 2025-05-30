<template>
    <div class="welcome-item">
        <i>
            <slot name="icon" />
        </i>
        <div class="details">

            <h3>
                <slot name="heading" />
            </h3>

            <slot />

        </div>
    </div>
</template>

<style
    scoped
    lang="scss"
    src="./WelcomeItem.scss"
></style>
