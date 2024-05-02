import { Conference } from "./conference";

export interface School {
    tgid: number;
    name: string;
    nickname: string;
    state: string;
    conferenceName: string;
    conference: Conference;
    division: string;
    ncaaDivision: string;
    color: string;
    altColor: string;
    logo: string;
    userTeam: boolean;

}