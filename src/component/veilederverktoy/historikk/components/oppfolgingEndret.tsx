import { useEffect } from 'react';
import { BodyShort, Detail, Skeleton } from '@navikt/ds-react';
import { opprettetAvTekst } from './opprettet-av';
import { isAnyLoading } from '../../../../api/utils';
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
    }, [enhet, enhetNavnFetcher.fetch]);

    if (isAnyLoading(enhetNavnFetcher)) {
        return (
            <div className="historikk__elem" key={dato}>
                <BodyShort size="small" weight="semibold">
                    <Skeleton variant="text" width="100%" />
                </BodyShort>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="40%" />
            </div>
        );
    }

    const begrunnelseTekst = erGjeldendeEnhet
        ? `Oppfølgingsenhet ${enhet} ${enhetNavn || '<ukjent navn>'}`
        : `Ny oppfølgingsenhet ${enhet} ${enhetNavn || '<ukjent navn>'}`;

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
