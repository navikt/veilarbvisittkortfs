import React, {useEffect, useState} from "react";
import OppfolgingApi from "../../../../api/oppfolging-api";
import {Appstate} from "../../../../types/appstate";
import OppfolgingSelector from "../../../../store/oppfolging/selector";
import {connect} from "react-redux";
import NavFrontendSpinner from "nav-frontend-spinner";
import {AvslutningStatus} from "../../../../types/avslutningsstatus";
import VarselStripeAvsluttOppfolging from "./components/varsel-stripe-avslutt-oppfolging";
import Modal from "../../../components/modal/modal";

interface StateProps {
    fnr: string;
}


type AvsluttOppfolging = StateProps

function AvsluttOppfolging (props: AvsluttOppfolging) {
    const[avslutningStatus, setAvslutningStatus] = useState({} as AvslutningStatus);
    const[isLoading, setIsLoding] = useState(true);

    useEffect(()=> {
        OppfolgingApi.kanAvslutte(props.fnr)
            .then((avslutningStatus)=> {
                setAvslutningStatus(avslutningStatus);
                setIsLoding(false);
            })
    },[]);

    return (
        <Modal
            contentLabel="veilederverktoy-modal"
            className="veilederverktoy-modal"
            onRequestClose={()=>""}
        >
            {isLoading && <NavFrontendSpinner type="XL"/> }
            {!avslutningStatus.kanAvslutte &&<VarselStripeAvsluttOppfolging {...avslutningStatus}/>}
        </Modal>
    )


}

const mapStateToProps = (state: Appstate) => ({
    fnr: OppfolgingSelector.selectFnr(state)
});



export default connect<StateProps>(mapStateToProps)(AvsluttOppfolging);