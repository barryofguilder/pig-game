import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import { ComponentLike, HelperLike } from '@glint/template';
import eq from 'ember-truth-helpers/helpers/eq';
import not from 'ember-truth-helpers/helpers/not';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    eq: typeof eq;
    not: typeof not;
    ModalDialog: ComponentLike<{
      Element: HTMLDivElement;
      Blocks: { default: [] };
      Args: {
        containerClass?: string;
        overlayClass?: string;
        wrapperClass?: string;
      };
    }>;
    'page-title': HelperLike<{
      Args: { Positional: [title: string] };
      Return: void;
    }>;
  }
}
