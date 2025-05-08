import { opprettetAvTekst } from './opprettet-av';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { InnstillingHistorikkInnslag, InnstillingsHistorikkType } from '../../../../api/veilarboppfolging';
import LenkeTilDialog from '../../../components/dialoglenke/dialoglenke';
import { BodyShort, Detail } from '@navikt/ds-react';

interface InnstillingHistorikkKomponentProps {
    innstillingsHistorikk: InnstillingHistorikkInnslag;
}

const ESKALERING_MAX_LENGTH = 120;

type InnstillingsHistorikkTypeTilTekst = {
    [key in InnstillingsHistorikkType | 'ESKALERING_STARTET' | 'ESKALERING_STOPPET']: string;
};

const typeTilTekst: InnstillingsHistorikkTypeTilTekst = {
    SATT_TIL_DIGITAL: 'Endret til digital oppfølging',
    SATT_TIL_MANUELL: 'Endret til manuell oppfølging',
    STARTET_OPPFOLGINGSPERIODE: 'Oppfølgingsperioden ble startet',
    AVSLUTTET_OPPFOLGINGSPERIODE: 'Oppfølgingsperioden ble avsluttet',
    REAKTIVERT_OPPFOLGINGSPERIODE: 'Oppfølgingsperioden ble reaktivert',
    KVP_STARTET: 'Kvalifiseringsprogram startet',
    KVP_STOPPET: 'Kvalifiseringsprogram avsluttet',
    VEILEDER_TILORDNET: 'Tildelt veileder',
    ESKALERING_STARTET: 'Varsel sendt', // TODO Typefiksing: Dette alternativet ikkje eigentleg gyldig som input i komponenten - Ingrid, 2024-02-02
    ESKALERING_STOPPET: 'Varsel deaktivert', // TODO Typefiksing: Dette alternativet ikkje eigentleg gyldig som input i komponenten - Ingrid, 2024-02-02
    OPPFOLGINGSENHET_ENDRET: 'Oppfølgingsenhet endret'
};

function InnstillingHistorikkKomponent({ innstillingsHistorikk }: InnstillingHistorikkKomponentProps) {
    const { type, begrunnelse, dialogId } = innstillingsHistorikk;

    const begrunnelseTekst =
        begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
            ? `${begrunnelse.substring(0, ESKALERING_MAX_LENGTH)}... `
            : `${begrunnelse} `;

    return (
        <div className="historikk__elem">
            <BodyShort size="small" weight="semibold">
                {typeTilTekst[type]}
            </BodyShort>
            <BodyShort size="small">
                {begrunnelseTekst}
                {dialogId && <LenkeTilDialog dialogId={dialogId}>Les mer i dialog</LenkeTilDialog>}
            </BodyShort>
            <Detail>{`${toSimpleDateStr(innstillingsHistorikk.dato)} ${opprettetAvTekst(
                innstillingsHistorikk.opprettetAv,
                innstillingsHistorikk.opprettetAvBrukerId || '',
                innstillingsHistorikk.opprettetAvBrukerNavn
            )}`}</Detail>
        </div>
    );
}

export default InnstillingHistorikkKomponent;
