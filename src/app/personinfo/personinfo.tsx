import * as React from 'react';
import NavnOgAlder from './components/navnogalder';
import Etiketter from './components/etiketter';
import Fodelsnummer from './components/fodelsnummer';
import './personinfo.less';
import {InitialDataContext} from "../components/initialdataprovider";
import {useContext, useEffect, useState} from "react";
import Icon from "./components/icon";
import {Oppfolgingsstatus} from "../../types/oppfolgingsstatus";

const initOppfolgingData: Oppfolgingsstatus = {
    oppfolgingsenhet: {
        navn: "NAV TestHeim",
        enhetId: "007"},
    veilederId: null,
    formidlingsgruppe: null,
    servicegruppe: null,
};

function PersonInfo(props: {fnr: string}) {

    const [oppfolgingstatus, setData] = useState(initOppfolgingData);
    const value = useContext(InitialDataContext);

    const fetchPersonInfoData = async () => {
        const response = await fetch(`/veilarboppfolging/api/person/${props.fnr}/oppfolgingsstatus`);
        const oppfolgingstatus = await response.json();
        setData(oppfolgingstatus);
    };

    useEffect(() => {
        try {
            fetchPersonInfoData();
        } catch (e) {
            throw new Error(e); //TODO fix
        }
    }, []);

    return (
        <div className="personinfo">
            <Icon kjonn={value.kjonn}/>
            <div className="personinfo__container">
                <Fodelsnummer fnr={value.fodselsnummer}/>
                <NavnOgAlder personalia={value}/>
                <Etiketter personalia={value} oppfolging={oppfolgingstatus}/>
            </div>
        </div>
    );
}
export default PersonInfo;
