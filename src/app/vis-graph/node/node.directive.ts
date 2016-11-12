import {OnInit, Input, Directive, Output, EventEmitter} from "@angular/core";
import {VglNode} from "../node.interface";
import {VisGraphService, VisNgNetworkEventArgument} from "../vis-graph.service";

@Directive({selector: 'vgl-node'})
export class NodeDirective implements OnInit {

    @Input()
    public id: string;

    @Input()
    public label: string;

    @Output()
    public select: EventEmitter<VisNgNetworkEventArgument> = new EventEmitter<VisNgNetworkEventArgument>();

    private onSelectNode(arg: VisNgNetworkEventArgument): void {
        if (arg.nodes.indexOf(this.id) != -1) {
            this.select.emit(arg);
        }
    }

    public toObject(): VglNode {
        return {
            id: this.id,
            label: this.label
        };
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
