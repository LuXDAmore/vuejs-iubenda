import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

// Store
export const useCounterStore = defineStore(
    'counter',
    () => {

        const count = ref( 0 )
            , doubleCount = computed( () => count.value * 2 )
        ;

        /**
         * Increment
         */
        function increment() {

            count.value ++;

        }

        return {

            count,
            doubleCount,
            increment,

        };

    }
);
