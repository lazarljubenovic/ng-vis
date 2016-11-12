import {
    Component,
    OnInit,
    ContentChildren,
    QueryList,
    ElementRef,
    ViewChild,
    OnDestroy, Input, AfterContentInit, AfterViewInit
} from "@angular/core";
import {NodeDirective} from "./node/node.directive";
import {EdgeDirective} from "./edge/edge.directive";
import {VisGraphService} from "./vis-graph.service";
import {VglNode} from "./node.interface";
import {VglEdge} from "./edge.interface";
import {Subject, Observable, Subscription} from "rxjs";
import {VisNgOptions} from "./options.interface";

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
export class VisGraphComponent implements OnDestroy {

    public debug: boolean = false;

    public nodes$: Subject<QueryList<NodeDirective>> = new Subject<QueryList<NodeDirective>>();
    public edges$: Subject<QueryList<EdgeDirective>> = new Subject<QueryList<EdgeDirective>>();
    public options$: Subject<VisNgOptions> = new Subject<VisNgOptions>();

    @ContentChildren(NodeDirective)
    public set nodes(nodes: QueryList<NodeDirective>) {
        console.log('content children');
        this.nodes$.next(nodes);
    }

    @ContentChildren(EdgeDirective)
    public set edges(edges: QueryList<EdgeDirective>) {
        this.edges$.next(edges);
    }

    @Input()
    public set options(options: VisNgOptions) {
        this.options$.next(options);
    }

    @ViewChild('graph')
    public graphElement: ElementRef;

    public changes$: Observable<{nodes: VglNode[], edges: VglEdge[], options: VisNgOptions}> =
        Observable.combineLatest(this.nodes$, this.edges$, this.options$)
            .map(values => {
                return {
                    nodes: values[0],
                    edges: values[1],
                    options: values[2],
                }
            })
            .filter(values => values.options !== null)
            .map(values => {
                const nodes: VglNode[] = values.nodes.map(node => node.toObject());
                const edges: VglEdge[] = values.edges.map(edge => edge.toObject());
                const options: VisNgOptions = values.options;
                return {nodes, edges, options};
            });

    private subscriptions_: Subscription[] = [];

    constructor(private visGraphService: VisGraphService) {
        let sub = this.changes$.take(1).subscribe(values => {
            this.visGraphService.initializeGraph(this.graphElement, values.nodes, values.edges, values.options);
        });
        this.subscriptions_.push(sub);

        sub = this.changes$.skip(1).subscribe(values => {
            this.visGraphService.onChange({nodes: values.nodes, edges: values.edges, options: values.options});
        });
        this.subscriptions_.push(sub);
    }

    ngOnDestroy() {
        this.subscriptions_.forEach(s => s.unsubscribe());
        this.visGraphService.destroy();
    }

}
