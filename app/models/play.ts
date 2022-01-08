import { Player } from './player';

export type PerformedAction = 'roll' | 'pass' | 'bust';

export class Play {
  player: Player;
  action: PerformedAction;
  points: number;

  constructor(player: Player, action: PerformedAction, points: number) {
    this.player = player;
    this.action = action;
    this.points = points;
  }
}
