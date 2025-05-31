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
            @keydown.prevent.enter="() => onFormSubmit()"
            @keypress.prevent.enter="() => onFormSubmit()"
            @keyup.prevent.enter="() => onFormSubmit()"
            @reset.prevent="() => onFormReset()"
            @submit.prevent="() => onFormSubmit()"
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
                    v-if="! isFormDataEqual"
                    class="field-submit"
                    :disabled="loading"
                    type="reset"
                >
                    Reset
                </button>

                <button
                    class="field-submit"
                    :disabled="loading || isFormDataEqual"
                    type="submit"
                >
                    Save
                </button>

                <span v-if="loading" class="loading-indicator" />

                <small v-if="userAction.name">
                    {{ userAction.name }}: {{ userAction.value }}
                </small>

                <span class="spacer" />

                <em
                    v-if="isDataSentToServer"
                    class="message"
                    :class="{
                        'message--success': isDataSentToServerSimulateSuccess,
                        'message--error': ! isDataSentToServerSimulateSuccess,
                    }"
                    v-text="simulatedServerMessage"
                />

            </div>

        </form>

        <cookie-banner
            :data="data"
            @accept="onCookieAccept"
            @reject="onCookieReject"
        />

        <div class="json-container">

            <details>
                <summary>Show Json</summary>
                <code>
                    <pre v-text="prettifiedJsonFromDataToShowInUi" />
                </code>
            </details>

            <details>
                <summary>Show Pinia store state</summary>
                <code>
                    <pre v-text="prettifiedJsonFromStoreCookieFormDataToShowInUi" />
                </code>
            </details>

        </div>

    </section>
</template>

<script setup>

    // Vue
    import { computed, ref } from 'vue';

    // Pinia
    import { storeToRefs } from 'pinia';

    // Third party
    import { updatedDiff } from 'deep-object-diff';
    import cloneDeep from 'lodash/cloneDeep';
    import isEqual from 'lodash/isEqual';

    // Store
    import { useCookieFormDataStore } from '@/stores/cookie-form-data';

    // Components
    import CookieBanner from '@/components/CookieBanner/CookieBanner.vue';

    // Constants
    import { CONFIGURATION_DEFAULT } from '@/constants/configuration';

    // Utils
    import { timeout } from '@/utils/timer';

    // Setup
    const
        // Emits
        emit = defineEmits( [ 'reset', 'submit' ] )
        // Configuration
        , data = ref( cloneDeep( CONFIGURATION_DEFAULT ) )
        , userAction = ref(
            {
                name: '',
                value: '',
            }
        )
        // Store
        , cookieFormDataStore = useCookieFormDataStore()
        , { setCookieFormData, setCookieUserAction } = cookieFormDataStore
        , { cookieFormData, cookieUserAction } = storeToRefs( cookieFormDataStore )
        // UI
        , loading = ref( false )
        , isFormDataEqual = computed( () => isEqual( cookieFormData.value, data.value ) )
        , prettifiedJsonFromDataToShowInUi = computed( () => JSON.stringify( data.value, null, 2 ) )
        , prettifiedJsonFromStoreCookieFormDataToShowInUi = computed(
            () => JSON.stringify(
                {
                    'cookie-form-data': cookieFormData.value,
                    'cookie-user-action': cookieUserAction.value,
                },
                null,
                2
            )
        )
        // Events
        , onFormReset = () => {

            isDataSentToServer.value = false;

            data.value = cloneDeep( CONFIGURATION_DEFAULT );

            userAction.value = {
                name: '',
                value: '',
            };

            setCookieFormData( data.value );
            setCookieUserAction( userAction.value );

            emit( 'reset', data.value );

        }
        , onFormSubmit = async() => {

            console.info( 'Form data', data.value );
            console.info( 'Form data [diff]', diffKeysFromDefaultConfig.value );

            if( loading.value )
                return;

            loading.value = true;

            await timeout( 2500 ); // ?: Server fetch maybe

            setCookieFormData( data.value );

            loading.value = false; // eslint-disable-line require-atomic-updates

            emit( 'submit', data.value );

            // ?: RANDOM Simulate answer from a server
            isDataSentToServer.value = true;

            isDataSentToServerSimulateSuccess.value = Math.random() < 0.6; // ~60% probability of getting true
            simulatedServerMessage.value = isDataSentToServerSimulateSuccess.value ? 'Message correctly sent to the server! (random message)' : 'An error has occurred! (random message)';

        }
        , onCookieAccept = value => {

            console.info( 'cookie-accepted', value );

            userAction.value.name = 'accepted';
            userAction.value.value = value;

            setCookieUserAction( userAction.value );

        }
        , onCookieReject = value => {

            console.info( 'cookie-rejected', value );

            userAction.value.name = 'rejected';
            userAction.value.value = value;

            setCookieUserAction( userAction.value );

        }
        // Extra
        , diffKeysFromDefaultConfig = computed( () => updatedDiff( CONFIGURATION_DEFAULT, data.value ) )
        // Server form Messages
        , isDataSentToServer = ref( false )
        , isDataSentToServerSimulateSuccess = ref( true )
        , simulatedServerMessage = ref( '' )
    ;

</script>

<style
    scoped
    lang="scss"
    src="./ChallengeView.scss"
></style>
