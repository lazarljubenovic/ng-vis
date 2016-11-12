import {OnInit, Input, Directive} from "@angular/core";
import {VglEdge} from "../edge.interface";
import {VisGraphService} from "../vis-graph.service";

@Directive({
    selector: 'vgl-edge',
})
export class EdgeDirective implements OnInit {

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

    public toObject(): VglEdge {
        return {
            id: this.id,
            from: this.from,
            to: this.to,
            name: this.name,
            label: this.label,
        };
    }

    constructor(private service: VisGraphService) {
    }

    ngOnInit() {
    }

}
