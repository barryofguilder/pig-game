import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

const WIN_SCORE = 100;

export default class GameBoardComponent extends Component {
  @service game;

  @tracked currentPlayerNumber = 1;
  @tracked currentNumber = 0;
  @tracked currentTurnScore = 0;
  @tracked hasWinner = false;

  get players() {
    return this.game.players.filter((player) => player.enabled);
  }

  get currentPlayer() {
    return this.players.find((player) => player.number === this.currentPlayerNumber);
  }

  nextPlayer() {
    let nextPlayerNumber = this.currentPlayerNumber + 1;

    if (nextPlayerNumber > this.players.length) {
      this.currentPlayerNumber = 1;
    } else {
      this.currentPlayerNumber = nextPlayerNumber;
    }
  }

  @action numberEntered(number) {
    this.currentNumber = number;
  }

  @action addToScore() {
    this.currentTurnScore += this.currentNumber;
    this.currentNumber = 0;
  }

  @action pass() {
    this.currentPlayer.score += this.currentTurnScore;
    this.currentNumber = 0;

    if (this.currentPlayer.score >= WIN_SCORE) {
      this.hasWinner = true;
      return;
    }

    this.currentTurnScore = 0;

    this.nextPlayer();
  }

  @action bust() {
    this.currentTurnScore = 0;
    this.currentNumber = 0;

    this.nextPlayer();
  }

  @action newGame() {
    this.currentPlayerNumber = 1;
    this.currentTurnScore = 0;
    this.currentNumber = 0;
    this.hasWinner = false;

    // TODO: Update this to call a `resetGame` function on the game service
    this.players.forEach((player) => {
      player.score = 0;
    });
  }
}
