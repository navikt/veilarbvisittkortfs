import React from 'react';
import FormikInput from '../components/formik/formik-input';
import FormikTekstArea from '../components/formik/formik-textarea';
import FormikDatoVelger from '../components/formik/formik-datepicker';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import ArbeidslistekategoriVisning from './arbeidslisteikon/arbeidslisteikon-visning';
import { OrNothing } from '../../util/type/ornothing';
import {
	validerArbeidslisteDatoFelt,
	validerArbeidslisteKommentarFelt,
	validerArbeidslisteTittelFelt
} from '../../util/formik-validation';
import { toSimpleDateStr } from '../../util/date-utils';

interface ArbeidslisteFormProps {
	sistEndretAv?: OrNothing<{ veilederId: string }>;
	endringstidspunkt?: OrNothing<Date>;
	navn: string;
	fnr: string;
}

function ArbeidslisteForm(props: ArbeidslisteFormProps) {
	return (
		<div className="arbeidsliste__bruker">
			<div className="blokk-s">
				<Undertittel>{`${props.navn}, ${props.fnr}`}</Undertittel>
				<FormikInput name="overskrift" label="Tittel" validate={validerArbeidslisteTittelFelt} bredde="L" />
				<FormikTekstArea
					name="kommentar"
					label="Kommentar"
					maxLength={500}
					validate={validerArbeidslisteKommentarFelt}
				/>
				{props.sistEndretAv && props.endringstidspunkt && (
					<Undertekst className="arbeidsliste--modal-redigering">
						{`Oppdatert ${toSimpleDateStr(props.endringstidspunkt)} av ${props.sistEndretAv.veilederId}`}
					</Undertekst>
				)}
			</div>
			<div className="dato-kategori-wrapper">
				<FormikDatoVelger
					name="frist"
					validate={validerArbeidslisteDatoFelt}
					label="Frist"
					ariaLabel="Frist før arbeidslisten"
				/>
				<ArbeidslistekategoriVisning name="kategori" />
			</div>
		</div>
	);
}

export default ArbeidslisteForm;
