import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoNumeros } from './juego-numeros';

describe('JuegoNumeros', () => {
  let component: JuegoNumeros;
  let fixture: ComponentFixture<JuegoNumeros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoNumeros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoNumeros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
