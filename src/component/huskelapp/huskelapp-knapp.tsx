import React from 'react';
import withClickMetric from '../components/click-metric/click-metric';
import { trackAmplitude } from '../../amplitude/amplitude';
import { ReactComponent as HuskelappInaktivIkon } from './ikon/huskelapp-inaktiv.svg';
import { ReactComponent as HuskelappIkon } from './ikon/huskelapp.svg';
import './huskelapp.less';
import { Button } from '@navikt/ds-react';
import { CogIcon } from '@navikt/aksel-icons';

export interface HuskelappKnappProps {
    hidden: boolean;
    onClick: () => void;
    harHuskelapp: boolean;
}

function HuskelappKnapp(props: HuskelappKnappProps) {
    const onClick = () => {
        trackAmplitude({
            name: 'navigere',
            data: { lenketekst: 'visittkort-huskelapp-ikon', destinasjon: 'huskelapp' }
        });
        props.onClick();
    };

    return (
        <Button
            icon={props.harHuskelapp ? <HuskelappIkon /> : <HuskelappInaktivIkon />}
            onClick={onClick}
            hidden={props.hidden}
            variant={'tertiary-neutral'}
            size={'medium'}
        ></Button>
    );
}

export default withClickMetric(HuskelappKnapp);
