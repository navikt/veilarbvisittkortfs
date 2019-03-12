export function storeForbokstaver(tekster: string[]): string {
    const tekst = tekster.filter(s => s).join(' ');

    return tekst
        .split(' ')
        .map(ord => ord.charAt(0).toUpperCase() + ord.slice(1).toLowerCase())
        .join(' ');
}