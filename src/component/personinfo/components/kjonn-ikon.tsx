import KvinneIkon from './kvinne.svg?react';
import MannIkon from './mann.svg?react';
import visibleIf from '../../components/visible-if';

function KjonnIkon(props: { kjonn: string }) {
    const kjonnLowerCase = props.kjonn.toLowerCase();
    // kan ta bort 'k' og 'm' når vi kun henter personalia fra PDL
    if (kjonnLowerCase === 'k' || kjonnLowerCase === 'kvinne') {
        return <KvinneIkon />;
    } else if (kjonnLowerCase === 'm' || kjonnLowerCase === 'mann') {
        return <MannIkon />;
    }
    return null;
}

export default visibleIf(KjonnIkon);
