import {Appstate} from "../../../types/appstate";
import {connect} from "react-redux";
import Prosesser from "./prosess/prosesser";
import * as React from "react";
import StartEskalering from "./start-eskalering/start-eskalering";

function VeilederVerktoyNavigation(props: {location:string | null}) {
    switch(props.location){
        case 'prosesser':
            return <Prosesser/>;
        case 'start_eskalering':
            return <StartEskalering/>;
        default:
            return null;
    }
}

const mapStateToProps = (state: Appstate)=> ({
    location: state.navigation.location
});

export default connect(mapStateToProps) (VeilederVerktoyNavigation);