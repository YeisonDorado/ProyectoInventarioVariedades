import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPermisosRolesComponent } from './crear-permisos-roles.component';

describe('CrearPermisosRolesComponent', () => {
  let component: CrearPermisosRolesComponent;
  let fixture: ComponentFixture<CrearPermisosRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPermisosRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPermisosRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
