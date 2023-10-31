import React from 'react';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../../store/app-store';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { EskaleringsvarselHistorikkInnslag } from '../../../../api/veilarbdialog';
import LenkeTilDialog from '../../../components/dialoglenke/dialoglenke';

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

    let begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(0, ESKALERING_MAX_LENGTH)}... `
            : `${begrunnelse} `;

    return (
        <div className="historikk__elem blokk-xs">
            <Element>{overskrift}</Element>
            <Normaltekst>
                {begrunnelseTekst}
                <LenkeTilDialog dialogId={innslag.tilhorendeDialogId}>Les mer i dialog</LenkeTilDialog>
            </Normaltekst>
            <Undertekst>{`${toSimpleDateStr(dato)} av ${utfortAv}${
                utfortAvBrukerNavn ? ` (${utfortAvBrukerNavn})` : ''
            }`}</Undertekst>
        </div>
    );
}

export default EskaleringsvarselHistorikkKomponent;
