import {
    Component,
    ContentChildren,
    QueryList,
    ElementRef,
    ViewChild,
    OnDestroy,
    Input,
    Output,
    EventEmitter
} from "@angular/core";
import {VisNetworkNodeDirective} from "./node/vis-network-node.directive";
import {VisNetworkEdgeDirective} from "./edge/vis-network-edge.directive";
import {VisNetworkService} from "./vis-network.service";
import {VisNgNetworkNode} from "./interfaces/vis-ng-network-node.interface";
import {VisNgNetworkEdge} from "./interfaces/vis-ng-network-edge.interface";
import {Subject, Observable, Subscription} from "rxjs";
import {VisNgNetworkOptions} from "./interfaces/vis-ng-network-options.interface";
import {VisNgNetworkEventArgument} from "./interfaces/vis-ng-network.interface";

@Component({
    selector: 'vis-network',
    template: `
<div class="graph" #graph></div>
<pre *ngIf="debug" class="json">{{nodes | json}}
{{edges | json}}</pre>
<ng-content></ng-content>
`,
    styles: [`
:host {
  display: block;
  width: 100%;
  height: 100%;
}

.graph {
  width: 100%;
  height: 100%;
}`]
})
export class VisNetworkComponent implements OnDestroy {

    public debug: boolean = false;

    public nodes$: Subject<QueryList<VisNetworkNodeDirective>> = new Subject<QueryList<VisNetworkNodeDirective>>();
    public edges$: Subject<QueryList<VisNetworkEdgeDirective>> = new Subject<QueryList<VisNetworkEdgeDirective>>();
    public options$: Subject<VisNgNetworkOptions> = new Subject<VisNgNetworkOptions>();

    @ContentChildren(VisNetworkNodeDirective)
    public set nodes(nodes: QueryList<VisNetworkNodeDirective>) {
        this.nodes$.next(nodes);
    }

    @ContentChildren(VisNetworkEdgeDirective)
    public set edges(edges: QueryList<VisNetworkEdgeDirective>) {
        this.edges$.next(edges);
    }

    @Input()
    public set options(options: VisNgNetworkOptions) {
        this.options$.next(options);
    }

    @Output()
    public graphClick: EventEmitter<VisNgNetworkEventArgument>
        = new EventEmitter<VisNgNetworkEventArgument>();

    private onClick(arg: VisNgNetworkEventArgument): void {
        this.graphClick.emit(arg);
    }

    @Output()
    public graphRightClick: EventEmitter<VisNgNetworkEventArgument> =
        new EventEmitter<VisNgNetworkEventArgument>();

    private onRightClick(arg: VisNgNetworkEventArgument): void {
        this.graphRightClick.emit(arg);
    }

    @ViewChild('graph')
    public graphElement: ElementRef;

    public changes$: Observable<{nodes: VisNgNetworkNode[], edges: VisNgNetworkEdge[], options: VisNgNetworkOptions}> =
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
                const nodes: VisNgNetworkNode[] = values.nodes.map(node => node.toObject());
                const edges: VisNgNetworkEdge[] = values.edges.map(edge => edge.toObject());
                const options: VisNgNetworkOptions = values.options;
                return {nodes, edges, options};
            });

    private subscriptions_: Subscription[] = [];

    constructor(private service: VisNetworkService) {
        let sub = this.changes$.take(1).subscribe(values => {
            this.service.initializeGraph(this.graphElement, values.nodes, values.edges, values.options);
        });
        this.subscriptions_.push(sub);

        sub = this.changes$.skip(1).subscribe(values => {
            this.service.onChange({
                nodes: values.nodes,
                edges: values.edges,
                options: values.options
            });
        });
        this.subscriptions_.push(sub);
    }

    ngOnInit() {
        // We must wait a tick for network to be created in the service.
        setTimeout(() => {
            this.service.attachEvent('click', arg => this.onClick(arg));
            this.service.attachEvent('oncontext', arg => this.onRightClick(arg));
        });
    }

    ngOnDestroy() {
        this.subscriptions_.forEach(s => s.unsubscribe());
        this.service.destroy();
    }

}
