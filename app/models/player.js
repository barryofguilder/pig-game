import { tracked } from '@glimmer/tracking';

export default class Player {
  @tracked number;
  @tracked enabled;
  @tracked name;
  @tracked score;

  constructor(number, enabled) {
    this.number = number;
    this.enabled = enabled || false;
    this.name = `Player ${number}`;
    this.score = 0;
  }
}
