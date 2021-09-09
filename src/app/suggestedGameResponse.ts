import { School } from "./school";

export interface SuggestedGameResponse {
    week: number;
    opponent: School;
    homeGame: boolean;
}