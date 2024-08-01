import { Field } from 'formik';
import { Label } from '@navikt/ds-react';
import ArbeidslisteikonBla from './arbeidslisteikon_bla.svg?react';
import ArbeidslisteikonLilla from './arbeidslisteikon_lilla.svg?react';
import ArbeidslisteikonGronn from './arbeidslisteikon_gronn.svg?react';
import ArbeidslisteikonGul from './arbeidslisteikon_gul.svg?react';
import Arbeidslistekategori from './arbeidslistekategori';
import { FieldProps } from 'formik/dist/Field';
import { KategoriModell } from '../../../api/veilarbportefolje';

interface Props {
    name: string;
}

function ArbeidslistekategoriVisning({ name }: Props) {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps<KategoriModell>) => {
                return (
                    <div className="arbeidslistekategori">
                        <Label size="small" className="skjemaelement__label">
                            Kategori
                        </Label>
                        <div className="arbeidslistekategori__kategorialternativer">
                            <Arbeidslistekategori
                                value={KategoriModell.BLA}
                                arbeidslisteikon={<ArbeidslisteikonBla />}
                                name={name}
                                onChange={() => form.setFieldValue(field.name, KategoriModell.BLA)}
                                checked={field.value === KategoriModell.BLA}
                                title="Arbeidslisteikon blå"
                            />
                            <Arbeidslistekategori
                                value={KategoriModell.GRONN}
                                arbeidslisteikon={<ArbeidslisteikonGronn />}
                                name={name}
                                onChange={() => form.setFieldValue(name, KategoriModell.GRONN)}
                                checked={field.value === KategoriModell.GRONN}
                                title="Arbeidslisteikon grønn"
                            />
                            <Arbeidslistekategori
                                value={KategoriModell.LILLA}
                                arbeidslisteikon={<ArbeidslisteikonLilla />}
                                name={name}
                                onChange={() => form.setFieldValue(name, KategoriModell.LILLA)}
                                checked={field.value === KategoriModell.LILLA}
                                title="Arbeidslisteikon lilla"
                            />
                            <Arbeidslistekategori
                                value={KategoriModell.GUL}
                                arbeidslisteikon={<ArbeidslisteikonGul />}
                                name={name}
                                onChange={() => form.setFieldValue(name, KategoriModell.GUL)}
                                checked={field.value === KategoriModell.GUL}
                                title="Arbeidslisteikon gul"
                            />
                        </div>
                    </div>
                );
            }}
        </Field>
    );
}

export default ArbeidslistekategoriVisning;
