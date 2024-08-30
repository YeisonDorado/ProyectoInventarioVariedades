import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosComponent } from './listar-egresos.component';

describe('ListarEgresosComponent', () => {
  let component: ListarEgresosComponent;
  let fixture: ComponentFixture<ListarEgresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
