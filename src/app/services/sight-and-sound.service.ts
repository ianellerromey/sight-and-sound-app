import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type SinSo = {
  id: number;
  content: string;
};

export type SinSoMap = {
  sinSo: SinSo[];
};

export type SinSoFull = {
  id: number;
  contentFull: string;
};

export type SinSoNode = {
  currentSinSo: SinSoFull;
  previousSinSo: number | null;
  nextSinSo: number | null;
};

@Injectable({
  providedIn: 'root'
})
export class SightAndSoundService {
  private _sinSo: SinSo[] = [];
  private _sinSoNode: SinSoNode | null = null;
  private _sinSoStream: Subject<SinSoNode | null> = new Subject<SinSoNode | null>();

  get sinSoIds(): number[] {
    return this._sinSo.map(sinSo => sinSo.id);
  }

  sinSoStream = this._sinSoStream.asObservable();

  constructor() {
    fetch('../../../assets/sinSo-map.json')
      .then(response => response.json())
      .then((response: SinSoMap) => {
          this._sinSo = response.sinSo;
          this.updateSinSoNode(this.sinSoIds.length - 1);
        });
  }

  public updateSinSoNode(newCurrentSinSoId: number): void {
    this.getNewSinSoNode(newCurrentSinSoId)
      .subscribe((sinSoNode: SinSoNode) => {
          this._sinSoNode = sinSoNode;
          this._sinSoStream.next(this._sinSoNode);
        });
  }

  private getNewSinSoNode(newCurrentSinSoId: number): Observable<SinSoNode> {
    const newPreviousSinSoId = newCurrentSinSoId - 1;
    const newNextSinSoId = newCurrentSinSoId + 1;
    const newCurrentSinSo = this._sinSo[newCurrentSinSoId];

    const sinSoSubject = new Subject<SinSoNode>();

    fetch(`../../../assets/sinSo-content/${newCurrentSinSo.content}`)
      .then(response => response.text())
      .then((response: string) => {
          sinSoSubject.next({
            currentSinSo: {
              id: newCurrentSinSo.id,
              contentFull: response
            },
            previousSinSo: (newPreviousSinSoId < 0) ? null : newPreviousSinSoId,
            nextSinSo: (newNextSinSoId >= this._sinSo.length) ? null : newNextSinSoId
          });
        });

    return sinSoSubject;
  }
}
