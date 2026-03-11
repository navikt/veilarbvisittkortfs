import { toSimpleDateStr } from '../../../../util/date-utils';
import { KontorEndringsType, KontorHistorikkEntry } from '../../../../api/ao-oppfolgingskontor';
import { BodyShort, Detail } from '@navikt/ds-react';

interface KontorEndringHistorikkKomponentProps {
    kontorEndring: KontorHistorikkEntry;
}

const automatiskRutetTyper: Set<KontorEndringsType> = new Set([
    'AutomatiskRutetTilNOE',
    'AutomatiskNorgRuting',
    'AutomatiskNorgRutingFallback',
    'AutomatiskRutingArbeidsgiverFallback',
    'AutomatiskRutetTilNavItManglerGt',
    'AutomatiskRutetTilNavItGtErLand',
    'AutomatiskRutetTilNavItUgyldigGt',
    'AutomatiskRutetTilNavItIngenKontorFunnetForGt'
]);

const endringstypeTekst: Partial<Record<KontorEndringsType, string>> = {
    FlyttetAvVeileder: 'Bytte av oppfølgingskontor',
    StartKontorSattManueltAvVeileder: 'Oppfølgingskontor satt manuelt ved start',
    AutomatiskRutetTilNOE: 'Automatisk rutet til',
    AutomatiskNorgRuting: 'Automatisk rutet til',
    AutomatiskNorgRutingFallback: 'Automatisk rutet til',
    AutomatiskRutingArbeidsgiverFallback: 'Automatisk rutet til',
    AutomatiskRutetTilNavItManglerGt: 'Automatisk rutet til',
    AutomatiskRutetTilNavItGtErLand: 'Automatisk rutet til',
    AutomatiskRutetTilNavItUgyldigGt: 'Automatisk rutet til',
    AutomatiskRutetTilNavItIngenKontorFunnetForGt: 'Automatisk rutet til',
    FikkSkjerming: 'Kontor endret grunnet skjerming',
    FikkAddressebeskyttelse: 'Kontor endret grunnet adressebeskyttelse'
};

function hentTittel(kontorEndring: KontorHistorikkEntry): string {
    const baseTekst = endringstypeTekst[kontorEndring.endringsType] ?? 'Endring av oppfølgingskontor';
    if (kontorEndring.endringsType === 'FlyttetAvVeileder') {
        return `${baseTekst} til ${kontorEndring.kontorId} - ${kontorEndring.kontorNavn}`;
    }
    if (automatiskRutetTyper.has(kontorEndring.endringsType)) {
        return `${baseTekst} ${kontorEndring.kontorId} - ${kontorEndring.kontorNavn}`;
    }
    return baseTekst;
}

function endretAvTekst(kontorEndring: KontorHistorikkEntry): string {
    if (kontorEndring.endretAvType === 'VEILEDER') {
        return `av ${kontorEndring.endretAv}`;
    } else if (kontorEndring.endretAvType === 'SYSTEM') {
        return 'av system (automatisk oppdatering)';
    }
    return '';
}

function KontorEndringHistorikkKomponent({ kontorEndring }: KontorEndringHistorikkKomponentProps) {
    const tittel = hentTittel(kontorEndring);
    const erBytteAvKontor = kontorEndring.endringsType === 'FlyttetAvVeileder';

    return (
        <div className="historikk__elem">
            <BodyShort size="small" weight="semibold">
                {tittel}
            </BodyShort>
            {erBytteAvKontor && kontorEndring.fraKontorId ? (
                <BodyShort size="small">
                    Gammelt kontor: {kontorEndring.fraKontorId} - {kontorEndring.fraKontorNavn}
                </BodyShort>
            ) : (
                <BodyShort size="small">
                    {kontorEndring.kontorId} - {kontorEndring.kontorNavn}
                </BodyShort>
            )}
            <Detail>{`${toSimpleDateStr(kontorEndring.endretTidspunkt)} ${endretAvTekst(kontorEndring)}`}</Detail>
        </div>
    );
}

export default KontorEndringHistorikkKomponent;
