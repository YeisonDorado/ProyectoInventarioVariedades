import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPermisosRolesComponent } from './listar-permisos-roles.component';

describe('ListarPermisosRolesComponent', () => {
  let component: ListarPermisosRolesComponent;
  let fixture: ComponentFixture<ListarPermisosRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPermisosRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPermisosRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
