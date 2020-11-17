import React, { useEffect, useState } from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import EtikettBase, { EtikettInfo, EtikettAdvarsel, EtikettFokus } from 'nav-frontend-etiketter';
import { OppfolgingStatus } from '../../../api/data/oppfolging-status';
import { useDataStore } from '../../../store-midlertidig/data-store';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { useFetchRegistrering } from '../../../api/api-midlertidig';
import { PILOT_TOGGLE } from '../../../api/data/features';
import './etiketter.less';
import { InnsatsgruppeType } from '../../../api/registrering-api';
import { OrNothing } from '../../../util/type/ornothing';

const Advarsel = hiddenIf(EtikettAdvarsel);
const Info = hiddenIf(EtikettInfo);
const Fokus = hiddenIf(EtikettFokus);
const Base = hiddenIf(EtikettBase);

export function erBrukerSykmeldt(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe === 'IARBS' && oppfolging.servicegruppe === 'VURDI';
}

export function trengerVurdering(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}

export function trengerAEV(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

export function maglerVedtak(oppfolging: OppfolgingStatus): boolean {
    return (
        oppfolging.formidlingsgruppe !== 'ISERV' &&
        (oppfolging.servicegruppe === 'BKART' || oppfolging.servicegruppe === 'IVURD')
    );
}

function Etiketter() {
    const { brukerFnr } = useAppStore();
    const { oppfolgingsstatus, oppfolging, personalia, features } = useDataStore();

    const [innsatsgruppe, setInnsatsgruppe] = useState<OrNothing<InnsatsgruppeType>>(null);

    const fetchRegistrering = useFetchRegistrering(brukerFnr, { manual: true });

    useEffect(() => {
        if (brukerFnr && features[PILOT_TOGGLE]) {
            fetchRegistrering.fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    useEffect(() => {
        if (fetchRegistrering.data) {
            setInnsatsgruppe(fetchRegistrering.data.registrering.profilering?.innsatsgruppe);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchRegistrering]);

    return (
        <div className="etikett-container">
            <Base hidden={!personalia.dodsdato} type="info" className="etikett--mork">
                Død
            </Base>
            <Advarsel hidden={!personalia.diskresjonskode}>Kode {personalia.diskresjonskode}</Advarsel>
            <Advarsel hidden={!personalia.sikkerhetstiltak}>{personalia.sikkerhetstiltak}</Advarsel>
            <Advarsel hidden={!personalia.egenAnsatt}>Egen ansatt</Advarsel>
            <Fokus hidden={!oppfolging.underKvp}>KVP</Fokus>
            <Fokus
                hidden={oppfolging.reservasjonKRR || !oppfolging.manuell}
                title="Brukeren er vurdert til å ikke kunne benytte seg av aktivitetsplanen og dialogen. Du kan endre til digital oppfølging i Veilederverktøy."
            >
                Manuell oppfølging
            </Fokus>
            <Fokus
                hidden={!oppfolging.reservasjonKRR}
                title="Brukeren har reservert seg mot digital kommunikasjon i Kontakt- og reservasjonsregisteret, og kan derfor ikke benytte seg av aktivitetsplanen og dialogen."
            >
                Reservert KRR
            </Fokus>
            <Fokus hidden={!oppfolging.inaktivIArena}>Inaktivert</Fokus>
            <Fokus hidden={oppfolging.underOppfolging}>Ikke under oppfølging</Fokus>
            <Fokus hidden={!oppfolging.gjeldendeEskaleringsvarsel}>Varsel</Fokus>
            <Fokus
                hidden={oppfolging.reservasjonKRR || oppfolging.manuell || oppfolging.kanVarsles}
                title="Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret og kan ikke varsles. Du kan derfor ikke samhandle digitalt med brukeren. "
            >
                Ikke registrert KRR
            </Fokus>
            <Info hidden={!(trengerVurdering(oppfolgingsstatus) && !innsatsgruppe)}>Trenger vurdering</Info>
            <Info hidden={!(trengerAEV(oppfolgingsstatus) && !innsatsgruppe)}>Behov for AEV</Info>
            <Info hidden={!erBrukerSykmeldt(oppfolgingsstatus)}>Sykmeldt</Info>
            <Info hidden={!(innsatsgruppe === 'STANDARD_INNSATS' && maglerVedtak(oppfolgingsstatus))}>
                Antatt gode muligheter
            </Info>
            <Info hidden={!(innsatsgruppe === 'SITUASJONSBESTEMT_INNSATS' && maglerVedtak(oppfolgingsstatus))}>
                Antatt behov for veiledning
            </Info>
            <Info hidden={!(innsatsgruppe === 'BEHOV_FOR_ARBEIDSEVNEVURDERING' && maglerVedtak(oppfolgingsstatus))}>
                Oppgitt hindringer
            </Info>
        </div>
    );
}
export default Etiketter;
