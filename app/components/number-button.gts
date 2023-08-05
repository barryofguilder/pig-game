import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { EmptyObject } from '@ember/component/helper';

interface NumberButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    number: number;
    onClick: (number: number) => void;
  };
  Blocks: EmptyObject;
}

const NumberButton: TOC<NumberButtonSignature> = <template>
  <button
    type='button'
    class='w-16 h-16 bg-purple-500 text-purple-100 rounded-full focus:outline-none focus:ring-2 focus:focus:ring-purple-800 md:w-24 md:h-24 md:text-4xl'
    {{on 'click' (fn @onClick @number)}}
  >
    {{@number}}
  </button>
</template>;

export default NumberButton;
