import { Ligne } from "./ligne";
import { Arret } from "./arret";

export class TempsDattente {
    sens: number;
    terminus: string;
    infotrafic: boolean;
    temps: string;
    dernierDepart: boolean;
    tempsReel: boolean;
    ligne: Ligne;
    arret: Arret;
}