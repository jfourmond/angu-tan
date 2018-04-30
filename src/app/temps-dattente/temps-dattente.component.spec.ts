import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsDattenteComponent } from './temps-dattente.component';

describe('TempsDattenteComponent', () => {
  let component: TempsDattenteComponent;
  let fixture: ComponentFixture<TempsDattenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempsDattenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempsDattenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
