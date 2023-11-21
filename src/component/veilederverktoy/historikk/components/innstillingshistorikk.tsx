import React from 'react';
import { opprettetAvTekst } from './opprettet-av';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { InnstillingHistorikkInnslag } from '../../../../api/veilarboppfolging';
import LenkeTilDialog from '../../../components/dialoglenke/dialoglenke';
import {BodyLong, BodyShort, Heading} from "@navikt/ds-react";

interface InnstillingHistorikkKomponentProps {
    innstillingsHistorikk: InnstillingHistorikkInnslag;
}

const ESKALERING_MAX_LENGTH = 120;

const typeTilTekst = {
    SATT_TIL_DIGITAL: 'Endret til digital oppfølging',
    SATT_TIL_MANUELL: 'Endret til manuell oppfølging',
    AVSLUTTET_OPPFOLGINGSPERIODE: 'Oppfølgingsperioden ble avsluttet',
    ESKALERING_STARTET: 'Varsel sendt',
    ESKALERING_STOPPET: 'Varsel deaktivert',
    KVP_STARTET: 'Kvalifiseringsprogram startet',
    KVP_STOPPET: 'Kvalifiseringsprogram avsluttet',
    VEILEDER_TILORDNET: 'Tildelt veileder'
};

function InnstillingHistorikkKomponent({ innstillingsHistorikk }: InnstillingHistorikkKomponentProps) {
    const { type, begrunnelse, dialogId } = innstillingsHistorikk;

    let begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(0, ESKALERING_MAX_LENGTH)}... `
            : `${begrunnelse} `;

    return (
        <div className="historikk__elem blokk-xs">
            <Heading level="2" size="medium">{typeTilTekst[type]}</Heading>
            <BodyShort>
                {begrunnelseTekst}
                {dialogId && <LenkeTilDialog dialogId={dialogId}>Les mer i dialog</LenkeTilDialog>}
            </BodyShort>
            <BodyLong>
                {`${toSimpleDateStr(innstillingsHistorikk.dato)} ${opprettetAvTekst(
                    innstillingsHistorikk.opprettetAv,
                    innstillingsHistorikk.opprettetAvBrukerId || '',
                    innstillingsHistorikk.opprettetAvBrukerNavn
                )}`}
            </BodyLong>
        </div>
    );
}

export default InnstillingHistorikkKomponent;
