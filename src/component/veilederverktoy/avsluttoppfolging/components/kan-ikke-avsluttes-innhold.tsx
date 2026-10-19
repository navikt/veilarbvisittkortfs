import { BodyShort } from '@navikt/ds-react';
import { AvslutningStatus } from '../../../../api/veilarboppfolging';

interface Props {
    status: AvslutningStatus | undefined;
}

export function KanIkkeAvsluttesInnhold({ status }: Props) {
    return (
        <div className="text-center">
            <BodyShort className="max-w-[66ch] text-left">
                Du kan <span className="font-bold">ikke</span> avslutte oppfølgingsperioden fordi:
            </BodyShort>
            <ul className="text-left list-[initial] [margin-block:var(--ax-space-8)] [padding-left:var(--ax-space-24)]">
                {status?.harAktiveTiltaksdeltakelser && <li>Brukeren har aktive arbeidsmarkedstiltak.</li>}
                {status?.underKvp && <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>}
                {status?.erDeltakerIUngdomsprogrammet && (
                    <li>Brukeren deltar i Ungdomsprogrammet. Deltakelse i Ungdomsprogrammet må avsluttes først.</li>
                )}
                {status?.erArbeidssoeker && <li>Brukeren er arbeidssøker.</li>}
                {status?.harAap && <li>Brukeren har AAP.</li>}
            </ul>
        </div>
    );
}
