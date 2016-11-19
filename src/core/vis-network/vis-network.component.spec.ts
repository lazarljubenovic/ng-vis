/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {VisNetworkComponent} from "./vis-network.component";
import {VisNetworkService} from "./vis-network.service";

describe('VisNetworkComponent', () => {
    let component: VisNetworkComponent;
    let fixture: ComponentFixture<VisNetworkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VisNetworkComponent],
            providers: [VisNetworkService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VisNetworkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
