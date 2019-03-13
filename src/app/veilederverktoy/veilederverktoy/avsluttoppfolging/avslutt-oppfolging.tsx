import React, {useState} from "react";
import {connect} from "react-redux";
import {Formik} from "formik";
import VeilederVerktoyModal from "../veilederverktoy-modal";
import {Dispatch} from "redux";
import {navigerAction} from "../../../../store/navigation/actions";
import {Appstate} from "../../../../types/appstate";
import OppfolgingSelector from "../../../../store/oppfolging/selector";
import AvsluttOppfolgingBegrunnelseForm from "./components/avslutt-oppfolging-begrunnelse-form";
import AvsluttOppfolgingBekreft from "./components/avslutt-oppfolging-bekreft";
import PersonaliaSelector from "../../../../store/personalia/selectors";
import {avsluttOppfolging} from "../../../../store/oppfolging/actions";

interface StateProps {
    fnr: string;
    navn: string;
}

interface DispatchProps {
    handleSubmit : (tekst:string) => void;
    tilbakeTilProcesser: ()=> void;
    tilbake: ()=> void;
}


type AvsluttOppfolging = StateProps & DispatchProps

function AvsluttOppfolging (props: AvsluttOppfolging) {
    //const[harUbehandledeDialoger, setHarUbehandledeDialoger] = useState(false);
    const [harBekreftetAvsluttOppfolging, setHarBekreftetAvsluttOppfolging] = useState(false);

    return (
        <Formik
            initialValues={{tekst:''}}
            onSubmit={(values) => props.handleSubmit(values.tekst)}
            validationSchema={{}}
            render={formikProps => {
                return (
                    <VeilederVerktoyModal
                        touched={formikProps.touched.tekst as boolean}
                        visConfirmDialog={formikProps.touched.tekst as boolean}
                        tilbakeFunksjon={props.tilbakeTilProcesser}
                        tilbakeTekstId="innstillinger.modal.tilbake"

                    >
                        <form>
                            {!harBekreftetAvsluttOppfolging && <AvsluttOppfolgingBegrunnelseForm
                                formikProps={formikProps}
                                onHovedKnappClick={()=>setHarBekreftetAvsluttOppfolging(true)}
                                onAvbryt={props.tilbake}
                            />}
                            {harBekreftetAvsluttOppfolging && <AvsluttOppfolgingBekreft navn={props.navn}/>}
                        </form>

                    </VeilederVerktoyModal>
                );
            }}
        />
    );


}


const mapStateToProps = (state: Appstate) => ({
    fnr: OppfolgingSelector.selectFnr(state),
    navn: PersonaliaSelector.selectSammensattNavn(state)
})


const mapDispatchToProps = (dispatch: Dispatch) => ({
    tilbakeTilProcesser: () => dispatch(navigerAction('prosesser')),
    handleSubmit: (begrunnelse: string)=> dispatch(avsluttOppfolging(begrunnelse)),
    tilbake: ()=> dispatch(navigerAction(null))
});



export default connect<StateProps , DispatchProps>(mapStateToProps ,mapDispatchToProps)(AvsluttOppfolging);