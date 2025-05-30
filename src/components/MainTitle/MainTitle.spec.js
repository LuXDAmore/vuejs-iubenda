import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import MainTitle from './MainTitle.vue';

describe(
    'MainTitle',
    () => {

        it(
            'renders properly',
            () => {

                const wrapper = mount( MainTitle, { props: { msg: 'Hello Iubenda' } } );

                expect( wrapper.text() ).toContain( 'Hello Iubenda' );

            }
        );

    }
);
