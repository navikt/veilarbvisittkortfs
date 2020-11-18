import dayjs from 'dayjs';
import { StringOrNothing } from './type/stringornothings';

function safeFormat(date: dayjs.Dayjs, format: string): string | undefined {
    return date.isValid() ? date.format(format) : undefined;
}

export const dateToISODate = (datoStr: string): string | undefined => {
    const parsetDato = dayjs(datoStr);
    return datoStr && parsetDato.isValid() ? parsetDato.toISOString() : undefined;
};

export function formaterDatoKortManed(datoStr: StringOrNothing) {
    return safeFormat(dayjs(datoStr || undefined), 'Do MMM YYYY');
}

export function toSimpleDateStr(dato: string | Date | undefined): string | undefined {
    return safeFormat(dayjs(dato), 'DD.MM.YYYY');
}

export function todayReversedDateStr(): string {
    return dayjs().format('YYYY-MM-DD');
}

export function toReversedDateStr(dato: string | Date | undefined): string | undefined {
    return safeFormat(dayjs(dato || undefined), 'YYYY-MM-DD');
}

export const erGyldigISODato = (isoDato: string) => isoDato && dayjs(isoDato).isValid();
