import { InnstillingsHistorikk } from '../../../../../types/innstillings-historikk';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import { Appstate } from '../../../../../types/appstate';
import OppfolgingSelector from '../../../../../store/oppfolging/selector';
import { connect } from 'react-redux';

interface OwnProps {
    instillingsHistorikk: InnstillingsHistorikk;
}

interface StateProps {
    fnr: string;
}

const ESKALERING_MAX_LENGTH = 120;

type InnstillingHistorikkKomponentProps = StateProps & OwnProps;

function InnstillingHistorikkKomponent({instillingsHistorikk, fnr}: InnstillingHistorikkKomponentProps) {
    const {type, begrunnelse, dialogId} = instillingsHistorikk;
    const begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(
            0,
            ESKALERING_MAX_LENGTH
            )}... `
            : `${begrunnelse} `;

    const tekst = begrunnelse ? begrunnelseTekst : `Brukeren er tildelt veileder ${instillingsHistorikk.veileder}`;

    return (
        <div className="historikk__elem blokk-xs">
            <Element>
                <FormattedMessage id={`innstillinger.modal.historikk-${type.toLowerCase()}`}/>
            </Element>
            <Normaltekst>
                {tekst}
                {dialogId && <Lenke href={`/veilarbpersonflatefs/${fnr}/dialog/${dialogId}`}>Les mer i dialog</Lenke>}
            </Normaltekst>
            <Undertekst>
                {`${moment(instillingsHistorikk.dato).format('DD.MM.YYYY')} ${opprettetAvTekst(instillingsHistorikk.opprettetAv, instillingsHistorikk.opprettetAvBrukerId || '')}`}
            </Undertekst>
        </div>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
   fnr: OppfolgingSelector.selectFnr(state)
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(InnstillingHistorikkKomponent);