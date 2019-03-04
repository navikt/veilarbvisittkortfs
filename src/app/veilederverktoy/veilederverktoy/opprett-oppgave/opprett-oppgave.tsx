import React from 'react';
import {Formik} from "formik";
import NavFrontendModal from "nav-frontend-modal";
import {Innholdstittel, Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import ArbeidslisteForm from "../../arbeidsliste/arbeidsliste-form";

function OpprettOppgave() {
   //const [valgtTema, settTema] = useState(null);

    //useEffect(()=> {},[]);

    return (
        <Formik
            initialValues={{}}
            onSubmit={(values, actions)=> {
                actions.resetForm();
            }}
            render ={ formikProps =>
                <NavFrontendModal
                    className="arbeidsliste-modal"
                    contentLabel="arbeidsliste"
                    isOpen={true}
                    onRequestClose={()=> console.log('')}
                    closeButton
                >
                    <div className="modal-header-wrapper">
                        <header className="modal-header"/>
                    </div>
                    <div className="arbeidsliste__modal">
                        <div className="arbeidsliste-info-tekst">
                            <Innholdstittel className="arbeidsliste__overskrift">
                                <FormattedMessage id="arbeidsliste.modal.legg.til.overskrift" />
                            </Innholdstittel>
                            <Undertittel>
                                <FormattedMessage
                                    id="arbeidsliste.modal.personalia"
                                    values={{ navn: 'herps', fnr: 'derps' }}
                                />
                            </Undertittel>
                            <ArbeidslisteForm
                                onRequestClose={()=>{}}
                                laster={false}
                            />
                        </div>
                    </div>
                </NavFrontendModal>
            }
        />
    )
}




export default OpprettOppgave;