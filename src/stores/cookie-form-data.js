// Vue
import { ref } from 'vue';

// Pinia
import { defineStore } from 'pinia';

// Third party
import cloneDeep from 'lodash/cloneDeep';

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

                cookieFormData.value = cloneDeep( value );

            }
            , setCookieUserAction = ( value = {} ) => {

                cookieUserAction.value = cloneDeep( value );

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
