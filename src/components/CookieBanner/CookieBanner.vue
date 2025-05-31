<template>
    <div class="cookie-banner" :class="classes">

        <div class="texts">

            <h4
                v-if="props.data.banner?.title"
                class="title"
                v-text="props.data.banner.title"
            />

            <small class="cookie-text">

                We and selected third parties use cookies or similar technologies for technical purposes and, with your consent, for functionality, experience, measurement and “marketing (personalized ads)” as specified in the cookie policy.<br>
                You can freely give, deny, or withdraw your consent at any time by accessing the preferences panel. Denying consent may make related features unavailable.<br>

                <template v-if="props.data.banner.acceptButtonDisplay">
                    Use the “Accept” button to consent.
                </template>
                <template v-if="props.data.banner.rejectButtonDisplay">
                    Use the “Reject” button or close this notice to continue without accepting.
                </template>

            </small>

            <ul v-if="messages.length">
                <li v-for="message in messages" :key="message">
                    <h6
                        v-if="message"
                        class="message"
                        v-text="message"
                    />
                </li>
            </ul>
            <h6 v-else class="message">
                You're compliant with the rulez.
            </h6>

            <button
                class="close-button"
                type="button"
                @click="() => ( props.data.banner.closeButtonRejects ? emit( 'reject', true ) : emit( 'accept', false ) )"
            >
                &#215;
            </button>

        </div>

        <div class="actions">

            <button
                v-if="props.data.banner?.closeButtonDisplay"
                class="action-button background--default"
                type="button"
                @click="() => ( props.data.banner.closeButtonRejects ? emit( 'reject', true ) : emit( 'accept', false ) )"
            >
                Close
            </button>

            <span class="spacer" />

            <button
                v-if="props.data.banner?.rejectButtonDisplay"
                class="action-button"
                type="button"
                @click="() => emit( 'reject', true )"
            >
                Reject
            </button>
            <button
                v-if="props.data.banner?.acceptButtonDisplay"
                class="action-button"
                type="button"
                @click="() => emit( 'accept', true )"
            >
                Accept
            </button>

        </div>

    </div>
</template>

<script setup>

    // Vue
    import { computed } from 'vue';

    // Third party
    import cloneDeep from 'lodash/cloneDeep';

    // Constants
    import { CONFIGURATION_DEFAULT } from '@/constants/configuration';

    // Setup
    const
        // Props
        props = defineProps(
            {
                data: {
                    type: Object,
                    default: () => ( cloneDeep( CONFIGURATION_DEFAULT ) ),
                },
            }
        )
        // Emits
        , emit = defineEmits( [ 'accept', 'reject' ] )
        // Checks
        , isTargetCountryEuOrWorld = computed( () => ( props.data.targetCountries === 'EU' || props.data.targetCountries === 'world' ) )
        , isCompliantWithItalianLaw = computed(
            () => {

                if(
                    isTargetCountryEuOrWorld.value
                    && (
                        ( props.data.banner.closeButtonDisplay && ! props.data.banner.closeButtonRejects )
                        || ( ! props.data.banner.rejectButtonDisplay && ! props.data.banner.closeButtonDisplay )
                        || ( props.data.banner.rejectButtonDisplay && props.data.banner.closeButtonDisplay && ! props.data.banner.closeButtonRejects )
                    )
                )
                    return false;

                return true;

            }
        )
        , isCompliantWithItalianAndFrenchLaw = computed(
            () => {

                if( isTargetCountryEuOrWorld.value && props.data.consentbyScroll )
                    return false;

                return true;

            }
        )
        , isCompliantWithFrenchLaw = computed(
            () => {

                if( isTargetCountryEuOrWorld.value && ! props.data.perPurposeConsent )
                    return false;

                return true;

            }
        )
        // Ui
        , messages = computed(
            () => {

                const messages = [];

                if( ! isCompliantWithItalianLaw.value )
                    messages.push( 'Your selected settings are not compliant with laws in Italy.' );

                if( ! isCompliantWithFrenchLaw.value )
                    messages.push( 'Your selected settings are not compliant with laws in France.' );

                if( ! isCompliantWithItalianAndFrenchLaw.value )
                    messages.push( 'Your selected settings are not compliant with laws in France and Italy.' );

                return messages;

            }
        )
        , isCookieBannerCompliant = computed( () => ! messages.value.length )
        , classes = computed(
            () => (
                {
                    'cookie-banner--compliant': isCookieBannerCompliant.value,
                    'cookie-banner--error': ! isCookieBannerCompliant.value,
                }
            )
        )
    ;

</script>

<style
    scoped
    lang="scss"
    src="./CookieBanner.scss"
></style>
