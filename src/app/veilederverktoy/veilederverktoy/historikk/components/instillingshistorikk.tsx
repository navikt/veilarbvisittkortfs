import { InnstillingsHistorikk } from '../../../../../types/innstillings-historikk';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import { Appstate } from '../../../../../types/appstate';
import OppfolgingSelector from '../../../../../store/oppfolging/selector';
import { useDispatch, useSelector } from 'react-redux';
import { hentEnhetNavn } from '../../../../../store/tildel-veileder/actions';
import { useEffect } from 'react';
import VeilederSelector from '../../../../../store/tildel-veileder/selector';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface OwnProps {
    instillingsHistorikk: InnstillingsHistorikk;
}

const ESKALERING_MAX_LENGTH = 120;

type InnstillingHistorikkKomponentProps = OwnProps;

function erEnhetEndret(type: string): boolean {
    return 'OPPFOLGINGSENHET_ENDRET' === type;
}

function InnstillingHistorikkKomponent({ instillingsHistorikk }: InnstillingHistorikkKomponentProps) {
    const {type, begrunnelse, dialogId, enhet} = instillingsHistorikk;

    const dispatch = useDispatch();

    const laster = useSelector((state: Appstate) =>
        VeilederSelector.selectVeilederStatus(state));
    const fnr = useSelector((state: Appstate) => {
        OppfolgingSelector.selectFnr(state);
    });
    const enhetNavn = useSelector((state: Appstate) => {
        return VeilederSelector.selectEnhetNavn(state);
    });

    const typeErEnhetsEndring = erEnhetEndret(type);

    let begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(
            0,
            ESKALERING_MAX_LENGTH
            )}... `
            : `${begrunnelse} `;

    if (typeErEnhetsEndring) {
        begrunnelseTekst = `${begrunnelseTekst} ${enhetNavn}`;
    }

    useEffect(() => {
        if (typeErEnhetsEndring && !!enhet) {
            dispatch(hentEnhetNavn(enhet));
        }
    }, [dispatch]);

    if (laster || (typeErEnhetsEndring && enhetNavn === '')) {
        return <NavFrontendSpinner type="XL"/>;
    }

    return (
        <div className="historikk__elem blokk-xs">
            <Element>
                <FormattedMessage id={`innstillinger.modal.historikk-${type.toLowerCase()}`}/>
            </Element>
            <Normaltekst>
                {begrunnelseTekst}
                {dialogId && <Lenke href={`/veilarbpersonflatefs/${fnr}/dialog/${dialogId}`}>Les mer i dialog</Lenke>}
            </Normaltekst>
            <Undertekst>
                {`${moment(instillingsHistorikk.dato).format('DD.MM.YYYY')} ${opprettetAvTekst(instillingsHistorikk.opprettetAv, instillingsHistorikk.opprettetAvBrukerId || '')}`}
            </Undertekst>
        </div>
    );
}

export default InnstillingHistorikkKomponent;