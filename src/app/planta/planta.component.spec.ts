import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { fa, faker } from '@faker-js/faker';
import { DebugElement } from '@angular/core';
import { PlantaComponent } from './planta.component';
import { Planta } from './planta';
import { PlantaService } from './planta.service';

describe('PlantaComponent', () => {
    let component: PlantaComponent;
    let fixture: ComponentFixture<PlantaComponent>;
    let debug: DebugElement;


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        declarations: [PlantaComponent],
        imports: [HttpClientTestingModule],
        providers: [PlantaService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlantaComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement;
        let plantas = []
        let tipos = ['Interior', 'Exterior']
        for (let j = 0; j < 3; j++) {
            plantas.push(
                new Planta(
                    j,
                    faker.person.firstName(),
                    faker.person.fullName(),
                    tipos[Math.random()  < 0.5 ? 0 : 1],
                    faker.number.float(),
                    faker.word.adjective(),
                    faker.word.adjective()
                )
            )
        }
        component.plantas = plantas
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display genre title', () => {

        const h1Element: DebugElement = debug.query(By.css('h1'));
        const h1Text = h1Element.nativeElement.textContent.trim();
        expect(h1Text);
        
    });

    it('should display plant data in table rows', () => {
        const compiled = fixture.nativeElement;
        const tableRows = compiled.querySelectorAll('tr');

        expect(tableRows.length).toBe(4) //verify all rows and the header
    
        component.plantas.forEach((planta, index) => {
          const row = tableRows[index + 1];
          const cells = row.querySelectorAll('td');
    
          // Expect data
          expect(cells[0].textContent).toBe(planta.id.toString());
          expect(cells[1].textContent).toBe(planta.nombreComun);
          expect(cells[2].textContent).toBe(planta.tipo);
          expect(cells[3].textContent).toBe(planta.clima);
        });
      });
});
