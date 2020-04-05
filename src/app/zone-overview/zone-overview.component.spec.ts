import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneOverviewComponent } from './zone-overview.component';

describe('ZoneOverviewComponent', () => {
  let component: ZoneOverviewComponent;
  let fixture: ComponentFixture<ZoneOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
