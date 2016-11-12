import {Component, ViewChild} from "@angular/core";
import {VglEdge} from "./vis-graph/edge.interface";
import {VglNode} from "./vis-graph/node.interface";
import {VisNgOptions} from "./vis-graph/options.interface";

@Component({
    selector: 'app-root',
    template: `<vgl-vis-graph [options]="options">
  <vgl-node *ngFor="let node of nodes"
            [id]="node.id"
            [label]="node.label"
  ></vgl-node>
  <vgl-edge *ngFor="let edge of edges"
            [id]="edge.id"
            [from]="edge.from"
            [to]="edge.to"
            [name]="edge.name"
            [label]="edge.label"
  ></vgl-edge>
</vgl-vis-graph>

<div>
  <button (click)="changeStyle()">Change style</button>
  <button (click)="addConnectedNodes()">Add connected nodes</button>
  <button (click)="delete()">Delete one node</button>
</div>
`,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public nodes: VglNode[] = Array(4).fill(0).map((_, i) => i).map(el => ({
        id: `${el}`,
        label: `${String.fromCharCode(el + 'A'.charCodeAt(0))}`,
    }));

    public edges: VglEdge[] = Array(2).fill(0).map((_, i) => i * 2).map(el => ({
        id: `${el}-${el + 1}`,
        from: `${el}`,
        to: `${el + 1}`,
        label: `${el} -> ${el + 1}`,
        name: `${el}-${el + 1}`,
    }));

    public options: VisNgOptions = {
        nodes: {
            color: {
                border: '#d7d7d7',
                background: '#f3f3f3',
                highlight: {
                    border: '#e3e3e3',
                    background: '#ffffff',
                },
            },
            shape: 'circle',
        },
    };

    public changeStyle() {
        const randomColor = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
        this.options = {
            nodes: {
                color: {
                    background: randomColor,
                },
            },
        };
    }

    public delete() {
        this.nodes.splice(-1);
    }

    public addConnectedNodes() {
        this.nodes = this.nodes.concat([
            {
                id: this.nodes.length,
                label: `${String.fromCharCode(this.nodes.length + 'A'.charCodeAt(0))}`
            },
            {
                id: this.nodes.length + 1,
                label: `${String.fromCharCode(this.nodes.length + 'A'.charCodeAt(0))}`
            },
        ]);
        this.edges = this.edges.concat([{
            from: this.nodes.length - 2,
            to: this.nodes.length - 1,
            label: 'woohoo',
            name: 'woohoo',
            id: `${this.nodes.length - 2}-${this.nodes.length - 1}`
        }]);
    }

    constructor() {
    }

}
