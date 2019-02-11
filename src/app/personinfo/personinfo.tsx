import * as React from 'react';
import Icon from "./components/icon";
import {useEffect, useState} from "react";
import {OppfolgingData} from '../../types/oppfolgingsstatus';
import {Personalia} from "../../types/personalia";
import NavnOgAlder from "./components/navnogalder";
import Etiketter from "./components/etiketter";
import Fodelsnummer from "./components/fodelsnummer";
import "./personinfo.less";

const initOppfolgingData: OppfolgingData = {
    oppfolgingsenhet: {
        navn: "NAV TestHeim",
        enhetId: "007"},
    veilederId: null,
    formidlingsgruppe: null,
    servicegruppe: null,
};

const initPersonalia: Personalia = {
    fornavn: "",
    etternavn: "",
    mellomnavn: null,
    sammensattNavn: "",
    fodselsnummer: "",
    fodselsdato: "",
    kjonn: "K",
    dodsdato: null,
    diskresjonskode: null,
    egenAnsatt: false,
    sikkerhetstiltak: null,
};

export interface PersoninfoData {
    oppfolging: OppfolgingData,
    personalia: Personalia;
}

const initPersonInfo:  PersoninfoData = {
    oppfolging: initOppfolgingData,
    personalia: initPersonalia,
};

function PersonInfo(props: {fnr: string}) {
    const [personinfoData, setData] = useState(initPersonInfo);

    const fetchPersonInfoData = async () => {

        const personResponse: Response = await fetch(
            `/veilarbperson/api/person/${props.fnr}`,
        );
        const personalia = await personResponse.json();

        const response: Response = await fetch(
            `/veilarboppfolging/api/person/${props.fnr}/oppfolgingsstatus`,
        );
        const oppfolging = await response.json();

        setData({personalia: personalia, oppfolging: oppfolging});
    };


    useEffect(() => {
        try {
            fetchPersonInfoData();
        }
        catch(e) {
            console.log(e);
        }
    },[]);

    return (
        <div className="personinfo">
            <Icon kjonn={personinfoData.personalia.kjonn}/>
            <div className="personinfo__container">
                <Fodelsnummer fnr={personinfoData.personalia.fodselsnummer}/>
                <NavnOgAlder personalia={personinfoData.personalia}/>
                <Etiketter personalia={personinfoData.personalia} oppfolging={personinfoData.oppfolging}/>
            </div>
        </div>
    )
}
export default PersonInfo;
