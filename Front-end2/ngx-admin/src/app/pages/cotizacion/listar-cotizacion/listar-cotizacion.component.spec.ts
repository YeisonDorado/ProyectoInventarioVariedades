import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCotizacionComponent } from './listar-cotizacion.component';

describe('ListarCotizacionComponent', () => {
  let component: ListarCotizacionComponent;
  let fixture: ComponentFixture<ListarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
