<template>
    <section class="challenge-view">

        <h4 class="title">
            CHALLENGE
        </h4>

        <form
            action="/"
            autocomplete="off"
            method="post"
            novalidate
            @keydown.prevent.enter="() => onFormSubmitted()"
            @keypress.prevent.enter="() => onFormSubmitted()"
            @keyup.prevent.enter="() => onFormSubmitted()"
            @submit.prevent="() => onFormSubmitted()"
        >

            <fieldset :disabled="loading">
                <h5 class="field-title">
                    Target countries
                </h5>

                <div class="field">
                    <input
                        v-model="data.targetCountries"
                        id="target-countries-worldwide"
                        name="target-countries"
                        type="radio"
                        value="world"
                    >
                    <label for="target-countries-worldwide">
                        Worldwide
                    </label>
                </div>

                <div class="field">
                    <input
                        v-model="data.targetCountries"
                        id="target-countries-us"
                        name="target-countries"
                        type="radio"
                        value="US"
                    >
                    <label for="target-countries-us">
                        US users only
                    </label>
                </div>

                <div class="field">
                    <input
                        v-model="data.targetCountries"
                        id="target-countries-eu"
                        name="target-countries"
                        type="radio"
                        value="EU"
                    >
                    <label for="target-countries-eu">
                        EU users only
                    </label>
                </div>

            </fieldset>

            <fieldset :disabled="loading">

                <h5 class="field-title">
                    Legislation
                </h5>

                <div class="field">
                    <input
                        v-model="data.gdpr"
                        id="legislation-gdpr"
                        checked="checked"
                        name="gdpr"
                        type="checkbox"
                    >
                    <label for="legislation-gdpr">
                        GDPR
                    </label>
                </div>

                <div class="field">
                    <input
                        v-model="data.ccpa"
                        id="legislation-ccpa"
                        name="ccpa"
                        type="checkbox"
                    >
                    <label for="legislation-ccpa">
                        CCPA
                    </label>
                </div>

            </fieldset>

            <fieldset :disabled="loading">

                <h5 class="field-title">
                    Consent
                </h5>

                <div class="field">
                    <input
                        v-model="data.consentByScroll"
                        id="consent-by-scroll"
                        name="consent-by-scroll"
                        type="checkbox"
                    >
                    <label for="consent-by-scroll">
                        Consent by scroll
                    </label>
                </div>

                <div class="field">
                    <input
                        v-model="data.perPurposeConsent"
                        id="per-purpose-consent"
                        name="per-purpose-consent"
                        type="checkbox"
                    >
                    <label for="per-purpose-consent">
                        Consent by scroll
                    </label>
                </div>

            </fieldset>

            <hr>

            <fieldset class="field-container__banner" :disabled="loading">

                <h5 class="field-title">
                    Banner
                </h5>

                <div class="field field-notice">
                    <label for="banner-notice">
                        Title
                    </label>
                    <input
                        v-model="data.banner.title"
                        id="banner-notice"
                        name="banner-notice"
                        type="text"
                    >
                </div>

                <div class="field">
                    <input
                        v-model="data.banner.acceptButtonDisplay"
                        id="banner-accept-button-display"
                        name="banner-accept-button-display"
                        type="checkbox"
                    >
                    <label for="banner-accept-button-display">
                        Accept button display
                    </label>
                </div>

                <div class="field">
                    <input
                        v-model="data.banner.closeButtonDisplay"
                        id="banner-close-button-display"
                        name="banner-close-button-display"
                        type="checkbox"
                    >
                    <label for="banner-close-button-display">
                        Close button display
                    </label>
                </div>

                <div class="field">
                    <input
                        v-model="data.banner.closeButtonRejects"
                        id="banner-close-button-rejects"
                        name="banner-close-button-rejects"
                        type="checkbox"
                    >
                    <label for="banner-close-button-rejects">
                        Close button rejects
                    </label>
                </div>

                <div class="field">
                    <input
                        v-model="data.banner.rejectButtonDisplay"
                        id="banner-reject-button-display"
                        name="banner-reject-button-display"
                        type="checkbox"
                    >
                    <label for="banner-reject-button-display">
                        Reject button display
                    </label>
                </div>

            </fieldset>

            <hr>

            <div class="field-submit__container">
                <button
                    class="field-submit"
                    :disabled="loading"
                    type="submit"
                >
                    Save
                </button>

                <span v-if="loading" class="loading-indicator" />
            </div>

        </form>

        <cookie-banner :data="data" />

        <details>
            <summary>Show Json</summary>
            <code>
                <pre v-text="prettifiedJsonToShowInUi" />
            </code>
        </details>

    </section>
</template>

<script setup>

    // Vue
    import { computed, ref } from 'vue';

    // Components
    import CookieBanner from '@/components/CookieBanner/CookieBanner.vue';

    // Constants
    import { CONFIGURATION_DEFAULT } from '@/constants/configuration';

    // Utils
    import { timeout } from '@/utils/timer';

    // Setup
    const
        // Configuration
        data = ref( CONFIGURATION_DEFAULT )
        , prettifiedJsonToShowInUi = computed( () => JSON.stringify( data.value, null, 2 ) )
        // UI
        , loading = ref( false )
        // Events
        , onFormSubmitted = async() => {

            if( loading.value )
                return;

            loading.value = true;

            console.info( 'Form data', data.value );

            await timeout( 3000 );

            loading.value = false; // eslint-disable-line require-atomic-updates

        }
    ;

</script>

<style
    scoped
    lang="scss"
    src="./ChallengeView.scss"
></style>
