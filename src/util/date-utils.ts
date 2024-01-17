import dayjs from 'dayjs';

function safeFormat(date: dayjs.Dayjs, format: string): string | undefined {
    return date.isValid() ? date.format(format) : undefined;
}

/**
 *
 * @param dato
 *
 * Å sende inn undefined som input her vil gi dagens dato
 */
export const dateToISODate = (datoStr: string): string | undefined => {
    const parsetDato = dayjs(datoStr);
    return datoStr && parsetDato.isValid() ? parsetDato.toISOString() : undefined;
};

/**
 *
 * @param dato
 *
 * Å sende inn undefined som input her vil gi dagens dato
 */
export function formaterDatoKortManed(dato: string | Date | undefined) {
    return safeFormat(dayjs(dato), 'D MMM YYYY');
}

/**
 *
 * @param dato
 *
 * Å sende inn undefined som input her vil gi dagens dato
 */
export function toSimpleDateStr(dato: string | Date | undefined): string | undefined {
    return safeFormat(dayjs(dato), 'DD.MM.YYYY');
}

export function todayReversedDateStr(): string {
    return dayjs().format('YYYY-MM-DD');
}

/**
 *
 * @param dato
 *
 * Å sende inn undefined som input her vil gi dagens dato
 */
export function toReversedDateStr(dato: string | Date | undefined): string | undefined {
    return safeFormat(dayjs(dato || undefined), 'YYYY-MM-DD');
}

export const erGyldigISODato = (isoDato: string) => isoDato && dayjs(isoDato).isValid();
