import {OnInit, Input, Directive, Output, EventEmitter} from "@angular/core";
import {VisNgNetworkNode} from "../interfaces/vis-ng-network-node.interface";
import {VisNetworkService} from "../vis-network.service";
import {VisNgNetworkOptionsNodes} from "../interfaces/vis-ng-network-options.interface";
import {VisNgNetworkEventArgument} from "../interfaces/vis-ng-network.interface";

@Directive({selector: 'vis-network-node'})
export class VisNetworkNodeDirective implements OnInit {

    @Input()
    public id: string;

    @Input()
    public label: string;

    private _options: VisNgNetworkOptionsNodes;

    @Input()
    public set options(options: VisNgNetworkOptionsNodes) {
        this._options = options;
        setTimeout(() => this.service.updateNode(this.toObject()));
    }

    public get options(): VisNgNetworkOptionsNodes {
        return this._options;
    }

    @Output()
    public select: EventEmitter<VisNgNetworkEventArgument> = new EventEmitter<VisNgNetworkEventArgument>();

    private onSelectNode(arg: VisNgNetworkEventArgument): void {
        if (arg.nodes.indexOf(this.id) != -1) {
            this.select.emit(arg);
        }
    }

    public toObject(): VisNgNetworkNode {
        return Object.assign({
            id: this.id,
            label: this.label,
        }, this.options);
    }

    constructor(private service: VisNetworkService) {
    }

    ngOnInit() {
        // We must wait a tick for network to be created in the service.
        setTimeout(() => {
            this.service.attachEvent('selectNode', arg => this.onSelectNode(arg));
        });
    }

}
