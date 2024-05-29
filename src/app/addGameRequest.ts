import { GameResult } from './game';

export class AddGameRequest {
  awayId!: number;
  homeId!: number;
  week!: number;
  day?: string;
  time?: number;
  gameResult?: GameResult;
}
