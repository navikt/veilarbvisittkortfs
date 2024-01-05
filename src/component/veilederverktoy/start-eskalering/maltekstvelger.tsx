import React, { ChangeEvent } from 'react';
import { useFormikContext } from 'formik';
import { Select } from '@navikt/ds-react';
import './maltekstvelger.less';

const malTekster = {
    dagpenger:
        'NAV vurderer å stanse dagpengene dine, eller stanse utbetalingene dine i en periode, fordi du ikke har fulgt opp pliktene dine som arbeidssøker.\n' +
        '\n' +
        '[Fyll inn en kort begrunnelse for varslet]\n' +
        '\n' +
        'Vi sender deg dette varselet for å gi deg mulighet til å gi oss en forklaring før vi avgjør saken din. Svar på denne meldingen, eller ring oss for å gi forklaringen din. Fristen for å svare er [fristdato].\n' +
        '\n' +
        'Se folketrygdloven §§ 4-5, 4-20- 4-21 og forskrift om dagpenger under arbeidsløshet § 4-1.\n' +
        '\n' +
        'Har du spørsmål kan du svare på denne dialogmeldingen, eller ringe oss på tlf. 55 55 33 33.\n',
    dagpenger_vesentlig_avvik_fra_oppleringsplanen:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på meldingen.\n' +
        '\n' +
        'Hvis du ikke følger opplæringsplanen din hos NAV, kan du miste retten til å få dagpenger mens du tar utdanning eller opplæring. Hvis du mister retten, kan du tidligst søke på nytt om å få dagpenger mens du tar utdanning eller opplæring 6 måneder etter at du mistet retten. Les mer i forskrift om dagpenger under arbeidsløshet § 4-3f.\n' +
        '\n' +
        '[Fyll inn begrunnelse for varselet]\n' +
        '\n' +
        'Du kan gi en skriftlig tilbakemelding her i dialogen eller ringe oss på tlf. 55 55 33 33 før vi avgjør saken din. Fristen for tilbakemelding er [fristdato].',
    dagpenger_fortsatt_utdanning_etter_opphort_utdanning:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på meldingen.\n' +
        '\n' +
        'Du har tidligere fått et vedtak fra oss om at du har mistet retten til å få dagpenger mens du tar utdanning eller opplæring. Hvis du velger å fortsette utdanningen/opplæringen, får du altså ikke lenger dagpenger. Du kan tidligst søke på nytt om å få dagpenger mens du tar utdanning eller opplæring 6 måneder etter at du mistet retten. Dette går fram av folketrygdloven § 4-6 første ledd og forskrift om dagpenger under arbeidsløshet § 4-3f.\n' +
        '\n' +
        '[Fyll inn begrunnelse for varselet]\n' +
        '\n' +
        'Du kan gi en skriftlig tilbakemelding her i dialogen eller ringe oss på tlf. 55 55 33 33, før vi avgjør saken din. Fristen for tilbakemelding er [fristdato].',
    ikke_mott_mote:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.\n' +
        '\n' +
        'Vi kan stanse arbeidsavklaringspengene dine dersom du ikke deltar på møter du blir kalt inn til hos NAV.\n' +
        '\n' +
        'Dette går fram av folketrygdloven §§ 11-7 og 11-8.\n' +
        '\n' +
        '[Fyll inn begrunnelse for varslet]\n' +
        '\n' +
        'Vi sender deg dette varselet for at du skal ha mulighet til å uttale deg før vi avgjør saken din. Du må uttale deg innen [fristDato]. Du kan uttale deg skriftlig her eller du kan ringe oss på 55 55 33 33 og uttale deg muntlig.\n' +
        '\n' +
        'Dersom arbeidsavklaringspengene dine blir stanset, kan du sende inn en ny søknad. Du kan tidligst gjenoppta arbeidsavklaringspengene dine fra den dagen du søker. Søknadsskjema finner du på nav.no.\n',
    ikke_deltatt_aktivitet:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.\n' +
        '\n' +
        'Vi kan stanse arbeidsavklaringspengene dine dersom du ikke deltar på de planlagte aktivitetene og bidrar for å komme i arbeid.\n' +
        '\n' +
        'Dette går fram av folketrygdloven §§ 11-7 og 11-8.\n' +
        '\n' +
        '[Fyll inn begrunnelse for varslet]\n' +
        '\n' +
        'Vi sender deg dette varselet for at du skal ha mulighet til å uttale deg før vi avgjør saken din. Du må uttale deg innen [fristDato]. Du kan uttale deg skriftlig her eller du kan ringe oss på 55 55 33 33 og uttale deg muntlig.\n' +
        '\n' +
        'Dersom arbeidsavklaringspengene dine blir stanset, kan du sende inn en ny søknad. Du kan tidligst gjenoppta arbeidsavklaringspengene dine fra den dagen du søker. Søknadsskjema finner du på nav.no.\n',
    ikke_deltatt_tiltak:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.\n' +
        '\n' +
        'Vi kan stanse arbeidsavklaringspengene dine dersom du ikke deltar på de aktivitetene vi har blitt enige om.\n' +
        '\n' +
        'Dette går fram av folketrygdloven §§ 11-7 og 11-8.\n' +
        '\n' +
        '[Fyll inn begrunnelse for varslet]\n' +
        '\n' +
        'Vi sender deg dette varselet for at du skal ha mulighet til å uttale deg før vi avgjør saken din. Du må uttale deg innen [fristDato]. Du kan uttale deg skriftlig her eller du kan ringe oss på 55 55 33 33 og uttale deg muntlig.\n' +
        '\n' +
        'Dersom arbeidsavklaringspengene dine blir stanset, kan du sende inn en ny søknad. Du kan tidligst gjenoppta arbeidsavklaringspengene dine fra den dagen du søker. Søknadsskjema finner du på nav.no.\n',
    ikke_lenger_nedsatt_arbeidsevne:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe som du lurer på. Det gjør du ved å svare på denne dialogmeldingen.\n' +
        '\n' +
        'Du mottar arbeidsavklaringspenger (AAP), og har tidligere fått et vedtak som gjelder frem til [dato]. Vi vurderer nå å opphøre ytelsen tidligere enn denne datoen, fordi vi vurderer at du ikke lenger har nedsatt arbeidsevne på grunn av helsen din.\n' +
        '\n' +
        '[Begrunnelse for varselet. Skriv en kort oppsummering fra det tidspunktet brukeren fikk innvilget arbeidsavklaringspenger og vis til hva som har skjedd etterpå.]\n' +
        '\n' +
        '[Vis videre til grunnlaget for at NAV ikke lenger mener at folketrygdloven §11-5 er oppfylt, for eksempel: «Vurderingen er basert på følgende kilder:\n' +
        '    - legeerklæring fra fastlegen din (dato)\n' +
        '    - rapport fra tiltaksarrangøren din (dato)]\n' +
        '\n' +
        'På bakgrunn av dette, vurderer vi at sykdom eller skade ikke lenger er en vesentlig medvirkende årsak til at du har nedsatt arbeidsevne, se folketrygdloven §11-5.\n' +
        '\n' +
        'Du får dette varselet for at du skal ha mulighet til å uttale deg før vi avgjør saken din. Du får nå en frist på 14 dager, til [dato], med å komme med tilbakemelding. Vi vil ta tilbakemeldingen din med i vurderingen som vi gjør når fristen har gått ut.\n' +
        '\n' +
        'Hvis du ikke har mulighet til å uttale deg innen fristen, må du ta kontakt med oss så snart som mulig.\n' +
        '\n' +
        'Hvis vi ikke endrer den foreløpige vurderingen vår, betyr det at arbeidsavklaringspengene dine opphører fra og med [dato].\n',
    overgangsstonad:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.\n' +
        '\n' +
        'Kravene til deg som mottar overgangsstønad og er arbeidssøker går fram av folketrygdloven § 15-12 og § 15-6. Fordi du er en reell arbeidssøker krever vi at du skal ha minst 50 prosent med arbeidsrettede aktiviteter. Du må også aktivt søke arbeid og møte hos oss når vi har behov for å snakke med deg. Takker du nei til arbeid eller arbeidsmarkedstiltak eller ikke møter hos NAV etter at vi har kalt deg inn, kan du miste retten til overgangsstønad fra NAV i én måned. NAV kan også stanse overgangsstønaden din hvis du ikke lenger fyller aktivitetsplikten du har som reell arbeidssøker og ikke har rett til stønaden på andre vilkår.\n' +
        '\n' +
        '[Fyll inn begrunnelse for varslet]\n' +
        '\n' +
        'Vi sender deg dette varselet for at du skal ha mulighet til å uttale deg før vi avgjør saken din. Du må uttale deg innen [fristDato]. Du kan uttale deg skriftlig her eller du kan ringe oss på 55 55 33 33 og uttale deg muntlig.\n',
    sykepenger:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.\n' +
        '\n' +
        'Kravene til deg som har sykepenger og blir friskmeldt til å kunne søke jobber mens du beholder sykepengene i en periode, går fram av folketrygdloven § 8-5 og § 21-8. Du må være reell arbeidssøker i denne perioden. Det betyr at du må delta i arbeidsrettede aktiviteter, aktivt søke arbeid og møte hos oss når vi har behov for å snakke med deg. Hvis du takker nei til et arbeidsrettet tiltak, kan du miste retten til sykepenger.\n' +
        '\n' +
        '[Fyll inn begrunnelse for varslet]\n' +
        '\n' +
        'Vi sender deg dette varselet for at du skal ha mulighet til å uttale deg før vi avgjør saken din. Du må uttale deg innen [fristDato]. Du kan uttale deg skriftlig her eller du kan ringe oss på 55 55 33 33 og uttale deg muntlig.\n',
    stans_aap_i_periode:
        'Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne dialogmeldingen.\n' +
        '\n' +
        'Vi vurderer nå å stanse arbeidsavklaringspengene dine fordi:\n' +
        '\n' +
        '[Begrunnelse for varslet. Du må få frem hvilke aktiviteter eller plikter brukeren ikke har fulgt opp.]\n' +
        '\n' +
        'For å ha rett til arbeidsavklaringspenger mens du søker jobb, må du være registrert som arbeidssøker hos NAV og være villig til å ta ethvert arbeid, både heltid eller deltid, hvor som helst i landet. Du må også delta på tiltak og komme til møter vi innkaller til.\n' +
        '\n' +
        'Hvis du ikke gjennomfører aktiviteten du og NAV har blitt enige om, kan vi stanse arbeidsavklaringspengene, eller stanse utbetalingene dine i en periode.\n' +
        '\n' +
        'Dette går fram av folketrygdloven §§ 4-5, 4-20, 4-21, og 11-17.\n' +
        '\n' +
        'Du får dette varselet for at du skal ha mulighet til å uttale deg før vi avgjør saken din. Du får en frist på 14 dager, til [dato], for å komme med tilbakemelding. Du kan gi oss skriftlig tilbakemelding her i dialogen, eller du kan ringe oss på telefon 55 55 33 33.\n' +
        '\n' +
        'Hvis du ikke har mulighet til å uttale deg innen fristen, må du ta kontakt med oss så snart som mulig.\n',
    uutnyttet_arbeidsevne:
        'Les denne meldingen nøye. Gi beskjed til veilederen din hvis det er noe som du lurer på. Det kan du gjøre ved å svare på denne meldingen. \n' +
        '\n' +
        'Du mottar arbeidsavklaringspenger (AAP) og vi vurderer nå å redusere utbetaling av pengene dine. Hvis du har tapt arbeidsevnen din delvis, skal arbeidsavklaringspengene reduseres slik at du kun får utbetaling for den delen av arbeidsevnen som er tapt.\n' +
        '\n' +
        '(Forklar hvorfor vi mener at personen har en arbeidsevne som ikke er utnyttet og hvor stor del av arbeidsevnen det gjelder. Arbeidsevnen som ikke er utnyttet skal angis i prosent.) \n' +
        '\n' +
        'På bakgrunn av dette, vurderer vi at utbetalingen av arbeidsavklaringspengene dine skal reduseres, se folketrygdloven § 11-23. \n' +
        '\n' +
        'Du får dette varselet slik at du har mulighet til å uttale deg før vi avgjør saken din. Du får nå en frist på 14 dager, til xx.xx.xxxx, for å komme med en tilbakemelding. Vi vil ta tilbakemeldingen din med i vurderingen som vi gjør når fristen har gått ut. \n' +
        '\n' +
        'Hvis du ikke har mulighet til å uttale deg innen fristen, må du ta kontakt med oss så fort som mulig. \n' +
        '\n' +
        'Hvis vi ikke endrer den foreløpige vurderingen vår, betyr det at arbeidsavklaringspengene dine reduseres fra og med xx.xx.xxxx. Du vil få et eget vedtak som viser hvor mye arbeidsavklaringspengene dine reduseres. \n'
};

function Maltekstvelger() {
    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        if (e.target.value) {
            const message = malTekster[e.target.value];
            context.setFieldValue('begrunnelse', message);
            context.setFieldValue('tekst', message);
            context.setFieldValue('type', e.target.value);
        } else {
            context.resetForm();
        }
    }

    const context = useFormikContext();
    return (
        <Select label="Velg en mal" className="malvelger" size="small" onChange={onChange}>
            <option value="">Velg en mal</option>
            <option value="dagpenger">Dagpenger: Stans og tidsbegrenset bortfall.</option>
            <option value="dagpenger_vesentlig_avvik_fra_oppleringsplanen">
                {' '}
                Dagpenger: Vesentlig avvik fra opplæringsplanen.
            </option>
            <option value="dagpenger_fortsatt_utdanning_etter_opphort_utdanning">
                Dagpenger: Fortsatt utdanning etter opphørt utdanning.
            </option>
            <option value="ikke_mott_mote">Arbeidsavklaringspenger: Ikke møtt til møte</option>
            <option value="ikke_deltatt_aktivitet">
                Arbeidsavklaringspenger: Ikke deltatt på planlagt aktivitet eller bidrar ikke for å komme i arbeid
            </option>
            <option value="ikke_deltatt_tiltak">Arbeidsavklaringspenger: Ikke deltatt på tiltak</option>
            <option value="ikke_lenger_nedsatt_arbeidsevne">
                Arbeidsavklaringspenger: Ikke lenger nedsatt arbeidsevne
            </option>
            <option value="uutnyttet_arbeidsevne">
                Arbeidsavklaringspenger: Reduksjon i utbetaling på grunn av arbeidsevne som ikke er utnyttet
            </option>
            <option value="stans_aap_i_periode">
                Arbeidsavklaringspenger: Stans av AAP i perioden som arbeidssøker
            </option>
            <option value="overgangsstonad">Overgangsstønad</option>
            <option value="sykepenger">Sykepenger</option>
        </Select>
    );
}

export default Maltekstvelger;
