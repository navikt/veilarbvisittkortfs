import {FormikErrors, FormikTouched, getIn} from "formik";


export function getErrors<T> (errors: FormikErrors<T>, touched: FormikTouched<T>, elementName: string) {
    const hasTouched = getIn(touched, elementName);
    const hasErrors = getIn(errors, elementName);
    return hasTouched && hasErrors ? {feilmelding: errors} : undefined;
}