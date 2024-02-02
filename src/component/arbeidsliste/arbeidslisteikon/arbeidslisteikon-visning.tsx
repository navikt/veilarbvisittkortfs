/// <reference types="vite-plugin-svgr/client" />

import ArbeidslisteikonBla from './arbeidslisteikon_bla.svg?react';
import ArbeidslisteikonLilla from './arbeidslisteikon_lilla.svg?react';
import ArbeidslisteikonGronn from './arbeidslisteikon_gronn.svg?react';
import ArbeidslisteikonGul from './arbeidslisteikon_gul.svg?react';
import { Field } from 'formik';
import Arbeidslistekategori from './arbeidslistekategori';
import { FieldProps } from 'formik/dist/Field';
import { KategoriModell } from '../../../api/veilarbportefolje';
import { Label } from '@navikt/ds-react';

function ArbeidslistekategoriVisning(props: { name: string }) {
    return (
        <Field name={props.name}>
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
                                name={props.name}
                                onChange={() => form.setFieldValue(field.name, KategoriModell.BLA)}
                                checked={field.value === KategoriModell.BLA}
                                title="Arbeidslisteikon blå"
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
                                value={KategoriModell.LILLA}
                                arbeidslisteikon={<ArbeidslisteikonLilla />}
                                name={props.name}
                                onChange={() => form.setFieldValue(props.name, KategoriModell.LILLA)}
                                checked={field.value === KategoriModell.LILLA}
                                title="Arbeidslisteikon lilla"
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
                    </div>
                );
            }}
        </Field>
    );
}

export default ArbeidslistekategoriVisning;
