import React, {useEffect} from "react";
import {Personalia} from "../../types/personalia";
import {Oppfolgingsstatus} from "../../types/oppfolgingsstatus";
import { connect } from 'react-redux';
import {hentOppfolgingStatus} from "../../store/oppfolging-status/reducer";
import {hentPersonalia} from "../../store/personalia/reducer";


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

interface DispatchProps {
    doHentPersonData: (fnr:string) => void;
    doHentOppfolgingsstatus: (fnr: string) => void;
}

interface InitialDataProviderProps {
    fnr:string;
    children: React.ReactNode

}

type Props = InitialDataProviderProps & DispatchProps;

function InitialDataProvider(props: Props){
    useEffect( () => {
        props.doHentPersonData(props.fnr);
        props.doHentOppfolgingsstatus(props.fnr);
    }, []);
    return (
        <>
            {props.children}
        </>
    )
}

const mapDispatchToProps = (dispatch: any): any => ({
    doHentOppfolgingsstatus: (fnr: string) => dispatch(hentOppfolgingStatus(fnr)),
    doHentPersonData: (fnr:string) => dispatch(hentPersonalia(fnr)),
});



export default connect<{},DispatchProps, InitialDataProviderProps>(null, mapDispatchToProps)(InitialDataProvider);