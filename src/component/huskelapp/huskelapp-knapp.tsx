import React from 'react';
import withClickMetric from '../components/click-metric/click-metric';
import { trackAmplitude } from '../../amplitude/amplitude';
import HuskelappInaktivIkon from './ikon/huskelapp-inaktiv.svg?react';
import HuskelappIkon from './ikon/huskelapp.svg?react';
import './huskelapp.less';
import { Button } from '@navikt/ds-react';

export interface HuskelappKnappProps {
    hidden: boolean;
    onClick: () => void;
    harHuskelappEllerArbeidsliste: boolean;
}

function HuskelappKnapp(props: HuskelappKnappProps) {
    if (props.hidden) {
        return null;
    }
    const onClick = () => {
        trackAmplitude({
            name: 'navigere',
            data: { lenketekst: 'visittkort-huskelapp-ikon', destinasjon: 'huskelapp' }
        });
        props.onClick();
    };

    return (
        <Button
            icon={props.harHuskelappEllerArbeidsliste ? <HuskelappIkon /> : <HuskelappInaktivIkon />}
            onClick={onClick}
            variant="tertiary-neutral"
            size="medium"
        />
    );
}

export default withClickMetric(HuskelappKnapp);
