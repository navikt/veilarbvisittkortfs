import { BodyShort, Detail, Skeleton } from '@navikt/ds-react';
import { opprettetAvTekst } from './opprettet-av';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { InnstillingHistorikkInnslag } from '../../../../api/veilarboppfolging';
import { useEnhetsNavn } from '../../../../api/veilarbveileder';

interface Props {
    historikkElement: InnstillingHistorikkInnslag;
    erGjeldendeEnhet: boolean;
}

export function OppfolgingEnhetEndret({ historikkElement, erGjeldendeEnhet }: Props) {
    const { enhet, dato, opprettetAv, opprettetAvBrukerId } = historikkElement;
    const { enhetsNavnData, enhetsNavnLoding } = useEnhetsNavn(enhet || undefined);

    if (enhetsNavnLoding) {
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
        ? `Oppfølgingsenhet ${enhet} ${enhetsNavnData?.navn || '<ukjent navn>'}`
        : `Ny oppfølgingsenhet ${enhet} ${enhetsNavnData?.navn || '<ukjent navn>'}`;

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
