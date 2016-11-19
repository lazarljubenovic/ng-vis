import {OnInit, Input, Directive} from "@angular/core";
import {VisNgNetworkEdge} from "../interfaces/vis-ng-network-edge.interface";
import {VisNetworkService} from "../vis-network.service";
import {VisNgNetworkOptionsEdges} from "../interfaces/vis-ng-network-options.interface";

@Directive({selector: 'vis-network-edge'})
export class VisNetworkEdgeDirective implements OnInit {

    @Input()
    public id: string;

    @Input()
    public from: string;

    @Input()
    public to: string;

    @Input()
    public name: string;

    @Input()
    public label: string;

    private _options: VisNgNetworkOptionsEdges;

    @Input()
    public set options(options: VisNgNetworkOptionsEdges) {
        this._options = options;
        setTimeout(() => this.service.updateEdge(this.toObject()));
    }

    public get options(): VisNgNetworkOptionsEdges {
        return this._options;
    }

    public toObject(): VisNgNetworkEdge {
        return Object.assign({
            id: this.id,
            from: this.from,
            to: this.to,
            name: this.name,
            label: this.label,
        }, this.options);
    }

    constructor(private service: VisNetworkService) {
    }

    ngOnInit() {
    }

}
