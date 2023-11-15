import React, { useEffect } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import { Alert } from '@navikt/ds-react';
import { hasAnyFailed, isAnyLoading } from '../../../../api/utils';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { InnstillingHistorikkInnslag } from '../../../../api/veilarboppfolging';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';
import { fetchEnhetNavn } from '../../../../api/veilarbveileder';

export function OppfolgingEnhetEndret(props: {
    historikkElement: InnstillingHistorikkInnslag;
    erGjeldendeEnhet: boolean;
}) {
    const { enhet, dato, opprettetAv, opprettetAvBrukerId } = props.historikkElement;
    const enhetNavnFetcher = useAxiosFetcher(fetchEnhetNavn);

    const enhetNavn = enhetNavnFetcher.data?.navn;

    useEffect(() => {
        if (enhet) {
            enhetNavnFetcher.fetch(enhet);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enhet]);

    if (isAnyLoading(enhetNavnFetcher)) {
        return <NavFrontendSpinner type="XL" />;
    } else if (hasAnyFailed(enhetNavnFetcher)) {
        return <Alert variant="error">Noe gikk galt</Alert>;
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
