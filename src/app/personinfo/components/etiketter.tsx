import React from 'react';
import {PersoninfoData} from "../personinfo";
import {EtikettAdvarsel, EtikettInfo} from "nav-frontend-etiketter";
import hiddenIf from "../../components/hidden-if";
import {OppfolgingData} from "../../../types/oppfolgingsstatus";

const Advarsel = hiddenIf(EtikettAdvarsel);
const Info = hiddenIf(EtikettInfo);

export function erBrukerSykmeldt(oppfolging: OppfolgingData): boolean {
    return oppfolging.formidlingsgruppe === "IARBS" && oppfolging.servicegruppe === "VURDI";
}

export function trengerVurdering(oppfolging: OppfolgingData): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}
export function trengerAEV(oppfolging: OppfolgingData): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

function Etiketter(props: PersoninfoData) {
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