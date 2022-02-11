import React from 'react';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import Lenke from 'nav-frontend-lenker';
import { useAppStore } from '../../../../store/app-store';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { InnstillingsHistorikk } from '../../../../api/veilarboppfolging';

interface InnstillingHistorikkKomponentProps {
    innstillingsHistorikk: InnstillingsHistorikk;
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
    const { brukerFnr } = useAppStore();
    const { type, begrunnelse, dialogId } = innstillingsHistorikk;

    let begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(0, ESKALERING_MAX_LENGTH)}... `
            : `${begrunnelse} `;

    return (
        <div className="historikk__elem blokk-xs">
            <Element>{typeTilTekst[type]}</Element>
            <Normaltekst>
                {begrunnelseTekst}
                {dialogId && (
                    <Lenke href={`/veilarbpersonflatefs/${brukerFnr}/dialog/${dialogId}`}>Les mer i dialog</Lenke>
                )}
            </Normaltekst>
            <Undertekst>
                {`${toSimpleDateStr(innstillingsHistorikk.dato)} ${opprettetAvTekst(
                    innstillingsHistorikk.opprettetAv,
                    innstillingsHistorikk.opprettetAvBrukerId || ''
                )}`}
            </Undertekst>
        </div>
    );
}

export default InnstillingHistorikkKomponent;
