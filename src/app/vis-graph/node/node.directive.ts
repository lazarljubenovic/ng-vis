import {OnInit, Input, Directive, Output, EventEmitter} from "@angular/core";
import {VglNode} from "../node.interface";
import {VisGraphService, VisNgNetworkEventArgument} from "../vis-graph.service";
import {VisNgOptionsNodes} from "../options.interface";

@Directive({selector: 'vgl-node'})
export class NodeDirective implements OnInit {

    @Input()
    public id: string;

    @Input()
    public label: string;

    private _options: VisNgOptionsNodes;

    @Input()
    public set options(options: VisNgOptionsNodes) {
        this._options = options;
        setTimeout(() => this.service.updateNode(this.toObject()));
    }

    public get options(): VisNgOptionsNodes {
        return this._options;
    }

    @Output()
    public select: EventEmitter<VisNgNetworkEventArgument> = new EventEmitter<VisNgNetworkEventArgument>();

    private onSelectNode(arg: VisNgNetworkEventArgument): void {
        if (arg.nodes.indexOf(this.id) != -1) {
            this.select.emit(arg);
        }
    }

    public toObject(): VglNode {
        return Object.assign({
            id: this.id,
            label: this.label,
        }, this.options);
    }

    constructor(private service: VisGraphService) {
    }

    ngOnInit() {
        // We must wait a tick for network to be created in the service.
        setTimeout(() => {
            this.service.attachEvent('selectNode', arg => this.onSelectNode(arg));
        });
    }

}
