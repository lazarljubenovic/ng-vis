/* tslint:disable:no-unused-variable */
import {NodeDirective} from "./node.directive";
import {VisGraphService} from "../vis-graph.service";

describe('Directive: NodeDirective', () => {

    it('should create', () => {
        let directive = new NodeDirective(new VisGraphService());
        expect(directive).toBeTruthy();
    });
});
