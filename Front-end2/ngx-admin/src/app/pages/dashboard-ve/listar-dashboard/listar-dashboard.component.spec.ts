import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDashboardComponent } from './listar-dashboard.component';

describe('ListarDashboardComponent', () => {
  let component: ListarDashboardComponent;
  let fixture: ComponentFixture<ListarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
