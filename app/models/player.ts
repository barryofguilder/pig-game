import { tracked } from '@glimmer/tracking';

export default class Player {
  @tracked number: number;
  @tracked enabled: boolean;
  @tracked name: string;
  @tracked score: number;

  constructor(number: number, enabled?: boolean) {
    this.number = number;
    this.enabled = enabled || false;
    this.name = `Player ${number}`;
    this.score = 0;
  }
}
