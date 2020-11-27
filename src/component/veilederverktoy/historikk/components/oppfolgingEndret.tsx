import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { InnstillingsHistorikk } from '../../../../api/data/innstillings-historikk';
import { useFetchEnhetNavn } from '../../../../api/api';
import { hasAnyFailed, isAnyLoading } from '../../../../api/utils';
import { toSimpleDateStr } from '../../../../util/date-utils';

export function OppfolgingEnhetEndret(props: { historikkElement: InnstillingsHistorikk; erGjeldendeEnhet: boolean }) {
    const { enhet, dato, opprettetAv, opprettetAvBrukerId } = props.historikkElement;
    const fetchEnhetNavn = useFetchEnhetNavn(enhet!);

    const enhetNavn = fetchEnhetNavn.data?.navn;

    if (isAnyLoading(fetchEnhetNavn)) {
        return <NavFrontendSpinner type="XL" />;
    } else if (hasAnyFailed(fetchEnhetNavn)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (!enhetNavn) {
        return null;
    }

    const begrunnelseTekst = props.erGjeldendeEnhet
        ? `Oppfølgingsenhet ${enhet} ${enhetNavn}`
        : `Ny oppfølgingsenhet ${enhet} ${enhetNavn}`;

    return (
        <div className="historikk__elem blokk-xs" key={dato}>
            <Element>{props.erGjeldendeEnhet ? 'Gjeldende oppfølgingsenhet' : 'Oppfølgingsenhet endret'}</Element>
            <Normaltekst>{begrunnelseTekst}</Normaltekst>
            <Undertekst>
                {`${toSimpleDateStr(dato)} ${opprettetAvTekst(opprettetAv, opprettetAvBrukerId || '')}`}
            </Undertekst>
        </div>
    );
}
