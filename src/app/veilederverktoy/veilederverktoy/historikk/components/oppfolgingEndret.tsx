import {default as React, useEffect, useState} from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import {Element, Normaltekst, Undertekst} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import moment from "moment";
import {opprettetAvTekst} from "./opprettet-av";
import {InnstillingsHistorikk} from "../../../../../types/innstillings-historikk";
import VeilederApi from "../../../../../api/veileder-api"

export function OppfolgingEnhetEndret(props: {historikkElement: InnstillingsHistorikk, erGjeldendeEnhet: boolean}) {

    const [laster, setLaster] = useState<boolean>(true);
    const [enhetNavn, setEnhetNavn] = useState<string>("");

    const {enhet, dato, opprettetAv, opprettetAvBrukerId} = props.historikkElement;


    useEffect(() => {
        if(enhet) {
            VeilederApi.hentEnhetNavn(enhet).then(res => {
                setEnhetNavn(res.navn);
                setLaster(false)
            })
        }
    },[enhet]);

    if (laster) {
        return <NavFrontendSpinner type="XL"/>;
    }

    const tittelTekst =  props.erGjeldendeEnhet
        ? 'innstillinger.modal.historikk-gjeldende_oppfolgingsenhet'
        : 'innstillinger.modal.historikk-oppfolgingsenhet_endret';

    const begrunnelseTekst =  props.erGjeldendeEnhet
        ? `Oppfølgingsenhet ${enhet} ${enhetNavn}`
        : `Ny oppfølgingsenhet ${enhet} ${enhetNavn}`;

    return (
        <div className="historikk__elem blokk-xs" key={dato}>
            <Element>
                <FormattedMessage id={`${tittelTekst}`}/>
            </Element>
            <Normaltekst>
                {begrunnelseTekst}
            </Normaltekst>
            <Undertekst>
                {`${moment(dato).format('DD.MM.YYYY')} ${opprettetAvTekst(opprettetAv, opprettetAvBrukerId || '')}`}
            </Undertekst>
        </div>
    );
}
