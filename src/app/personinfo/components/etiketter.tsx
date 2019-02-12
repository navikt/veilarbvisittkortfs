import React from 'react';
import hiddenIf from "../../components/hidden-if";
import {EtikettInfo, EtikettAdvarsel} from "nav-frontend-etiketter";
import {Oppfolgingsstatus} from "../../../types/oppfolgingsstatus";
import {Personalia} from "../../../types/personalia";


const Advarsel = hiddenIf(EtikettAdvarsel);
const Info = hiddenIf(EtikettInfo);

export function erBrukerSykmeldt(oppfolging: Oppfolgingsstatus): boolean {
    return oppfolging.formidlingsgruppe === "IARBS" && oppfolging.servicegruppe === "VURDI";
}

export function trengerVurdering(oppfolging: Oppfolgingsstatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}
export function trengerAEV(oppfolging: Oppfolgingsstatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

function Etiketter(props: {personalia:Personalia, oppfolging: Oppfolgingsstatus}) {
    const { diskresjonskode, sikkerhetstiltak, egenAnsatt } = props.personalia;

    return <div className="etikett-container">
        <Advarsel hidden={!diskresjonskode}>Kode {diskresjonskode}</Advarsel>
        <Advarsel hidden={!sikkerhetstiltak}>{sikkerhetstiltak}</Advarsel>
        <Advarsel hidden={!egenAnsatt}>Egen ansatt</Advarsel>
        <Info hidden={!(trengerVurdering(props.oppfolging))} className="etikett--info2">Trenger vurdering</Info>
        <Info hidden={!(trengerAEV(props.oppfolging))} className="etikett--info2">Behov for AEV</Info>
        <Info hidden={!erBrukerSykmeldt(props.oppfolging)} className="etikett--info2">Sykmeldt</Info>
    </div>;
}


export default Etiketter;