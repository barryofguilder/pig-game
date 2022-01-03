import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked showOptions = false;

  @action showOptionsDialog() {
    this.showOptions = true;
  }

  @action formClosed() {
    this.showOptions = false;
  }
}
