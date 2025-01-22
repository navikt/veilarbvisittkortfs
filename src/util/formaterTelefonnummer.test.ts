import { expect, test } from 'vitest';
import { formaterTelefonnummer } from './formaterTelefonnummer';

test('Formatterer norske telefonnummer riktig', () => {
    const utenLandskode = '12345678';
    const enkelLandskodeMedMellomrom = '0047 12 34 56 78';
    const enkelLandskodeUtenMellomrom = '004712345678';
    const landskodeMedMellomrom = '+47 12 34 56 78';
    const landskodeMedAndreMellomrom = '+47 123 45 678';
    const landskodeUtenMellomrom = '+4712345678';

    const forventa = '12 34 56 78';

    expect(formaterTelefonnummer(utenLandskode)).equals(forventa);
    expect(formaterTelefonnummer(enkelLandskodeMedMellomrom)).equals(forventa);
    expect(formaterTelefonnummer(enkelLandskodeUtenMellomrom)).equals(forventa);
    expect(formaterTelefonnummer(landskodeMedMellomrom)).equals(forventa);
    expect(formaterTelefonnummer(landskodeMedAndreMellomrom)).equals(forventa);
    expect(formaterTelefonnummer(landskodeUtenMellomrom)).equals(forventa);
});

test('Formatterer andre telefonnummer riktig', () => {
    const telefonnummerSverige = '+46 8 12345678';
    const forventetTelefonnummerSverige = '+4 68 12 34 56 78';
    const telefonnummerDanmark = '+45-12345678';
    const forventetTelefonnummerDanmark = '+4 5- 12 34 56 78';
    const telefonnummerDanmarkKunTall = '0045 12345678';
    const forventetTelefonnummerDanmarkKunTall = '00 45 12 34 56 78';
    const telefonnummerStorbritannia = '+44 7911 123456';
    const forventetTelefonnummerStorbritannia = '+4 47 91 11 23 45 6';
    const telefonnummerUSA = '1 (555) 555-1234';
    const forventetTelefonnummerUSA = '1( 55 5) 55 5- 12 34';
    const telefonnummerMontenegro = '+382 12 345 678';
    const forventetTelefonnummerMontenegro = '+3 82 12 34 56 78';
    const telefonnummerRussland = '+7 123 123-45-67';
    const forventetTelefonnummerRussland = '+7 12 31 23 -4 5- 67';

    expect(formaterTelefonnummer(telefonnummerSverige)).equals(forventetTelefonnummerSverige);
    expect(formaterTelefonnummer(telefonnummerDanmark)).equals(forventetTelefonnummerDanmark);
    expect(formaterTelefonnummer(telefonnummerDanmarkKunTall)).equals(forventetTelefonnummerDanmarkKunTall);
    expect(formaterTelefonnummer(telefonnummerStorbritannia)).equals(forventetTelefonnummerStorbritannia);
    expect(formaterTelefonnummer(telefonnummerUSA)).equals(forventetTelefonnummerUSA);
    expect(formaterTelefonnummer(telefonnummerMontenegro)).equals(forventetTelefonnummerMontenegro);
    expect(formaterTelefonnummer(telefonnummerRussland)).equals(forventetTelefonnummerRussland);
});
