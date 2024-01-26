import { TestBed } from '@angular/core/testing';

import { SightAndSoundService } from './sight-and-sound.service';

describe('SightAndSoundService', () => {
  let service: SightAndSoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SightAndSoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
