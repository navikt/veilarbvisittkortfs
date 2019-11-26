import React, { useEffect, useState } from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import EtikettBase, { EtikettInfo, EtikettAdvarsel, EtikettFokus } from 'nav-frontend-etiketter';
import { OppfolgingStatus } from '../../../types/oppfolging-status';
import { Personalia } from '../../../types/personalia';
import './etiketter.less';
import { Oppfolging } from '../../../types/oppfolging';
import FeatureApi from '../../../api/feature-api';
import NavFrontendSpinner from 'nav-frontend-spinner';

const Advarsel = hiddenIf(EtikettAdvarsel);
const Info = hiddenIf(EtikettInfo);
const Fokus = hiddenIf(EtikettFokus);
const Bas = hiddenIf(EtikettBase);

export function erBrukerSykmeldt(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe === 'IARBS' && oppfolging.servicegruppe === 'VURDI';
}

export function trengerVurdering(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}

export function trengerAEV(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

function Etiketter(props: { personalia: Personalia; oppfolgingstatus: OppfolgingStatus; oppfolging: Oppfolging }) {
    const [kanVarslesFeature, setKanVarslesFeature] = useState(false);
    const [laster, setLaster] = useState(true);

    useEffect(() => {
        FeatureApi.hentFeatures('veilarbvisittkortfs.kanVarsles').then(resp => {
            setKanVarslesFeature(resp['veilarbvisittkortfs.kanVarsles']);
            setLaster(false);
        });
    }, [kanVarslesFeature]);

    if (laster) {
        return <NavFrontendSpinner type="S" />;
    }

    const { diskresjonskode, sikkerhetstiltak, egenAnsatt, dodsdato } = props.personalia;
    const {
        underKvp,
        reservasjonKRR,
        manuell,
        underOppfolging,
        inaktivIArena,
        gjeldendeEskaleringsvarsel,
        kanVarsles
    } = props.oppfolging;
    return (
        <div className="etikett-container">
            <Bas hidden={!dodsdato} type="info" className="etikett--mork">
                Død
            </Bas>
            <Advarsel hidden={!diskresjonskode}>Kode {diskresjonskode}</Advarsel>
            <Advarsel hidden={!sikkerhetstiltak}>{sikkerhetstiltak}</Advarsel>
            <Advarsel hidden={!egenAnsatt}>Egen ansatt</Advarsel>
            <Fokus hidden={!underKvp}>KVP</Fokus>
            <Fokus
                hidden={reservasjonKRR || !manuell}
                title="Brukeren er vurdert til å ikke kunne benytte seg av aktivitetsplanen og dialogen. Du kan endre til digital oppfølging i Veilederverktøy."
            >
                Manuell oppfølging
            </Fokus>
            <Fokus
                hidden={!reservasjonKRR}
                title="Brukeren har reservert seg mot digital kommunikasjon i Kontakt- og reservasjonsregisteret, og kan derfor ikke benytte seg av aktivitetsplanen og dialogen."
            >
                Reservert KRR
            </Fokus>
            <Fokus hidden={!inaktivIArena}>Inaktivert</Fokus>
            <Fokus hidden={underOppfolging}>Ikke under oppfølging</Fokus>
            <Fokus hidden={!gjeldendeEskaleringsvarsel}>Varsel</Fokus>
            <Fokus
                hidden={reservasjonKRR || manuell || kanVarsles || !kanVarslesFeature}
                title="Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret og kan ikke varsles. Du kan derfor ikke samhandle digitalt med brukeren. "
            >
                Ikke registrert KRR
            </Fokus>
            <Info hidden={!trengerVurdering(props.oppfolgingstatus)}>Trenger vurdering</Info>
            <Info hidden={!trengerAEV(props.oppfolgingstatus)}>Behov for AEV</Info>
            <Info hidden={!erBrukerSykmeldt(props.oppfolgingstatus)}>Sykmeldt</Info>
        </div>
    );
}
export default Etiketter;
