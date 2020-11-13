import React from 'react';
import SokFilter from '../../../components/sokfilter/sok-filter';
import FormikRadioGroup from '../../../components/formik/formik-radiogroup';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import Dropdown from '../../../components/dropdown/dropdown';
import { FormikProps } from 'formik';
import { OpprettOppgaveFormValues } from '../opprett-oppgave';
import { StringOrNothing } from '../../../../util/type/stringornothings';
import { OrNothing } from '../../../../util/type/ornothing';
import { OppgaveTema } from '../../../../api/data/oppgave';
import { VeilederData } from '../../../../api/data/veilederdata';

interface OwnProps {
    veilederId: StringOrNothing;
    avsenderenhetId: StringOrNothing;
    enhetId: StringOrNothing;
    tema: OrNothing<OppgaveTema>;
    formikProps: FormikProps<OpprettOppgaveFormValues>;
}

interface StateProps {
    veilederListe: VeilederData[];
}

type OpprettOppgaveVelgVeilederProps = OwnProps & StateProps;

function OpprettOppgaveVelgVeileder({
    veilederListe,
    veilederId,
    tema,
    enhetId,
    avsenderenhetId,
    formikProps,
}: OpprettOppgaveVelgVeilederProps) {
    if (tema !== 'OPPFOLGING' && formikProps.values.veilederId) {
        formikProps.setFieldValue('veilederId', null);
    }

    if (!(avsenderenhetId === enhetId && tema === 'OPPFOLGING')) {
        return null;
    }

    const valgtVeileder: OrNothing<VeilederData> = veilederListe.find((veileder) => veileder.ident === veilederId);

    const sorterteVeiledere = veilederListe.sort((a, b) => a.etternavn.localeCompare(b.etternavn));

    return (
        <div className="skjemaelement">
            <label className="skjemaelement__label">Veileder</label>
            <Dropdown
                name="Velg veileder dropdown"
                knappeTekst={(valgtVeileder && valgtVeileder.navn) || ''}
                className="skjemaelement velg-enhet-dropdown"
                btnClassnames="velg-enhet-dropdown__button"
                render={(lukkDropdown) => (
                    <SokFilter data={sorterteVeiledere} label="" placeholder="Søk etter veileder">
                        {(data) => (
                            <FormikRadioGroup
                                data={data}
                                createLabel={(veileder: VeilederData) => veileder.navn}
                                createValue={(veileder: VeilederData) => veileder.ident}
                                radioName="Velg veileder"
                                closeDropdown={lukkDropdown}
                                name="veilederId"
                            />
                        )}
                    </SokFilter>
                )}
            />
        </div>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    veilederListe: state.tildelVeileder.veilederPaEnheten.data.veilederListe,
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(OpprettOppgaveVelgVeileder);
