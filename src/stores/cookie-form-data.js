// Vue
import { ref } from 'vue';

// Pinia
import { defineStore } from 'pinia';

// Store
export const useCookieFormDataStore = defineStore(
    'cookieFormData',
    () => {

        const
            // State
            cookieFormData = ref( {} )
            , cookieUserAction = ref( {} )
            // Methods
            , setCookieFormData = ( value = {} ) => {

                cookieFormData.value = { ... value };

            }
            , setCookieUserAction = ( value = {} ) => {

                cookieUserAction.value = { ... value };

            }
        ;

        return {

            cookieFormData,
            cookieUserAction,

            setCookieFormData,
            setCookieUserAction,

        };

    }
);
