import React, {useEffect, useState} from "react";
import {Personalia} from "../../types/personalia";
import {Oppfolgingsstatus} from "../../types/oppfolgingsstatus";


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
const initOppfolgingstatus: Oppfolgingsstatus = {
    oppfolgingsenhet: {
        navn: "NAV TestHeim",
        enhetId: "007"},
    veilederId: null,
    formidlingsgruppe: null,
    servicegruppe: null,
};

interface InitialDataContextType {
    personalia: Personalia;
    oppfolgingstatus: Oppfolgingsstatus;
}

export const InitialDataContext =
    React.createContext<InitialDataContextType>({personalia :initPersonalia, oppfolgingstatus: initOppfolgingstatus});

function InitialDataProvider(props: {fnr: string, children: React.ReactNode}){
    const [personalia, setPersonalia] = useState(initPersonalia);
    const [oppfolgingstatus, setOppfolgingsstatus] = useState(initOppfolgingstatus);


    const fetchPersonaliaData = async () => {
        const response = await fetch(`/veilarbperson/api/person/${props.fnr}`);
        const personalia = await response.json();
        setPersonalia(personalia);
    };

    const fetchOppfolgingsstatusData = async () => {
        const response = await fetch(`/veilarboppfolging/api/person/${props.fnr}/oppfolgingsstatus`);
        const oppfolgingstatus = await response.json();
        setOppfolgingsstatus(oppfolgingstatus);
    };

    useEffect( () => {
        fetchPersonaliaData();
        fetchOppfolgingsstatusData();
    }, []);
    return (

        <InitialDataContext.Provider value={{personalia,oppfolgingstatus}}>
            {props.children}
        </InitialDataContext.Provider>
    )
}

export default InitialDataProvider;