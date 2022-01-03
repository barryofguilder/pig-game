import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Player from '../models/player';

export const MIN_PLAYER_COUNT = 2;
export const MAX_PLAYER_COUNT = 4;

export default class GameService extends Service {
  @tracked numberOfPlayers = MIN_PLAYER_COUNT;
  @tracked players;

  constructor() {
    super(...arguments);

    this.players = [];

    for (let i = 0; i < MAX_PLAYER_COUNT; i++) {
      this.players.push(new Player(i + 1, i < this.numberOfPlayers));
    }
  }
}
