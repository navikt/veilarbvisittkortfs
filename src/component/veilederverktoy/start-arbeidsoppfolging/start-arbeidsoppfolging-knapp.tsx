import { Dropdown } from '@navikt/ds-react';
import { EnvType, getEnv } from '../../../util/envUtil';

const env = getEnv();
const startArbeidsoppfolgingUrl: Record<`${EnvType}-${'ansatt' | 'intern'}`, string> = {
    [`${EnvType.prod}-ansatt`]: '??',
    [`${EnvType.dev}-ansatt`]: 'https://start-arbeidsoppfolging.ansatt.dev.nav.no',
    [`${EnvType.local}-ansatt`]: 'https://start-arbeidsoppfolging.ansatt.dev.nav.no',
    [`${EnvType.prod}-intern`]: 'https://start-arbeidsoppfolging.intern.nav.no',
    [`${EnvType.dev}-intern`]: 'https://inngar.intern.dev.nav.no',
    [`${EnvType.local}-intern`]: 'https://inngar.intern.dev.nav.no'
};
const url = startArbeidsoppfolgingUrl[`${env.type}-${env.ingressType}`];

export const StartArbeidsoppfolgingKnapp = ({
                                                underOppfolging,
                                                erIservIArena
                                            }: {
    underOppfolging: boolean;
    erIservIArena: boolean;
}) => {
    if (underOppfolging && !erIservIArena) return null;

    const buttonText = underOppfolging && erIservIArena
        ? 'Reaktiver bruker i Arena'
        : 'Start arbeidsrettet oppfølging';

    return (
        <Dropdown.Menu.List.Item as="a" href={url}>
            {buttonText}
        </Dropdown.Menu.List.Item>
    );
};
