import { toSimpleDateStr } from '../../../../util/date-utils';
import { EskaleringsvarselHistorikkInnslag } from '../../../../api/veilarbdialog';
import LenkeTilDialog from '../../../components/dialoglenke/dialoglenke';
import { BodyShort, Detail } from '@navikt/ds-react';

interface EskaleringsvarselHistorikkKomponentProps {
    innslag: EskaleringsvarselHistorikkInnslag;
}

const ESKALERING_MAX_LENGTH = 120;

function EskaleringsvarselHistorikkKomponent({ innslag }: EskaleringsvarselHistorikkKomponentProps) {
    const utfortAv = innslag.avsluttetAv || innslag.opprettetAv;
    const utfortAvBrukerNavn = innslag.avsluttetAvBrukerNavn || innslag.opprettetAvBrukerNavn;
    const dato = innslag.avsluttetDato || innslag.opprettetDato;
    const begrunnelse = innslag.avsluttetBegrunnelse || innslag.opprettetBegrunnelse;
    const overskrift = innslag.avsluttetDato != null ? 'Varsel deaktivert' : 'Varsel sendt';

    const begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(0, ESKALERING_MAX_LENGTH)}... `
            : `${begrunnelse} `;

    return (
        <div className="historikk__elem">
            <BodyShort size="small" weight="semibold">
                {overskrift}
            </BodyShort>
            <BodyShort size="small">
                {begrunnelseTekst}
                <LenkeTilDialog dialogId={innslag.tilhorendeDialogId}>Les mer i dialog</LenkeTilDialog>
            </BodyShort>
            <Detail>{`${toSimpleDateStr(dato)} av ${utfortAv}${
                utfortAvBrukerNavn ? ` (${utfortAvBrukerNavn})` : ''
            }`}</Detail>
        </div>
    );
}

export default EskaleringsvarselHistorikkKomponent;
