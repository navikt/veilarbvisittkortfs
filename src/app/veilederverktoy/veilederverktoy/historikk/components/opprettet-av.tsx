export function opprettetAvTekst(opprettetAv: string, opprettetAvBrukerId: string) {
   if (opprettetAv === 'NAV') {
       return opprettetAvBrukerId ? `av ${opprettetAvBrukerId}` : '';
   }
   if (opprettetAv === 'SYSTEM') {
       return 'av system (automatisk oppdatering)';
   }

   return 'av brukeren';
}
