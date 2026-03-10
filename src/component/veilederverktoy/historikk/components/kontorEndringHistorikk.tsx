import { toSimpleDateStr } from '../../../../util/date-utils';
import { KontorEndringsType, KontorHistorikkEntry } from '../../../../api/ao-oppfolgingskontor';
import { BodyShort, Detail } from '@navikt/ds-react';

interface KontorEndringHistorikkKomponentProps {
    kontorEndring: KontorHistorikkEntry;
}

const endringstypeTekst: Partial<Record<KontorEndringsType, string>> = {
    FlyttetAvVeileder: 'Bytte av oppfølgingskontor',
    StartKontorSattManueltAvVeileder: 'Oppfølgingskontor satt manuelt ved start',
    AutomatiskRutetTilNOE: 'Automatisk rutet til nasjonal oppfølgingsenhet',
    AutomatiskNorgRuting: 'Automatisk rutet til lokalkontor',
    AutomatiskNorgRutingFallback: 'Automatisk rutet til kontor',
    AutomatiskRutingArbeidsgiverFallback: 'Automatisk rutet basert på arbeidsgivers adresse',
    AutomatiskRutetTilNavItManglerGt: 'Automatisk rutet til Nav IT',
    AutomatiskRutetTilNavItGtErLand: 'Automatisk rutet til Nav IT',
    AutomatiskRutetTilNavItUgyldigGt: 'Automatisk rutet til Nav IT',
    AutomatiskRutetTilNavItIngenKontorFunnetForGt: 'Automatisk rutet til Nav IT',
    FikkSkjerming: 'Kontor endret grunnet skjerming',
    FikkAddressebeskyttelse: 'Kontor endret grunnet adressebeskyttelse'
};

function endretAvTekst(kontorEndring: KontorHistorikkEntry): string {
    if (kontorEndring.endretAvType === 'VEILEDER') {
        return `av ${kontorEndring.endretAv}`;
    } else if (kontorEndring.endretAvType === 'SYSTEM') {
        return 'av system (automatisk oppdatering)';
    }
    return '';
}

function KontorEndringHistorikkKomponent({ kontorEndring }: KontorEndringHistorikkKomponentProps) {
    const tittel = endringstypeTekst[kontorEndring.endringsType] ?? 'Endring av oppfølgingskontor';

    return (
        <div className="historikk__elem">
            <BodyShort size="small" weight="semibold">
                {tittel}
            </BodyShort>
            <BodyShort size="small">
                {kontorEndring.kontorId} - {kontorEndring.kontorNavn}
            </BodyShort>
            <Detail>{`${toSimpleDateStr(kontorEndring.endretTidspunkt)} ${endretAvTekst(kontorEndring)}`}</Detail>
        </div>
    );
}

export default KontorEndringHistorikkKomponent;
