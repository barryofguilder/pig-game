import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import GameService from '../services/game';

export default class GameBoardComponent extends Component {
  @service declare game: GameService;
}
