import { GlobalAlert } from '@navikt/ds-react';
import { toSimpleDateStr } from '../../../util/date-utils';

interface Props {
    inaktiveringsdato?: string | null;
}

export const InaktivIArenaAlert = ({ inaktiveringsdato }: Props) => {
    const formatertInaktiveringsdato = inaktiveringsdato ? toSimpleDateStr(inaktiveringsdato) : undefined;

    return (
        <GlobalAlert status="warning">
            <GlobalAlert.Header>
                <GlobalAlert.Title>Bruker er inaktivert</GlobalAlert.Title>
            </GlobalAlert.Header>
            <GlobalAlert.Content>
                Brukeren {formatertInaktiveringsdato ? `ble inaktivert ${formatertInaktiveringsdato}` : 'er inaktivert'}
                , og vil forsvinne ut av oppfølging innen 28 dager. Du kan likevel bytte kontor for bruker.
            </GlobalAlert.Content>
        </GlobalAlert>
    );
};
