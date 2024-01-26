import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightAndSoundPageComponent } from './sight-and-sound-page.component';

describe('SightAndSoundPageComponent', () => {
  let component: SightAndSoundPageComponent;
  let fixture: ComponentFixture<SightAndSoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightAndSoundPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightAndSoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
