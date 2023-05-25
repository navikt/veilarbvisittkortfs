import React, { useEffect } from 'react';
import { opprettetAvTekst } from './opprettet-av';
import { hasAnyFailed, isAnyLoading } from '../../../../api/utils';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { InnstillingHistorikkInnslag } from '../../../../api/veilarboppfolging';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';
import { fetchEnhetNavn } from '../../../../api/veilarbveileder';
import {Alert, BodyLong, BodyShort, Heading, Loader} from "@navikt/ds-react";

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
        return <Loader type="XL" />;
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
            <Heading level="2" size="medium">{props.erGjeldendeEnhet ? 'Gjeldende oppfølgingsenhet' : 'Oppfølgingsenhet endret'}</Heading>
            <BodyShort>{begrunnelseTekst}</BodyShort>
            <BodyLong>
                {`${toSimpleDateStr(dato)} ${opprettetAvTekst(opprettetAv, opprettetAvBrukerId || '')}`}
            </BodyLong>
        </div>
    );
}
