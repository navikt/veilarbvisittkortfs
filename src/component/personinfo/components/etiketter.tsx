import { useEffect, useState } from 'react';
import { useDataStore } from '../../../store/data-store';
import { useAppStore } from '../../../store/app-store';
import './etiketter.less';
import {
    fetchProfileringFraArbeidssoekerregisteret,
    FullmaktData,
    OpplysningerOmArbeidssoekerMedProfilering
} from '../../../api/veilarbperson';
import { OppfolgingStatus, useOppfolgingsstatus } from '../../../api/veilarboppfolging';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { ifResponseHasData } from '../../../util/utils';
import { OrNothing, StringOrNothing } from '../../../util/type/utility-types';
import { Tag, TagProps } from '@navikt/ds-react';

interface Etikettprops extends Omit<TagProps, 'variant'> {
    visible: boolean | undefined;
}

const Advarsel = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="error" size="small" className="etikett" title={title}>
            {children}
        </Tag>
    );

const Info = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="info" size="small" className="etikett" title={title}>
            {children}
        </Tag>
    );

const Fokus = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="warning" size="small" className="etikett" title={title}>
            {children}
        </Tag>
    );

const BaseDod = ({ visible, title, children }: Etikettprops) =>
    visible && (
        <Tag variant="neutral" size="small" className="etikett etikett--mork" title={title}>
            {children}
        </Tag>
    );

function erBrukerSykmeldt(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return !!oppfolging && oppfolging.formidlingsgruppe === 'IARBS' && oppfolging.servicegruppe === 'VURDI';
}

function trengerVurdering(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return !!oppfolging && oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}

function trengerAEV(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return !!oppfolging && oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

function manglerVedtak(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return (
        !!oppfolging &&
        oppfolging.formidlingsgruppe !== 'ISERV' &&
        (oppfolging.servicegruppe === 'BKART' || oppfolging.servicegruppe === 'IVURD')
    );
}

function erFullmaktOmradeMedOppfolging(fullmaktListe: FullmaktData[]): boolean {
    return fullmaktListe
        .flatMap(fullmakt => fullmakt.omraade)
        .map(omraadeMedHandling => omraadeMedHandling.tema)
        .includes('Oppfølging');
}

function Etiketter() {
    const { brukerFnr } = useAppStore();
    const { data: oppfolgingsstatus } = useOppfolgingsstatus(brukerFnr);
    const { gjeldendeEskaleringsvarsel, oppfolging, personalia, verge, fullmakt, spraakTolk } = useDataStore();

    const [profilering, setProfilering] = useState<StringOrNothing>(null);

    const profileringFetcher = useAxiosFetcher(fetchProfileringFraArbeidssoekerregisteret);

    const pilot_toggle = false;
    useEffect(() => {
        if (brukerFnr && pilot_toggle) {
            profileringFetcher.fetch(brukerFnr).then(
                ifResponseHasData((data: OpplysningerOmArbeidssoekerMedProfilering) => {
                    setProfilering(data.profilering?.profilertTil);
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    function isEmpty(array: undefined | unknown[]): boolean {
        return !array || array.length === 0;
    }

    return (
        <div className="etikett-container">
            <BaseDod visible={!!personalia?.dodsdato}>Død</BaseDod>
            <Advarsel visible={!!personalia?.diskresjonskode}>Kode {personalia?.diskresjonskode}</Advarsel>
            <Advarsel visible={!!personalia?.sikkerhetstiltak}>{personalia?.sikkerhetstiltak}</Advarsel>
            <Advarsel visible={personalia?.egenAnsatt}>Skjermet</Advarsel>
            <Fokus visible={!isEmpty(verge?.vergemaalEllerFremtidsfullmakt)}>Vergemål</Fokus>
            <Fokus
                visible={fullmakt && !isEmpty(fullmakt.fullmakt) && erFullmaktOmradeMedOppfolging(fullmakt.fullmakt)}
            >
                Fullmakt
            </Fokus>
            <Fokus visible={!!spraakTolk?.tegnspraak}>Tegnspråktolk</Fokus>
            <Fokus visible={!!spraakTolk?.talespraak}>Språktolk</Fokus>
            <Fokus visible={oppfolging?.underKvp}>KVP</Fokus>
            <Fokus
                visible={oppfolging && oppfolging.manuell}
                title="Brukeren er vurdert til å ikke kunne benytte seg av aktivitetsplanen og dialogen. Du kan endre til digital oppfølging i Veilederverktøy dersom bruker ikke er reservert i KRR."
            >
                Manuell oppfølging
            </Fokus>
            <Fokus
                visible={oppfolging?.reservasjonKRR}
                title="Brukeren har reservert seg mot digital kommunikasjon i Kontakt- og reservasjonsregisteret, og kan derfor ikke benytte seg av aktivitetsplanen og dialogen."
            >
                Reservert KRR
            </Fokus>
            <Fokus
                visible={
                    oppfolging?.registrertKRR &&
                    !oppfolging?.kanVarsles &&
                    !oppfolging.manuell &&
                    !oppfolging?.reservasjonKRR
                }
            >
                Utdatert i KRR
            </Fokus>
            <Fokus visible={!!oppfolging?.inaktivIArena}>Inaktivert</Fokus>
            <Fokus visible={!oppfolging?.underOppfolging}>Ikke under oppfølging</Fokus>
            <Fokus visible={!!gjeldendeEskaleringsvarsel}>Varsel</Fokus>
            <Fokus
                visible={oppfolging?.registrertKRR === false}
                title="Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret og kan ikke varsles. Du kan derfor ikke samhandle digitalt med brukeren. "
            >
                Ikke registrert KRR
            </Fokus>
            <Info visible={trengerVurdering(oppfolgingsstatus) && !profilering}>Trenger vurdering</Info>
            <Info visible={trengerAEV(oppfolgingsstatus) && !profilering}>Behov for AEV</Info>
            <Info visible={erBrukerSykmeldt(oppfolgingsstatus)}>Sykmeldt</Info>
            <Info visible={profilering === 'ANTATT_GODE_MULIGHETER' && manglerVedtak(oppfolgingsstatus)}>
                Antatt gode muligheter
            </Info>
            <Info visible={profilering === 'ANTATT_BEHOV_FOR_VEILEDNING' && manglerVedtak(oppfolgingsstatus)}>
                Antatt behov for veiledning
            </Info>
            <Info visible={profilering === 'OPPGITT_HINDRINGER' && manglerVedtak(oppfolgingsstatus)}>
                Oppgitt hindringer
            </Info>
        </div>
    );
}

export default Etiketter;
