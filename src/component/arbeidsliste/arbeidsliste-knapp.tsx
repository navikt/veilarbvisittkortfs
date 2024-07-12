import ArbeidslistekategoriVisning from './arbeidslistekategori-visning';
import withClickMetric from '../components/click-metric/click-metric';
import { KategoriModell, useArbeidsliste } from '../../api/veilarbportefolje';
import { trackAmplitude } from '../../amplitude/amplitude';
import { Button } from '@navikt/ds-react';
import { useAppStore } from '../../store/app-store';
import { logMetrikk } from '../../util/logger';

export interface ArbeidslisteKnappProps {
    hidden: boolean;
    onClick: () => void;
}

function ArbeidslisteKnapp(props: ArbeidslisteKnappProps) {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { data: arbeidsliste } = useArbeidsliste(brukerFnr, visVeilederVerktoy);

    if (props.hidden) {
        return null;
    }
    const kategori = arbeidsliste?.kategori || KategoriModell.TOM;
    const arbeidslisteikon = arbeidsliste?.kategori;

    const onClick = () => {
        trackAmplitude({
            name: 'navigere',
            data: { lenketekst: 'visittkort-fargekategori-ikon', destinasjon: 'arbeidslista' }
        });
        logMetrikk('veilarbvisittkortfs.metrikker.visittkort.arbeidsliste-ikon', { kategori: arbeidslisteikon });
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
