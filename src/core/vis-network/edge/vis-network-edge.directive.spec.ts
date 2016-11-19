/* tslint:disable:no-unused-variable */
import {VisNetworkService} from "../vis-network.service";
import {VisNetworkEdgeDirective} from "./vis-network-edge.directive";

describe('Directive: EdgeDirective', () => {
    it('should create an instance', () => {
        let directive = new VisNetworkEdgeDirective(new VisNetworkService());
        expect(directive).toBeTruthy();
    });
});
