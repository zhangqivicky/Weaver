import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttComponent } from './event-att.component';

describe('EventAttComponent', () => {
  let component: EventAttComponent;
  let fixture: ComponentFixture<EventAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
