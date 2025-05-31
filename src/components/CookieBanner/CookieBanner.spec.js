import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import CookieBanner from './CookieBanner.vue';

describe(
    'CookieBanner',
    () => {

        it(
            'renders properly values',
            () => {

                const wrapper = mount(
                    CookieBanner,
                    {
                        props: {
                            data: {

                                banner: {
                                    acceptButtonDisplay: true,
                                    closeButtonDisplay: true,
                                    closeButtonRejects: false,
                                    rejectButtonDisplay: true,
                                    title: 'Banner Title',
                                },

                                ccpa: false,
                                consentByScroll: false,

                                gdpr: true,
                                perPurposeConsent: false,
                                targetCountries: 'US',

                            }
                        }
                    }
                );

                expect( wrapper.text() ).toContain( 'Banner Title' );
                expect( wrapper.text() ).toContain( "You're compliant with the rulez" );

                expect( wrapper.text() ).toContain( 'Accept' );
                expect( wrapper.text() ).toContain( 'Reject' );

            }
        );

    }
);
