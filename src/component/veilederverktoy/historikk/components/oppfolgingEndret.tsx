import { useEffect } from 'react';
import { Alert, BodyShort, Detail, Loader } from '@navikt/ds-react';
import { opprettetAvTekst } from './opprettet-av';
import { hasAnyFailed, isAnyLoading } from '../../../../api/utils';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { InnstillingHistorikkInnslag } from '../../../../api/veilarboppfolging';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';
import { fetchEnhetNavn } from '../../../../api/veilarbveileder';

interface Props {
    historikkElement: InnstillingHistorikkInnslag;
    erGjeldendeEnhet: boolean;
}

export function OppfolgingEnhetEndret({ historikkElement, erGjeldendeEnhet }: Props) {
    const { enhet, dato, opprettetAv, opprettetAvBrukerId } = historikkElement;
    const enhetNavnFetcher = useAxiosFetcher(fetchEnhetNavn);

    const enhetNavn = enhetNavnFetcher.data?.navn;

    useEffect(() => {
        if (enhet) {
            enhetNavnFetcher.fetch(enhet);
        }
    }, [enhet]);

    if (isAnyLoading(enhetNavnFetcher)) {
        return <Loader size="2xlarge" />;
    } else if (hasAnyFailed(enhetNavnFetcher)) {
        return <Alert variant="error">Noe gikk galt</Alert>;
    } else if (!enhetNavn) {
        return null;
    }

    const begrunnelseTekst = erGjeldendeEnhet
        ? `Oppfølgingsenhet ${enhet} ${enhetNavn}`
        : `Ny oppfølgingsenhet ${enhet} ${enhetNavn}`;

    return (
        <div className="historikk__elem" key={dato}>
            <BodyShort size="small" weight="semibold">
                {erGjeldendeEnhet ? 'Gjeldende oppfølgingsenhet' : 'Oppfølgingsenhet endret'}
            </BodyShort>
            <BodyShort size="small">{begrunnelseTekst}</BodyShort>
            <Detail>{`${toSimpleDateStr(dato)} ${opprettetAvTekst(opprettetAv, opprettetAvBrukerId || '')}`}</Detail>
        </div>
    );
}
