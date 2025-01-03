import KvinneIkon from './kvinne.svg';
import MannIkon from './mann.svg';

interface Props {
    kjonn: string;
}

export function KjonnIkon({ kjonn }: Props) {
    const kjonnLowerCase = kjonn.toLowerCase();

    // kan ta bort 'k' og 'm' når vi kun henter personalia fra PDL
    if (kjonnLowerCase === 'k' || kjonnLowerCase === 'kvinne') {
        return <img src={KvinneIkon} className="personinfo__ikon" alt={'kvinne'} />;
    } else if (kjonnLowerCase === 'm' || kjonnLowerCase === 'mann') {
        return <img src={MannIkon} className="personinfo__ikon" alt={'mann'} />;
    }
    return null;
}
