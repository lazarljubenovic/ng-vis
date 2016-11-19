/* tslint:disable:no-unused-variable */
import {VisNetworkNodeDirective} from "./vis-network-node.directive";
import {VisNetworkService} from "../vis-network.service";

describe('Directive: NodeDirective', () => {

    it('should create', () => {
        let directive = new VisNetworkNodeDirective(new VisNetworkService());
        expect(directive).toBeTruthy();
    });
});
