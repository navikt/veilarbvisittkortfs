import { Dropdown } from '@navikt/ds-react';
import { EnvType, getEnv } from '../../../util/envUtil';

const env = getEnv();
const startArbeidsoppfolgingUrl: Record<`${EnvType}-${'ansatt' | 'intern'}`, string> = {
    [`${EnvType.prod}-ansatt`]: '??',
    [`${EnvType.dev}-ansatt`]: 'https://start-arbeidsoppfolging.ansatt.dev.nav.no',
    [`${EnvType.local}-ansatt`]: 'https://start-arbeidsoppfolging.ansatt.dev.nav.no',
    [`${EnvType.prod}-intern`]: '??',
    [`${EnvType.dev}-intern`]: 'https://inngar.intern.dev.nav.no',
    [`${EnvType.local}-intern`]: 'https://inngar.intern.dev.nav.no'
};
const url = startArbeidsoppfolgingUrl[`${env.type}-${env.ingressType}`];

export const StartArbeidsoppfolgingKnapp = () => {
    return (
        <Dropdown.Menu.List.Item as="a" href={url}>
            {'Start arbeidsoppfølging'}
        </Dropdown.Menu.List.Item>
    );
};
