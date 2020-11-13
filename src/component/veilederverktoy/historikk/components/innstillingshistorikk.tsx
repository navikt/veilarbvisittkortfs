import React from 'react';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import { Appstate } from '../../../../types/appstate';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import { useSelector } from 'react-redux';
import { InnstillingsHistorikk } from '../../../../api/data/innstillings-historikk';
interface OwnProps {
    innstillingsHistorikk: InnstillingsHistorikk;
}

const ESKALERING_MAX_LENGTH = 120;

type InnstillingHistorikkKomponentProps = OwnProps;

const typeTilTekst = {
    SATT_TIL_DIGITAL: 'Endret til digital oppfølging',
    SATT_TIL_MANUELL: 'Endret til manuell oppfølging',
    AVSLUTTET_OPPFOLGINGSPERIODE: 'Oppfølgingsperioden ble avsluttet',
    ESKALERING_STARTET: 'Varsel sendt',
    ESKALERING_STOPPET: 'Varsel deaktivert',
    KVP_STARTET: 'Kvalifiseringsprogram startet',
    KVP_STOPPET: 'Kvalifiseringsprogram avsluttet',
    VEILEDER_TILORDNET: 'Tildelt veileder',
};

function InnstillingHistorikkKomponent({ innstillingsHistorikk }: InnstillingHistorikkKomponentProps) {
    const { type, begrunnelse, dialogId } = innstillingsHistorikk;

    const fnr = useSelector((state: Appstate) => {
        OppfolgingSelector.selectFnr(state);
    });

    let begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(0, ESKALERING_MAX_LENGTH)}... `
            : `${begrunnelse} `;

    return (
        <div className="historikk__elem blokk-xs">
            <Element>{typeTilTekst[type]}</Element>
            <Normaltekst>
                {begrunnelseTekst}
                {dialogId && <Lenke href={`/veilarbpersonflatefs/${fnr}/dialog/${dialogId}`}>Les mer i dialog</Lenke>}
            </Normaltekst>
            <Undertekst>
                {`${moment(innstillingsHistorikk.dato).format('DD.MM.YYYY')} ${opprettetAvTekst(
                    innstillingsHistorikk.opprettetAv,
                    innstillingsHistorikk.opprettetAvBrukerId || ''
                )}`}
            </Undertekst>
        </div>
    );
}

export default InnstillingHistorikkKomponent;
