import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {VisNetworkComponent} from "./vis-network.component";
import {VisNetworkNodeDirective} from "./node/vis-network-node.directive";
import {VisNetworkEdgeDirective} from "./edge/vis-network-edge.directive";
import {VisNetworkService} from "./vis-network.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        VisNetworkService,
    ],
    declarations: [
        VisNetworkComponent,
        VisNetworkNodeDirective,
        VisNetworkEdgeDirective,
    ],
    exports: [
        VisNetworkComponent,
        VisNetworkNodeDirective,
        VisNetworkEdgeDirective,
    ],
})
export class VisNetworkModule {
}
