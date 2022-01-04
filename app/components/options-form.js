import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from '../services/game';
import Player from '../models/player';

export default class OptionsFormComponent extends Component {
  @service game;

  @tracked numberOfPlayers = this.game.players.length;
  @tracked players;

  originalPlayerCount = this.game.players.length;

  get shouldResetScores() {
    return this.originalPlayerCount !== this.numberOfPlayers;
  }

  constructor() {
    super(...arguments);

    this.players = this.clonePlayers(this.game.players);

    if (this.players.length < MAX_PLAYER_COUNT) {
      for (let i = this.players.length; i < MAX_PLAYER_COUNT; i++) {
        let newPlayer = new Player(i + 1);
        this.players.push(newPlayer);
      }
    }
  }

  clonePlayers(players) {
    return players.map((player) => {
      let newPlayer = new Player(player.number, player.enabled);
      newPlayer.name = player.name;
      newPlayer.score = this.shouldResetScores ? 0 : player.score;
      return newPlayer;
    });
  }

  @action changePlayers(number) {
    this.numberOfPlayers += number;

    if (this.numberOfPlayers < MIN_PLAYER_COUNT) {
      this.numberOfPlayers = MIN_PLAYER_COUNT;
    }

    if (this.numberOfPlayers > MAX_PLAYER_COUNT) {
      this.numberOfPlayers = MAX_PLAYER_COUNT;
    }

    this.players.forEach((player, index) => {
      player.enabled = index < this.numberOfPlayers;
    });
  }

  @action resetGame() {
    this.game.newGame();

    if (this.args.onFormClosed) {
      this.args.onFormClosed();
    }
  }

  @action cancelOptions() {
    if (this.args.onFormClosed) {
      this.args.onFormClosed();
    }
  }

  @action saveOptions(event) {
    event.preventDefault();

    this.game.players = this.clonePlayers(this.players.filter((player) => player.enabled));

    if (this.shouldResetScores) {
      this.game.newGame();
    }

    if (this.args.onFormClosed) {
      this.args.onFormClosed();
    }
  }
}
