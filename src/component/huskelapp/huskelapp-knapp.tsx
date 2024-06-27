import withClickMetric from '../components/click-metric/click-metric';
import { trackAmplitude } from '../../amplitude/amplitude';
import HuskelappInaktivIkon from './ikon/Huskelappikon_stiplet.svg?react';
import HuskelappIkon from './ikon/Huskelappikon_bakgrunnsfarge.svg?react';
import { Button } from '@navikt/ds-react';

export interface HuskelappKnappProps {
    onClick: () => void;
    harHuskelappEllerArbeidsliste: boolean;
    isLoading: boolean;
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
            variant="tertiary"
            icon={props.harHuskelappEllerArbeidsliste ? <HuskelappIkon /> : <HuskelappInaktivIkon />}
            title={props.harHuskelappEllerArbeidsliste ? 'Endre huskelapp' : 'Opprett huskelapp'}
            onClick={onClick}
            loading={props.isLoading}
        />
    );
}

export default withClickMetric(HuskelappKnapp);
