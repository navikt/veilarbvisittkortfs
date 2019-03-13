export function opprettetAv(opprettetAv: string, opprettetAvBrukerId: string) {
   if(opprettetAv === 'NAV'){
       return `av ${opprettetAvBrukerId}`
   }
   if(opprettetAv === 'SYSTEM') {
       return "av system (automatisk oppdatering)";
   }

   return "av brukeren";
}

