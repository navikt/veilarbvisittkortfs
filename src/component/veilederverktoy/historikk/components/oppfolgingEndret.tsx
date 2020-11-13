import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import moment from 'moment';
import { opprettetAvTekst } from './opprettet-av';
import VeilederApi from '../../../../api/veileder-api';
import useFetch, { isPending, hasData, hasError } from '@nutgaard/use-fetch';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { InnstillingsHistorikk } from '../../../../api/data/innstillings-historikk';
import { EnhetData } from '../../../../api/data/enhet';

export function OppfolgingEnhetEndret(props: { historikkElement: InnstillingsHistorikk; erGjeldendeEnhet: boolean }) {
    const { enhet, dato, opprettetAv, opprettetAvBrukerId } = props.historikkElement;

    const enhetNavn = useFetch<EnhetData>(VeilederApi.hentEnhetNavn(enhet!));

    if (isPending(enhetNavn)) {
        return <NavFrontendSpinner type="XL" />;
    } else if (hasError(enhetNavn)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (!hasData(enhetNavn)) {
        return null;
    }

    if (!enhetNavn || !enhetNavn.data || !enhetNavn.data.navn) {
        return null;
    }

    const begrunnelseTekst = props.erGjeldendeEnhet
        ? `Oppfølgingsenhet ${enhet} ${enhetNavn.data.navn}`
        : `Ny oppfølgingsenhet ${enhet} ${enhetNavn.data.navn}`;

    return (
        <div className="historikk__elem blokk-xs" key={dato}>
            <Element>{props.erGjeldendeEnhet ? 'Gjeldende oppfølgingsenhet' : 'Oppfølgingsenhet endret'}</Element>
            <Normaltekst>{begrunnelseTekst}</Normaltekst>
            <Undertekst>
                {`${moment(dato).format('DD.MM.YYYY')} ${opprettetAvTekst(opprettetAv, opprettetAvBrukerId || '')}`}
            </Undertekst>
        </div>
    );
}
