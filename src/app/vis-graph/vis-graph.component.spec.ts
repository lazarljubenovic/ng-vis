/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {VisGraphComponent} from "./vis-graph.component";
import {VisGraphService} from "./vis-graph.service";

describe('VisGraphComponent', () => {
    let component: VisGraphComponent;
    let fixture: ComponentFixture<VisGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VisGraphComponent],
            providers: [VisGraphService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VisGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
