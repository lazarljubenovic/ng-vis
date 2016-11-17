import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {VisGraphComponent} from "./vis-graph.component";
import {NodeDirective} from "./node/node.directive";
import {EdgeDirective} from "./edge/edge.directive";
import {VisGraphService} from "./vis-graph.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        VisGraphService,
    ],
    declarations: [
        VisGraphComponent,
        NodeDirective,
        EdgeDirective,
    ],
    exports: [
        VisGraphComponent,
        NodeDirective,
        EdgeDirective,
    ],
})
export class VisGraphModule {
}
