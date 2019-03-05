import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import { EtikettInfo, EtikettAdvarsel } from 'nav-frontend-etiketter';
import { OppfolgingStatus } from '../../../types/oppfolging-status';
import { Personalia } from '../../../types/personalia';
import './etiketter.less';

const Advarsel = hiddenIf(EtikettAdvarsel);
const Info = hiddenIf(EtikettInfo);

export function erBrukerSykmeldt(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe === 'IARBS' && oppfolging.servicegruppe === 'VURDI';
}

export function trengerVurdering(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}
export function trengerAEV(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

function Etiketter(props: {personalia: Personalia, oppfolgingstatus: OppfolgingStatus}) {
    const { diskresjonskode, sikkerhetstiltak, egenAnsatt } = props.personalia;

    return(
        <div className="etikett-container">
            <Advarsel hidden={!diskresjonskode}>Kode {diskresjonskode}</Advarsel>
            <Advarsel hidden={!sikkerhetstiltak}>{sikkerhetstiltak}</Advarsel>
            <Advarsel hidden={!egenAnsatt}>Egen ansatt</Advarsel>
            <Info hidden={!(trengerVurdering(props.oppfolgingstatus))}>Trenger vurdering</Info>
            <Info hidden={!(trengerAEV(props.oppfolgingstatus))}>Behov for AEV</Info>
            <Info hidden={!erBrukerSykmeldt(props.oppfolgingstatus)}>Sykmeldt</Info>
        </div>
    );
}

export default Etiketter;
