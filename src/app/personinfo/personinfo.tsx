import * as React from 'react';
import NavnOgAlder from './components/navnogalder';
import Etiketter from './components/etiketter';
import Fodelsnummer from './components/fodelsnummer';
import './personinfo.less';
import {InitialDataContext} from "../components/initialdataprovider";
import {useContext} from "react";
import Icon from "./components/icon";


function PersonInfo() {
    const {personalia, oppfolgingstatus } = useContext(InitialDataContext);
    return (
        <div className="personinfo">
            <Icon kjonn={personalia.kjonn}/>
            <div className="personinfo__container">
                <Fodelsnummer fnr={personalia.fodselsnummer}/>
                <NavnOgAlder personalia={personalia}/>
                <Etiketter personalia={personalia} oppfolging={oppfolgingstatus}/>
            </div>
        </div>
    );
}
export default PersonInfo;
