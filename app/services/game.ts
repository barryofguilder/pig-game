import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { Player } from '../models/player';
import { Play } from '../models/play';

export const MIN_PLAYER_COUNT = 2;
export const MAX_PLAYER_COUNT = 4;
const WIN_SCORE = 100;

export default class GameService extends Service {
  @tracked players: Player[];
  @tracked currentPlayerNumber = 1;
  @tracked currentNumber = 0;
  @tracked currentTurnScore = 0;
  @tracked hasWinner = false;
  @tracked plays: Play[] = A([]);

  get currentPlayer(): Player {
    let current = this.players.find((player) => player.number === this.currentPlayerNumber);
    return current ? current : this.players[0];
  }

  get undoDisabled(): boolean {
    return this.plays.length === 0;
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

    this.plays = A([]);
  }

  nextPlayer() {
    let nextPlayerNumber = this.currentPlayerNumber + 1;

    if (nextPlayerNumber > this.players.length) {
      this.currentPlayerNumber = 1;
    } else {
      this.currentPlayerNumber = nextPlayerNumber;
    }
  }

  previousPlayer() {
    let previousPlayerNumber = this.currentPlayerNumber - 1;

    if (previousPlayerNumber === 0) {
      this.currentPlayerNumber = this.players.length;
    } else {
      this.currentPlayerNumber = previousPlayerNumber;
    }
  }

  addPlay(play: Play): void {
    this.plays.pushObject(play);
  }

  @action
  numberEntered(number: number) {
    this.currentNumber = number;
  }

  @action
  addToScore() {
    this.addPlay(new Play(this.currentPlayer, 'roll', this.currentNumber));
    this.currentTurnScore += this.currentNumber;
    this.currentNumber = 0;
  }

  @action
  pass() {
    this.addPlay(new Play(this.currentPlayer, 'pass', this.currentTurnScore));
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
    this.addPlay(new Play(this.currentPlayer, 'bust', this.currentTurnScore));
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

  @action
  undo() {
    const play = this.plays.popObject();

    if (play.action === 'bust') {
      // Go to previous player and update current turn score.
      this.previousPlayer();
      this.currentTurnScore = play.points;
    } else if (play.action === 'pass') {
      // Go to previous player, remove past turn score from score, update current turn score.
      this.previousPlayer();
      this.currentPlayer.score -= play.points;
      this.currentTurnScore = play.points;
      this.currentNumber = 0;
    } else if (play.action === 'roll') {
      // Remove previous roll from current turn score.
      this.currentTurnScore -= play.points;
      this.currentNumber = play.points;
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    game: GameService;
  }
}
