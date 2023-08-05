import type { TOC } from '@ember/component/template-only';
import { EmptyObject } from '@ember/component/helper';
import { Player } from '../models/player';

interface PlayerScoreSignature {
  Element: HTMLDivElement;
  Args: {
    isCurrentPlayer: boolean;
    player: Player;
  };
  Blocks: EmptyObject;
}

const PlayerScore: TOC<PlayerScoreSignature> = <template>
  <div
    class='flex items-baseline mt-2 px-2 rounded border-b-4
      {{if @isCurrentPlayer "bg-teal-200 border-teal-500" "border-transparent"}}'
  >
    <div class='text-teal-700 md:text-lg'>
      {{@player.name}}
    </div>

    <div class='ml-4 text-2xl font-semibold text-teal-900 md:text-4xl'>{{@player.score}}</div>
  </div>
</template>;

export default PlayerScore;
