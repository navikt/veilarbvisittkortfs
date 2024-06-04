import ArbeidslistekategoriVisning from './arbeidslistekategori-visning';
import withClickMetric from '../components/click-metric/click-metric';
import { useDataStore } from '../../store/data-store';
import { KategoriModell } from '../../api/veilarbportefolje';
import { trackAmplitude } from '../../amplitude/amplitude';
import { Button } from '@navikt/ds-react';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
    kanRedigereArbeidsliste: boolean;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    const { arbeidsliste } = useDataStore();

    if (props.hidden) {
        return null;
    }

    const kategori = arbeidsliste?.kategori || KategoriModell.TOM;

    const onClick = () => {
        trackAmplitude({
            name: 'navigere',
            data: { lenketekst: 'visittkort-fargekategori-ikon', destinasjon: 'arbeidslista' }
        });
        props.onClick();
    };

    return (
        <Button
            icon={<ArbeidslistekategoriVisning kategori={kategori} />}
            className="arbeidsliste-knapp"
            onClick={onClick}
            variant="tertiary"
        />
    );
}

export default withClickMetric(ArbeidslisteKnapp);
