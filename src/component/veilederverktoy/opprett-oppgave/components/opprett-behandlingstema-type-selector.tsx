import FormikSelect from '../../../components/formik/formik-select';
import { BehandlingsTema } from '../../../../api/veilarboppgave';
import { OrNothing } from '../../../../util/type/utility-types';

interface OpprettBehandlingstemaTypeSelectorProps {
    behandlingsTema: OrNothing<BehandlingsTema>
}

interface TypeOption {
    value: BehandlingsTema;
    label: string;
}

function OpprettBehandlingstemaTypeSelector({ behandlingsTema }: OpprettBehandlingstemaTypeSelectorProps ) {
    const typeOptions: TypeOption[] = [{ value: 'INGEN', label: '       ' }, { value: 'FERDIG_AVKLART_MOT_UFØRETRYGD', label: 'Ferdig avklart mot uføretrygd' }];
    if (behandlingsTema) {
        typeOptions.push({ value: 'FERDIG_AVKLART_MOT_UFØRETRYGD', label: 'Ferdig avklart mot uføretrygd' });
    }
    return <FormikSelect label="Gjelder" name="behandlingsTema" options={typeOptions} />;
}

export default OpprettBehandlingstemaTypeSelector;
