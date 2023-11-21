import React from 'react';
import { useAppStore } from '../../../../store/app-store';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { EskaleringsvarselHistorikkInnslag } from '../../../../api/veilarbdialog';
import LenkeTilDialog from '../../../components/dialoglenke/dialoglenke';
import {BodyLong, Heading} from "@navikt/ds-react";

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
            <Heading level="2" size="medium">{overskrift}</Heading>
            <BodyLong>
                {begrunnelseTekst}
                <LenkeTilDialog dialogId={innslag.tilhorendeDialogId}>
                    Les mer i dialog
                </LenkeTilDialog>
            </BodyLong>
            <BodyLong>{`${toSimpleDateStr(dato)} av ${utfortAv}${
                utfortAvBrukerNavn ? ` (${utfortAvBrukerNavn})` : ''
            }`}</BodyLong>
        </div>
    );
}

export default EskaleringsvarselHistorikkKomponent;
