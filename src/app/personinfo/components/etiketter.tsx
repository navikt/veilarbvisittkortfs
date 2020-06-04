import React, { useEffect, useState } from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import EtikettBase, { EtikettInfo, EtikettAdvarsel, EtikettFokus } from 'nav-frontend-etiketter';
import { OppfolgingStatus } from '../../../types/oppfolging-status';
import './etiketter.less';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import OppfolgingsstatusSelector from '../../../store/oppfolging-status/selectors';
import { OppfolgingsPerioder } from '../../../types/oppfolging';
import moment from 'moment';
import { fetchToJson } from '../../../api/api-utils';
import FeatureApi from '../../../api/feature-api';
import { StringOrNothing } from '../../../types/utils/stringornothings';

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

export function maglerVedtak(oppfolging: OppfolgingStatus): boolean {
    return (
        oppfolging.formidlingsgruppe !== 'ISERV' &&
        (oppfolging.servicegruppe === 'BKART' || oppfolging.servicegruppe === 'IVURD')
    );
}

function Etiketter() {
    const { diskresjonskode, sikkerhetstiltak, egenAnsatt, dodsdato } = useSelector(
        (state: Appstate) => state.personalia.data
    );
    const [erPermitterEtter9mars, setErPermitterEtter9mars] = useState(false);
    const [profilering, setProfilering] = useState<StringOrNothing>(null);

    const {
        underKvp,
        reservasjonKRR,
        manuell,
        underOppfolging,
        inaktivIArena,
        gjeldendeEskaleringsvarsel,
        kanVarsles,
        oppfolgingsPerioder,
        fnr,
    } = useSelector(OppfolgingSelector.selectOppfolgingData);

    const gjeldeneOppfolgingsPeriode = oppfolgingsPerioder
        ? oppfolgingsPerioder.find((oppfolgingsPeriode: OppfolgingsPerioder) => oppfolgingsPeriode.sluttDato === null)
        : false;

    // '2020-03-09' is day D
    const harStartetOppfolgingEtter9mars2020 = gjeldeneOppfolgingsPeriode
        ? moment(gjeldeneOppfolgingsPeriode.startDato).isAfter('2020-03-09', 'day')
        : false;
    // TODO SLETT USE EFFECTEN ASP!!!!

    useEffect(() => {
        fetchToJson('/veilarbregistrering/api/registrering?fnr=' + fnr).then((resp: any) => {
            FeatureApi.hentFeatures('veilarbvisittkort.permittering.etikett').then((features) => {
                if (
                    features['veilarbvisittkort.permittering.etikett'] &&
                    harStartetOppfolgingEtter9mars2020 &&
                    resp.type === 'ORDINAER'
                ) {
                    const besvarelse = resp.registrering.besvarelse;
                    if (besvarelse && besvarelse.dinSituasjon === 'ER_PERMITTERT') {
                        setErPermitterEtter9mars(true);
                    }
                }
            });

            FeatureApi.hentFeatures('pto.vedtaksstotte.pilot').then((features) => {
                if (features['pto.vedtaksstotte.pilot'] && resp.type === 'ORDINAER') {
                    setProfilering(resp.registrering.profilering.innsatsgruppe);
                }
            });
        });
    }, [harStartetOppfolgingEtter9mars2020, fnr]);

    const oppfolgingstatus = useSelector(OppfolgingsstatusSelector.selectOppfolgingStatusData);
    return (
        <div className="etikett-container">
            <Bas hidden={!dodsdato} type="info" className="etikett--mork">
                Død
            </Bas>
            <Bas hidden={!erPermitterEtter9mars} type="info" className="etikett--lilla">
                Permittert etter 9. mars
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
                hidden={reservasjonKRR || manuell || kanVarsles}
                title="Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret og kan ikke varsles. Du kan derfor ikke samhandle digitalt med brukeren. "
            >
                Ikke registrert KRR
            </Fokus>
            <Info hidden={!(trengerVurdering(oppfolgingstatus) && !profilering)}>Trenger vurdering</Info>
            <Info hidden={!(trengerAEV(oppfolgingstatus) && !profilering)}>Behov for AEV</Info>
            <Info hidden={!erBrukerSykmeldt(oppfolgingstatus)}>Sykmeldt</Info>
            <Info hidden={!(profilering === 'STANDARD_INNSATS' && maglerVedtak(oppfolgingstatus))}>
                Antatt gode muligheter
            </Info>
            <Info hidden={!(profilering === 'SITUASJONSBESTEMT_INNSATS' && maglerVedtak(oppfolgingstatus))}>
                Antatt behov for veiledning
            </Info>
            <Info hidden={!(profilering === 'BEHOV_FOR_ARBEIDSEVNEVURDERING' && maglerVedtak(oppfolgingstatus))}>
                Oppgitt hindringer
            </Info>
        </div>
    );
}
export default Etiketter;
