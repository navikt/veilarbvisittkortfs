import * as React from 'react';
import '../arbeidsliste.less';
import { ReactComponent as ArbeidslisteikonBla } from './/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from './arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from './/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from './/arbeidslisteikon_gul.svg';
import { Field } from 'formik';
import Arbeidslistekategori from './arbeidslistekategori';
import { FieldProps } from 'formik/dist/Field';
import { KategoriModell } from '../../../../types/arbeidsliste';

function ArbeidslistekategoriVisning(props: { name: string }) {
    return (
        <Field name={props.name}>
            {({ field, form }: FieldProps<KategoriModell>) => {
                return (
                    <div className="arbeidslistekategori">
                        <span className="skjemaelement__label">Kategori</span>
                        <Arbeidslistekategori
                            value={KategoriModell.BLA}
                            arbeidslisteikon={<ArbeidslisteikonBla />}
                            name={props.name}
                            onChange={() => form.setFieldValue(field.name, KategoriModell.BLA)}
                            checked={field.value === KategoriModell.BLA}
                            title="Arbeidslisteikon blå"
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.LILLA}
                            arbeidslisteikon={<ArbeidslisteikonLilla />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.LILLA)}
                            checked={field.value === KategoriModell.LILLA}
                            title="Arbeidslisteikon lilla"
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.GRONN}
                            arbeidslisteikon={<ArbeidslisteikonGronn />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GRONN)}
                            checked={field.value === KategoriModell.GRONN}
                            title="Arbeidslisteikon grønn"
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.GUL}
                            arbeidslisteikon={<ArbeidslisteikonGul />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GUL)}
                            checked={field.value === KategoriModell.GUL}
                            title="Arbeidslisteikon gul"
                        />
                    </div>
                );
            }}
        </Field>
    );
}

export default ArbeidslistekategoriVisning;
