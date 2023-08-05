import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import GameService from '../services/game';
import PlayerScore from './player-score';
import NumberButton from './number-button';
import { on } from '@ember/modifier';
import eq from 'ember-truth-helpers/helpers/eq';
import { EmptyObject } from '@ember/component/helper';

interface GameBoardSignature {
  Element: HTMLButtonElement;
  Args: EmptyObject;
  Blocks: EmptyObject;
}

export default class GameBoard extends Component<GameBoardSignature> {
  @service declare game: GameService;

  <template>
    <div class='flex flex-wrap justify-between'>
      {{#each this.game.players as |player|}}
        <PlayerScore
          @player={{player}}
          @isCurrentPlayer={{eq this.game.currentPlayer.number player.number}}
        />
      {{/each}}
    </div>

    {{#if this.game.hasWinner}}
      <div class='mt-12 px-4 py-2 text-2xl text-center bg-blue-200 text-blue-800 rounded'>
        {{this.game.currentPlayer.name}}
        wins!!! 🎉
      </div>

      <div class='mt-12 text-center'>
        <button
          type='button'
          class='py-4 px-3 w-1/2 text-lg font-semibold bg-green-300 text-green-900 rounded-lg focus:outline-none focus:ring-blue-500'
          {{on 'click' this.game.newGame}}
        >
          New Game
        </button>
      </div>
    {{else}}
      <div class='mt-8 flex flex-col'>
        <div class='mt-8 mx-auto flex flex-col'>
          <div>
            <div class='flex'>
              <div
                class='grow px-4 py-2 text-5xl font-semibold bg-gray-200 text-gray-800 rounded-lg rounded-r-none md:text-6xl'
              >
                {{this.game.currentNumber}}
                <div class='uppercase tracking-wide text-xs text-gray-600 md:text-sm'>Die Face</div>
              </div>
              <div
                class='flex-none w-32 px-4 py-2 text-5xl font-semibold text-right bg-gray-300 text-gray-800 rounded-lg rounded-l-none md:w-48 md:text-6xl'
              >
                {{this.game.currentTurnScore}}
                <div class='uppercase tracking-wide text-xs text-gray-600 md:text-sm'>Turn Score</div>
              </div>
            </div>
            <div>
              <div class='mt-8'>
                <NumberButton @number={{2}} @onClick={{this.game.numberEntered}} />
                <NumberButton @number={{3}} @onClick={{this.game.numberEntered}} />
                <NumberButton @number={{4}} @onClick={{this.game.numberEntered}} />
                <button
                  type='button'
                  class='ml-2 w-32 h-16 font-semibold rounded-lg bg-green-400 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-800 md:w-48 md:h-24 md:text-2xl'
                  {{on 'click' this.game.pass}}
                >
                  Pass
                </button>
              </div>
              <div class='mt-2'>
                <NumberButton @number={{5}} @onClick={{this.game.numberEntered}} />
                <NumberButton @number={{6}} @onClick={{this.game.numberEntered}} />
                <button
                  type='button'
                  class='w-16 h-16 text-xl bg-teal-500 text-teal-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-800 md:w-24 md:h-24 md:text-4xl'
                  {{on 'click' this.game.addToScore}}
                >
                  +
                </button>
                <button
                  type='button'
                  class='ml-2 w-32 h-16 font-semibold rounded-lg bg-red-400 text-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 md:w-48 md:h-24 md:text-2xl'
                  {{on 'click' this.game.bust}}
                >
                  Bust!
                </button>
              </div>
            </div>
          </div>

          <div class='mt-8 flex justify-end'>
            <button
              type='button'
              class='px-3 py-1 font-semibold rounded-lg text-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:ring-gray-400 disabled:bg-gray-300 disabled:text-gray-500'
              disabled={{this.game.undoDisabled}}
              {{on 'click' this.game.undo}}
            >
              Undo
            </button>
          </div>
        </div>
      </div>
    {{/if}}
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    GameBoard: typeof GameBoard;
  }
}
