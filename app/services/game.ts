import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Player from '../models/player';

export const MIN_PLAYER_COUNT = 2;
export const MAX_PLAYER_COUNT = 4;
const WIN_SCORE = 100;

export default class GameService extends Service {
  @tracked players: Player[];
  @tracked currentPlayerNumber = 1;
  @tracked currentNumber = 0;
  @tracked currentTurnScore = 0;
  @tracked hasWinner = false;

  get currentPlayer(): Player {
    let current = this.players.find((player) => player.number === this.currentPlayerNumber);
    return current ? current : this.players[0];
  }

  constructor() {
    super(...arguments);

    this.players = [];

    for (let i = 0; i < MIN_PLAYER_COUNT; i++) {
      this.players.push(new Player(i + 1, true));
    }
  }

  resetGame() {
    this.players.forEach((player) => {
      player.score = 0;
    });
  }

  nextPlayer() {
    let nextPlayerNumber = this.currentPlayerNumber + 1;

    if (nextPlayerNumber > this.players.length) {
      this.currentPlayerNumber = 1;
    } else {
      this.currentPlayerNumber = nextPlayerNumber;
    }
  }

  @action
  numberEntered(number: number) {
    this.currentNumber = number;
  }

  @action
  addToScore() {
    this.currentTurnScore += this.currentNumber;
    this.currentNumber = 0;
  }

  @action
  pass() {
    this.currentPlayer.score += this.currentTurnScore;
    this.currentNumber = 0;

    if (this.currentPlayer.score >= WIN_SCORE) {
      this.hasWinner = true;
      return;
    }

    this.currentTurnScore = 0;

    this.nextPlayer();
  }

  @action
  bust() {
    this.currentTurnScore = 0;
    this.currentNumber = 0;

    this.nextPlayer();
  }

  @action
  newGame() {
    this.currentPlayerNumber = 1;
    this.currentTurnScore = 0;
    this.currentNumber = 0;
    this.hasWinner = false;

    this.resetGame();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    game: GameService;
  }
}
