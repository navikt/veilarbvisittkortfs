import * as React from 'react';
import Icon from './components/icon';
import { Oppfolgingsstatus } from '../../types/oppfolgingsstatus';
import { Personalia } from '../../types/personalia';
import NavnOgAlder from './components/navnogalder';
import Etiketter from './components/etiketter';
import Fodelsnummer from './components/fodelsnummer';
import './personinfo.less';


export interface PersoninfoData {
    oppfolging: Oppfolgingsstatus;
    personalia: Personalia;
}


function PersonInfo(props: PersoninfoData) {
    return (
        <div className="personinfo">
            <Icon kjonn={props.personalia.kjonn}/>
            <div className="personinfo__container">
                <Fodelsnummer fnr={props.personalia.fodselsnummer}/>
                <NavnOgAlder personalia={props.personalia}/>
                <Etiketter personalia={props.personalia} oppfolging={props.oppfolging}/>
            </div>
        </div>
    );
}
export default PersonInfo;
