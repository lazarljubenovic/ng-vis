import {
    Component,
    OnInit,
    ContentChildren,
    QueryList,
    ElementRef,
    ViewChild,
    OnDestroy
} from "@angular/core";
import {NodeDirective} from "./node/node.directive";
import {EdgeDirective} from "./edge/edge.directive";
import {VisGraphService} from "./vis-graph.service";
import {VglNode} from "./node.interface";
import {VglEdge} from "./edge.interface";
import {Subject, Observable, Subscription} from "rxjs";

@Component({
    selector: 'vgl-vis-graph',
    template: `
<div class="graph" #graph></div>
<pre *ngIf="debug" class="json">{{nodes | json}}
{{edges | json}}</pre>
<ng-content></ng-content>
`,
    styleUrls: ['./vis-graph.component.scss']
})
export class VisGraphComponent implements OnInit, OnDestroy {

    public debug: boolean = false;

    public nodes$: Subject<QueryList<NodeDirective>> = new Subject<QueryList<NodeDirective>>();
    public edges$: Subject<QueryList<EdgeDirective>> = new Subject<QueryList<EdgeDirective>>();

    @ContentChildren(NodeDirective)
    public set nodes(nodes: QueryList<NodeDirective>) {
        this.nodes$.next(nodes);
    }

    @ContentChildren(EdgeDirective)
    public set edges(edges: QueryList<EdgeDirective>) {
        this.edges$.next(edges);
    }

    @ViewChild('graph')
    public graphElement: ElementRef;

    public changes$: Observable<{nodes: VglNode[], edges: VglEdge[]}> =
        Observable.combineLatest(this.nodes$, this.edges$)
            .map(values => ({
                nodes: values[0],
                edges: values[1],
            }))
            .map(values => {
                const nodes: VglNode[] = values.nodes.map(node => node.toObject());
                const edges: VglEdge[] = values.edges.map(edge => edge.toObject());
                return {nodes, edges};
            });

    private subscriptions_: Subscription[] = [];

    constructor(private visGraphService: VisGraphService) {
    }

    ngOnInit() {
        let sub = this.changes$.take(1).subscribe(values => {
            this.visGraphService.initializeGraph(this.graphElement, values.nodes, values.edges);
        });
        this.subscriptions_.push(sub);

        sub = this.changes$.skip(1).subscribe(values => {
            this.visGraphService.onChange({nodes: values.nodes, edges: values.edges});
        });
        this.subscriptions_.push(sub);
    }

    ngOnDestroy() {
        this.subscriptions_.forEach(s => s.unsubscribe());
    }

}
