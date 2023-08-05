import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from '../services/game';
import { Player } from '../models/player';
import GameService from '../services/game';
import { EmptyObject } from '@ember/component/helper';
import { Input } from '@ember/component';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import not from 'ember-truth-helpers/helpers/not';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

interface OptionsFormSignature {
  Element: HTMLButtonElement;
  Args: {
    onFormClosed: () => void;
  };
  Blocks: EmptyObject;
}

export default class OptionsForm extends Component<OptionsFormSignature> {
  @service declare game: GameService;

  @tracked numberOfPlayers: number;
  @tracked players: Player[];

  originalPlayerCount: number;

  get shouldResetScores() {
    return this.originalPlayerCount !== this.numberOfPlayers;
  }

  constructor(owner: unknown, args: OptionsFormSignature['Args']) {
    super(owner, args);

    this.originalPlayerCount = this.game.players.length;
    this.numberOfPlayers = this.game.players.length;
    this.players = this.clonePlayers(this.game.players);

    if (this.players.length < MAX_PLAYER_COUNT) {
      for (let i = this.players.length; i < MAX_PLAYER_COUNT; i++) {
        let newPlayer = new Player(i + 1);
        this.players.push(newPlayer);
      }
    }
  }

  clonePlayers(players: Player[]) {
    return players.map((player) => {
      let newPlayer = new Player(player.number, player.enabled);
      newPlayer.name = player.name;
      newPlayer.score = this.shouldResetScores ? 0 : player.score;
      return newPlayer;
    });
  }

  @action changePlayers(number: number) {
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

  @action saveOptions(event: Event) {
    event.preventDefault();

    this.game.players = this.clonePlayers(this.players.filter((player) => player.enabled));

    if (this.shouldResetScores) {
      this.game.newGame();
    }

    if (this.args.onFormClosed) {
      this.args.onFormClosed();
    }
  }

  <template>
    <ModalDialog
      @overlayClass='bg-gray-900/50 w-screen h-screen fixed inset-0 flex justify-center items-center'
      @wrapperClass='px-6 flex justify-center w-screen h-screen fixed top-0 left-0'
      @containerClass='px-6 w-full md:px-0'
    >
      <div class='mx-auto p-4 w-full bg-white rounded-lg shadow-lg sm:p-6 md:w-2/3'>
        <div>
          <h2 class='text-xl font-semibold'>Options</h2>

          <div
            class='mt-6 flex flex-col md:shrink-0 md:flex-row md:items-center md:justify-between'
          >
            <div>
              <label class='shrink-0'>Number of players</label>
              <div class='flex items-center w-full mt-2'>
                <div>
                  <button
                    type='button'
                    class='w-8 h-8 text-center bg-teal-600 text-white text-xl font-bold rounded-full hover:bg-teal-500 focus:outline-none focus:ring-2 focus:focus:ring-teal-800'
                    {{on 'click' (fn this.changePlayers -1)}}
                  >
                    -
                  </button>
                  <span class='inline-block ml-2 w-8 font-semibold text-2xl text-center'>
                    {{this.numberOfPlayers}}
                  </span>
                  <button
                    type='button'
                    class='ml-2 w-8 h-8 text-center bg-teal-600 text-white text-xl font-bold rounded-full hover:bg-teal-500 focus:outline-none focus:ring-2 focus:focus:ring-teal-800'
                    {{on 'click' (fn this.changePlayers 1)}}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div class='mt-6 md:flex-1 md:mt-0 md:ml-6'>
              <div class='px-2 py-4 bg-yellow-200 text-yellow-900 border border-yellow-300 rounded'>
                Changing number of players resets the game.
              </div>
            </div>
          </div>

          <form {{on 'submit' this.saveOptions}}>
            {{#each this.players as |player index|}}
              <div class='mt-6'>
                <div class='flex gap-2 items-center w-full'>
                  <label for='player-{{index}}' class='flex-none'>
                    Player
                    {{player.number}}
                  </label>
                  <Input
                    id='player-{{index}}'
                    class='grow px-4 py-2 bg-white shadow-inset border rounded focus:outline-none focus:ring-2 focus:focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-600'
                    disabled={{not player.enabled}}
                    @value={{player.name}}
                  />
                </div>
              </div>
            {{/each}}

            <div class='mt-6 flex justify-between'>
              <div>
                <button
                  type='button'
                  class='px-4 py-2 border border-red-500 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:focus:ring-red-800'
                  {{on 'click' this.resetGame}}
                >
                  Reset
                </button>
              </div>

              <div class='flex justify-end'>
                <button
                  type='button'
                  class='px-4 py-2 border border-purple-500 rounded hover:bg-purple-200 focus:outline-none focus:ring-2 focus:focus:ring-purple-800'
                  {{on 'click' this.cancelOptions}}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  class='ml-2 px-4 py-2 bg-purple-500 border border-purple-500 text-white rounded hover:bg-purple-400 focus:outline-none focus:ring-2 focus:focus:ring-purple-800'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalDialog>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    OptionsForm: typeof OptionsForm;
  }
}
