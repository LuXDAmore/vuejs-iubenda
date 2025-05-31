export const CONFIGURATION_DEFAULT = {

    banner: {
        acceptButtonDisplay: false, // visibility of the Accept button
        closeButtonDisplay: true, // visibility of the Close button
        closeButtonRejects: false, // clicking the Close button should accept( `false` ) or reject( `true` ) the consent
        rejectButtonDisplay: false, // visibility of the Reject button
        title: 'Notice', // Text field that will change the displayed title of the banner
    },

    ccpa: false,
    consentByScroll: false,

    gdpr: true,
    perPurposeConsent: false,
    targetCountries: 'EU', // Possible values: 'EU', 'US', 'world'

};
