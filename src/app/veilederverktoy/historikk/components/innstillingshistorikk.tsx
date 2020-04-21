import { InnstillingsHistorikk } from '../../../../types/innstillings-historikk';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import { Appstate } from '../../../../types/appstate';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import { useSelector } from 'react-redux';
interface OwnProps {
    innstillingsHistorikk: InnstillingsHistorikk;
}

const ESKALERING_MAX_LENGTH = 120;

type InnstillingHistorikkKomponentProps = OwnProps;

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
            <Element>
                <FormattedMessage id={`innstillinger.modal.historikk-${type.toLowerCase()}`} />
            </Element>
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
