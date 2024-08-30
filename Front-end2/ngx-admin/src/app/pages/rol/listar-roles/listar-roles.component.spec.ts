import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRolesComponent } from './listar-roles.component';

describe('ListarRolesComponent', () => {
  let component: ListarRolesComponent;
  let fixture: ComponentFixture<ListarRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
