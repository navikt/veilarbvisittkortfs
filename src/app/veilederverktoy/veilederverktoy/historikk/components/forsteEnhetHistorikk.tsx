import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { opprettetAvTekst } from './opprettet-av';
import * as React from 'react';
import { useEffect } from 'react';
import { InnstillingsHistorikk } from '../../../../../types/innstillings-historikk';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../types/appstate';
import VeilederSelector from '../../../../../store/tildel-veileder/selector';
import { hentEnhetNavn } from '../../../../../store/tildel-veileder/actions';
import NavFrontendSpinner from 'nav-frontend-spinner';

export function ForsteEnhetsEndringKomponent(forsteEnhet: InnstillingsHistorikk) {
    const { enhet } = forsteEnhet;
    const dispatch = useDispatch();

    const laster = useSelector((state: Appstate) =>
        VeilederSelector.selectVeilederStatus(state));
    const enhetNavn = useSelector((state: Appstate) => {
        return VeilederSelector.selectEnhetNavn(state);
    });

    useEffect(() => {
        if (!!enhet) {
            dispatch(hentEnhetNavn(enhet));
        }
    }, );

    if (laster) {
        return <NavFrontendSpinner type="XL"/>;
    }

    const begrunnelseTekst = `Oppfølgingsenhet ${enhet} ${enhetNavn}`;
    return (
        <div className="historikk__elem blokk-xs" key={forsteEnhet.dato}>
            <Element>
                <FormattedMessage id={`innstillinger.modal.historikk-gjeldende_oppfolgingsenhet`}/>
            </Element>
            <Normaltekst>
                {begrunnelseTekst}
            </Normaltekst>
            <Undertekst>
                {`${moment(forsteEnhet.dato).format('DD.MM.YYYY')} ${opprettetAvTekst(forsteEnhet.opprettetAv, forsteEnhet.opprettetAvBrukerId || '')}`}
            </Undertekst>
        </div>
    );
}