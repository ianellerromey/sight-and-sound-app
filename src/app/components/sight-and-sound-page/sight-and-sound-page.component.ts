import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SinSoNode, SightAndSoundService } from 'src/app/services/sight-and-sound.service';

@Component({
  selector: 'app-sight-and-sound-page',
  templateUrl: './sight-and-sound-page.component.html',
  styleUrls: ['./sight-and-sound-page.component.scss']
})
export class SightAndSoundPageComponent implements OnInit {
  sinSoNode: SinSoNode | null = null;
  sinSoIds: number[] = [];

  constructor(
    private sinSoService: SightAndSoundService
  ) { }

  get firstSinSoId(): number {
    return this.sinSoIds[0];
  }

  get lastSinSoId(): number {
    return this.sinSoIds[this.sinSoIds.length - 1];
  }

  ngOnInit(): void {
    // the SightAndSoundService property `sinSoIds` is only populated after the SightAndSoundService performs the initial fetch;
    // once it has been populated, it won't change during the lifecycle of the app, so we only need to take(1)
    this.sinSoService.sinSoStream.pipe(take(1))
      .subscribe(_ => this.sinSoIds = this.sinSoService.sinSoIds);
    this.sinSoService.sinSoStream.subscribe((sinSoNode: SinSoNode | null) => {
        this.sinSoNode = sinSoNode;
      });
  }

  updateSinSoNode(newCurrentSinSoId: number | null): void {
    newCurrentSinSoId !== null && this.sinSoService.updateSinSoNode(newCurrentSinSoId);
  }

}
