import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const WIN_SCORE = 100;

export default class GameBoardComponent extends Component {
  @tracked currentPlayer = 1;
  @tracked player1Score = 0;
  @tracked player2Score = 0;

  @tracked currentNumber = 0;
  @tracked currentTurnScore = 0;
  @tracked hasWinner = false;

  get player1Turn() {
    return this.currentPlayer === 1;
  }

  get player2Turn() {
    return this.currentPlayer === 2;
  }

  nextPlayer() {
    if (this.player1Turn) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  checkForWin() {
    if (this.player1Turn) {
      return this.player1Score >= WIN_SCORE;
    } else {
      return this.player2Score >= WIN_SCORE;
    }
  }

  @action numberEntered(number) {
    this.currentNumber = number;
  }

  @action addToScore() {
    this.currentTurnScore += parseInt(this.currentNumber);
    this.currentNumber = 0;
  }

  @action pass() {
    if (this.player1Turn) {
      this.player1Score += this.currentTurnScore;
    } else {
      this.player2Score += this.currentTurnScore;
    }

    if (this.checkForWin()) {
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
    this.currentPlayer = 1;
    this.currentTurnScore = 0;
    this.currentNumber = 0;
    this.hasWinner = false;
    this.player1Score = 0;
    this.player2Score = 0;
  }
}
