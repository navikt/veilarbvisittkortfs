import React, {useEffect, useState} from "react";
import {Personalia} from "../../types/personalia";


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

export const InitialDataContext =
    React.createContext<Personalia>(initPersonalia);

function InitialDataProvider(props: {fnr: string, children: React.ReactNode}){
    const [personalia, setData] = useState(initPersonalia);


    const fetchData = async () => {
        const response = await fetch(`/veilarbperson/api/person/${props.fnr}`);
        const personalia = await response.json();
        setData(personalia);
    };


    useEffect( () => {fetchData()}, []);
    console.log(personalia);
    return (

        <InitialDataContext.Provider value={personalia}>
            {props.children}
        </InitialDataContext.Provider>
    )
}

export default InitialDataProvider;