<template>
    <div class="cookie-banner">

        <div class="texts">

            <h4
                v-if="data.banner?.title"
                class="title"
                v-text="data.banner.title"
            />

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

        </div>

        <div class="actions">

            <button
                v-if="data.banner?.acceptButtonDisplay"
                type="button"
                @click="emit( 'accept' )"
            >
                Accept
            </button>
            <button
                v-if="data.banner?.closeButtonDisplay"
                type="button"
                @click="emit( 'close' )"
            >
                Close
            </button>
            <button
                v-if="data.banner?.rejectButtonDisplay"
                type="button"
                @click="emit( 'reject' )"
            >
                Reject
            </button>

        </div>

    </div>
</template>

<script setup>

    // Vue
    import { computed, defineProps } from 'vue';

    // Constants
    import { CONFIGURATION_DEFAULT } from '@/constants/configuration';

    // Setup
    const
        // Props
        props = defineProps(
            {
                data: {
                    type: Object,
                    default: () => ( { ... CONFIGURATION_DEFAULT } ),
                },
            }
        )
        // Emits
        , emit = defineEmits(
            [
                'accept',
                'close',
                'reject',
            ]
        )
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
    ;

</script>

<style
    scoped
    lang="scss"
    src="./CookieBanner.scss"
></style>
