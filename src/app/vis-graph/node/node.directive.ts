import {OnInit, Input, Directive} from "@angular/core";
import {VglNode} from "../node.interface";

@Directive({
    selector: 'vgl-node',
})
export class NodeDirective implements OnInit {

    @Input()
    public id: string;

    @Input()
    public label: string;

    public toObject(): VglNode {
        return {
            id: this.id,
            label: this.label
        };
    }

    constructor() {
    }

    ngOnInit() {
    }

}
