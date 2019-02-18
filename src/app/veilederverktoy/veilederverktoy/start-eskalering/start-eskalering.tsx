import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {FormikValues} from "formik";
import {Dispatch} from "redux";
import {opprettHenvendelse} from "../../../../store/dialog/actions";
import {connect} from "react-redux";
import {navigerTilbake} from "../../../../store/navigation/actions";
import {Appstate} from "../../../../types/appstate";
import BegrunnelseForm from "../begrunnelseform/begrunnelse-form";

interface DispatchProps {
    handleSubmit: (values: FormikValues) => void
    tilbake: () => void;
}


function StartEskalering(props: any) {
    return (
        <FormattedMessage id="dialog.eskalering.overskrift">
            {overskrift =>
                <FormattedMessage id="innstillinger.modal.start-eskalering.automatisk-tekst">
                    {defaultTekst =>
                        <BegrunnelseForm
                            tekst={defaultTekst as string}
                            handleSubmit={props.handleSubmit}
                            tekstariaLabel = "herpsderps"
                            maxLength={500}
                        />
                    }

                </FormattedMessage>
            }
        </FormattedMessage>
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: true
});

const mapDispatchToProps = (dispatch: Dispatch)=> {
    return {
        handleSubmit: (values: FormikValues) =>
            dispatch(opprettHenvendelse(
            {begrunnelse: values.tekst, overskrift: values.overskrift, egenskaper: ["ESKALERINGSVARSEL"], tekst: values.tekst})),
        tilbake: ()=> dispatch(navigerTilbake())
    }
};


export default connect<{},DispatchProps,{}>(mapStateToProps,mapDispatchToProps)(injectIntl(StartEskalering));