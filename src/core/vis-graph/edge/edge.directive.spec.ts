/* tslint:disable:no-unused-variable */
import {VisGraphService} from "../vis-graph.service";
import {EdgeDirective} from "./edge.directive";

describe('Directive: EdgeDirective', () => {
    it('should create an instance', () => {
        let directive = new EdgeDirective(new VisGraphService());
        expect(directive).toBeTruthy();
    });
});
