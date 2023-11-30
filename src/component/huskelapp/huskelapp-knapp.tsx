import React from 'react';
import withClickMetric from '../components/click-metric/click-metric';
import KnappFss from '../components/knapp-fss/knapp-fss';
import { useDataStore } from '../../store/data-store';
import { trackAmplitude } from '../../amplitude/amplitude';
import { ReactComponent as HuskelappIkon } from './ikon/huskelapp.svg';
import { ReactComponent as HuskelappInaktivIkon } from './ikon/huskelapp-inaktiv.svg';
import './huskelapp.less';

export interface HuskelappKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereHuskelapp: boolean;
}

function HuskelappKnapp(props: HuskelappKnappProps) {
    const { huskelapp } = useDataStore();

    const onClick = () => {
        trackAmplitude({
            name: 'navigere',
            data: { lenketekst: 'visittkort-huskelapp-ikon', destinasjon: 'huskelapp' }
        });
        props.onClick();
    };

    return (
        <KnappFss className="huskelapp-knapp" onClick={onClick} hidden={props.hidden}>
            <HuskelappIkon />
        </KnappFss>
    );
}

export default withClickMetric(HuskelappKnapp);
