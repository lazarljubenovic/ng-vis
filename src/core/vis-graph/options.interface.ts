export interface VisNgOptions {
    /**
     * If true, the Network will automatically detect when its container is resized,
     * and redraw itself accordingly. If false, the Network can be forced to repaint
     * after its container has been resized using the function redraw() and setSize().
     */
    autoResize?: boolean;

    /**
     * The height of the canvas. Can be in percentages or pixels (ie. `'400px'`).
     */
    height?: string;

    /**
     * The width of the canvas. Can be in percentages or pixels (ie. '400px').
     */
    width?: string;

    /**
     * Select the locale. By default, the language is English.
     */
    locale?: string;

    /**
     * Locales object. By default 'en', 'de', 'es', 'it', 'nl' 'pt-br', 'ru' are
     * supported. Take a look at the [[VisNgOptionsLocale]] for more explanation
     * on how to customize this.
     */
    locales?: {[key: string]: VisNgOptionsLocale};

    /**
     * When a Network is configured to be clickToUse, it will react to mouse and
     * touch events only when active. When active, a blue shadow border is
     * displayed around the Network. The network is set active by clicking on it,
     * and is changed to inactive again by clicking outside the Network or by
     * pressing the ESC key.
     */
    clickToUse?: boolean;

    /**
     * Generates an interactive option editor with filtering.
     */
    configure?: VisNgOptionsConfigure;

    /**
     * Handles the creation and deletion of edges and contains the global edge
     * options and styles.
     */
    edges?: VisNgOptionsEdges;

    /**
     * Handles the creation and deletion of nodes and contains the global node
     * options and styles.
     */
    nodes?: VisNgOptionsNodes;

    /**
     * Contains the groups and some options on how to handle nodes with
     * non-existing groups.
     */
    groups?: VisNgOptionsGroups;

    /**
     * Governs the initial and hierarchical positioning.
     */
    layout?: VisNgOptionsLayout;

    /**
     * Used for all user interaction with the network. Handles mouse and touch
     * events and selection as well as the navigation buttons and the popups.
     */
    interaction?: VisNgOptionsInteraction;

    /**
     * Supplies an API and optional GUI to alter the data in the network.
     */
    manipulation?: VisNgOptionsManipulation;

    /**
     * Does all the simulation moving the nodes and edges to their final positions,
     * also governs stabilization.
     */
    physics?: VisNgOptionsPhysics;
}

export interface VisNgOptionsLocale {
    edit?: string;
    del?: string;
    back?: string;
    addNode?: string;
    addEdge?: string;
    editNode?: string;
    editEdge?: string;
    addDescription?: string;
    edgeDescription?: string;
    editEdgeDescription?: string;
    createEdgeError?: string;
    deleteClusterError?: string;
    editClusterError?: string;
}

/**
 * The options for the canvas have to be contained in an object titled 'configure'.
 *
 * @example
 * // these are all options in full.
 * var options = {
 *   configure: {
 *     enabled: true,
 *     filter: 'nodes,edges',
 *     container: undefined,
 *     showButton: true
 *   }
 * }
 * network.setOptions(options);
 */
export interface VisNgOptionsConfigure {
    /**
     * Toggle the configuration interface on or off. This is an optional parameter.
     * If left undefined and any of the other properties of this object are defined,
     * this will be set to true.
     */
    enabled?: boolean;

    /**
     * When a boolean, true gives you all options, false will not show any.
     * If a string is supplied, any combination of the following is allowed:
     * nodes, edges, layout, interaction, manipulation, physics, selection,
     * renderer. Feel free to come up with a fun seperating character. Finally,
     * when supplied an array of strings, any of the previously mentioned
     * fields are accepted.
     *
     * When supplying a function, you receive two arguments. The option and
     *the path of the option within the options object. If it returns true,
     * the options will be shown in the configurator.
     */
    filter?: string | string[] | boolean | ((option: any, path: string) => boolean);

    /**
     * This allows you to put the configure list in another HTML container
     * than below the network.
     */
    container?: HTMLElement;

    /**
     * Show the generate options button at the bottom of the configurator.
     */
    showButton?: boolean;
}

export interface VisNgOptionsEdges {
    /**
     * To draw an arrow with default settings, a string can be supplied. For example:
     * `arrows: 'to, from, middle'` or `'to; from'`, any combination with any
     * separating symbol is fine. If you want to control the size of the arrowheads,
     * you can supply an object.
     */
    arrows?: string | {
        /**
         * When true, an arrowhead on the 'to' side of the edge is drawn, pointing
         * to the 'to' node with default settings. To customize the size of the arrow,
         * supply an object.
         *
         * @default Object
         */
        to?: boolean | {
            /**
             * Toggle the arrow on or off. This option is optional, if undefined and
             * the scaleFactor property is set, enabled will be set to true.
             *
             * @default false
             */
            enables?: boolean;
            /**
             * The scale factor allows you to change the size of the arrowhead.
             *
             * @default 1
             */
            scaleFactor?: number;
            /**
             * The type of endpoint. Default is `arrow`. Also possible is `circle`.
             *
             * @default 'arrow'
             */
                type?: string;
        };
        /**
         * When true, an arrowhead on the 'middle' side of the edge is drawn, pointing
         * to the 'to' node with default settings. To customize the size of the arrow,
         * supply an object.
         *
         * @default Object
         */
        middle?: boolean | {
            /**
             * Toggle the arrow on or off. This option is optional, if undefined and
             * the scaleFactor property is set, enabled will be set to true.
             *
             * @default false
             */
            enables?: boolean;
            /**
             * The scale factor allows you to change the size of the arrowhead.
             *
             * @default 1
             */
            scaleFactor?: number;
            /**
             * The type of endpoint. Default is `arrow`. Also possible is `circle`.
             *
             * @default 'arrow'
             */
                type?: string;
        };
        /**
         * When true, an arrowhead on the 'from' side of the edge is drawn, pointing
         * to the 'from' node with default settings. To customize the size of the arrow,
         * supply an object.
         *
         * @default Object
         */
            from?: boolean | {
            /**
             * Toggle the arrow on or off. This option is optional, if undefined and
             * the scaleFactor property is set, enabled will be set to true.
             *
             * @default false
             */
            enables?: boolean;
            /**
             * The scale factor allows you to change the size of the arrowhead.
             *
             * @default 1
             */
            scaleFactor?: number;
            /**
             * The type of endpoint. Default is `arrow`. Also possible is `circle`.
             *
             * @default 'arrow'
             */
                type?: string;
        };
    };
    /**
     * When false, the edge stops at the arrow. This can be useful if you have thick
     * lines and you want the arrow to end in a point. Middle arrows are not
     * affected by this.
     *
     * @default true
     */
    arrowStrikeThrough?: boolean;
    /**
     * The color object contains the color info0rmation of the edge in every situation.
     * When the edge only needs a single color, a color value like `'rgb(120, 32, 14)'`,
     * `'#ffffff'` or `'red'` can be supplied instead of an object.
     *
     * @default Object
     */
    color?: string | {
        /**
         * The color of the border of the node when it is not selected or hovered over
         * (assuming hover is enabled in the interaction module).
         *
         * @default '#848484'
         */
        color?: string;
        /**
         * The color the edge when it is selected.
         *
         * @default '#848484'
         */
        highlight?: string;
        /**
         * The color the edge when the mouse hovers over it (assuming hover is enabled
         * in the interaction module).
         *
         * @default '#848484'
         */
        hover?: string;
        /**
         * When color, highlight or hover are defined, inherit is set to false!
         *
         * Supported options are: true, false, 'from','to','both'.
         * The default value is 'from' which does the same as true: the edge will
         * inherit the color from the border of the node on the 'from' side.
         *
         * When set to 'to', the border color from the 'to' node will be used.
         * When set to 'both', the color will fade from the from color to the to color.
         * 'both' is computationally intensive because the gradient is recomputed every
         * redraw. This is required because the angles change when the nodes move.
         *
         * @default 'from'
         */
        inherit?: 'from' | 'to' | 'both' | boolean;
        /**
         * It can be useful to set the opacity of an edge without manually changing
         * all the colors. The opacity option will convert all colors (also when
         * using inherit) to adhere to the supplied opacity. The allowed range of
         * the opacity option is between 0 and 1. This is only done once so the
         * performance impact is not too big.
         *
         * @default 1.0
         */
        opacity?: number;
    };
    /**
     * When true, the edge will be drawn as a dashed line. You can customize the dashes by
     * supplying an Array. Array formart: Array of numbers, gap length, dash length,
     * gap length, dash length, ... etc. The array is repeated until the distance is filled.
     * When using dashed lines in IE versions older than 11, the line will be drawn
     * straight, not smooth.
     *
     * @default false
     */
    dashes?: number[] | boolean;
    /**
     * This object defines the details of the label. A shorthand is also supported in the form
     * `'size face color'`; for example, `'14px arial red'`.
     *
     * @default Object (?)
     */
    font?: string | {
        /**
         * Color of the label text.
         *
         * @default #343434
         */
        color?: string;
        /**
         * Size of the label text.
         *
         * @default 14
         */
        size?: number;
        /**
         * Font face (or font family) of the label text.
         */
        face?: string;
        /**
         * When not `undefined `but a color string, a background rectangle will be drawn
         * behind the label in the supplied color.
         *
         * @default undefined
         */
        background?: string;
        /**
         * As an alternative to the background rectangle, a stroke can be drawn around
         * the text. When a value higher than 0 is supplied, the stroke will be drawn.
         *
         * @default 2
         */
        strokeWidth?: number;
        /**
         * This is the color of the stroke assuming the value for stroke is higher than 0.
         *
         * @default '#ffffff'
         */
        strokeColor?: string;
        /**
         * Possible options: 'horizontal','top','middle','bottom'. The alignment determines
         * how the label is aligned over the edge. The default value horizontal aligns
         * the label horizontally, regardless of the orientation of the edge. When an
         * option other than horizontal is chosen, the label will align itself according
         * to the edge.
         *
         * @default 'horizontal'
         */
        align?: 'horizontal' | 'top' | 'middle' | 'bottom';
    };
    /**
     * Edges between the nodes, on to and one from. This is where you
     * define the 'from' node. You have to supply the corresponding node ID.
     * This naturally only applies to individual edges.
     */
    // from: number | string;
    /**
     * When true, the edge is not drawn. It is part still part of the physics simulation however!
     *
     * @default false
     */
    hidden?: boolean;
    /**
     * Assuming the hover behaviour is enabled in the interaction module, the hoverWidth
     * determines the width of the edge when the user hovers over it with the mouse.
     * If a number is supplied, this number will be added to the width. Because the
     * width can be altered by the value and the scaling functions, a constant multiplier
     * or added value may not give the best results. To solve this, you can supply a
     * function.
     *
     * @example
     * var options: {
     *   edges: {
     *     hoverWidth: function (width) {return width+1;}
     *   }
     * }
     *
     * It receives the Number width of the edge. In this simple example we add 1 to the width.
     * You can taylor the logic in the function as long as it returns a Number.
     *
     * @default 0.5
     */
    hoverWidth?: number | ((width: number) => number);
    /**
     * The id of the edge. The id is optional for edges. When not supplied, an UUID will be
     * assigned to the edge. This naturally only applies to individual edges.
     *
     * @default undefined
     */
    // id: string;
    /**
     * The label of the edge. HTML does not work in here because the network uses HTML5 Canvas.
     *
     * @default undefined
     */
        // label: string;
    labelHighlightBold?: boolean;
    length?: number;
    physics?: boolean;
    scaling?: {
        min?: number;
        max?: number;
        label?: boolean | {
            enabled?: boolean;
            min?: number;
            max?: number;
            maxVisible?: number;
            drawThreshold?: number;
        };
        customScalingFunction?: (min: number, max: number, total: number, value: number) => number;
    };
    selectionWidth?: number | ((width: number) => number);
    selfReferenceSize?: number;
    shadow?: boolean | {
        enabled?: boolean;
        color?: string;
        size?: number;
        x?: number;
        y?: number;
    };
    smooth?: {
        enabled?: boolean;
        type?: 'dynamic' | 'continuous' | 'discrete' | 'diagonalCross' | 'straightCross' |
            'horizontal' | 'vertical' | 'curvedCW' | 'curvedCCW' | 'cubicBezier';
        forceDirection?: 'horiznotal' | 'vertical' | 'none' | boolean;
        roundness?: number;
    };
    title?: string;
    // to: string | number;
    value?: number;
    width?: number;
}

export interface VisNgOptionsNodes {
    borderWidth?: number;
    borderWidthSelected?: number;
    brokenImage?: string;
    color?: string | {
        border?: string;
        background?: string;
        highlight?: {
            border?: string;
            background?: string;
        };
        hover?: {
            border?: string;
            background?: string;
        };
    };
    fixed?: boolean | {
        x?: boolean;
        y?: boolean;
    };
    font?: string | {
        color?: string;
        size?: number;
        face?: string;
        background?: string;
        strokeWidth?: number;
        strokeColor?: string;
        align?: string;
    };
    group?: string;
    hidden?: boolean;
    icon?: {
        face?: string;
        code?: string,
        size?: number;
        color?: string;
    };
    image?: string;
    label?: string;
    labelHighlightBold?: boolean,
    level?: number;
    mass?: number;
    physics?: boolean;
    scaling?: {
        min?: number;
        max?: number;
        label?: {
            enabled?: boolean;
            min?: number;
            max?: number;
            maxVisible?: number;
            drawThreshold?: number;
        };
        customScalingFunction?: (min: number, max: number, total: number, value, number) => number;
    };
    shadow?: boolean | {
        enabled?: boolean;
        color?: string;
        size?: number;
        x?: number;
        y?: number;
    };
    shape?: string;
    shapeProperties?: {
        borderDashes?: boolean;
        borderRadius?: number;
        interpolation?: boolean;
        useImageSize?: boolean;
        useBorderWithImage?: boolean;
    };
    size?: number;
    title?: number | HTMLElement;
    value?: number;
    x?: number;
    y?: number;
}

export interface VisNgOptionsGroups {
    useDefaultGroups?: boolean;
    [groupId: string]: VisNgOptionsNodes;
}

export interface VisNgOptionsLayout {
    randomSeed?: number;
    improvedLayout?: boolean;
    hierarchical?: boolean | {
        enabled?: boolean;
        levelSeparation?: number;
        nodeSpacing?: number;
        treeSpacing?: number;
        blockShifting?: number;
        edgeMinimization?: number;
        parentCentralization?: number;
        direction?: 'UD' | 'DU' | 'LR' | 'RL';
        sortMethod?: 'hubsize' | 'directed';
    }
}

export interface VisNgOptionsInteraction {
    dragNodes?: boolean;
    dragView?: boolean;
    hideEdgesOnDrag?: boolean;
    hideNodesOnDrag?: boolean;
    hover?: boolean;
    hoverConnectedEdges?: boolean;
    keyboard?: {
        enabled?: boolean;
        speed?: {
            x?: number;
            y?: number;
            zoom?: number;
        };
        bindToWindow?: boolean;
    };
    multiselect?: boolean;
    navigationButtons?: boolean;
    selectable?: boolean;
    selectConnectedEdges?: boolean;
    tooltipDelay?: number;
    zoomView?: boolean;
}

export interface VisNgOptionsManipulation {
    enabled?: boolean;
    initiallyActive?: boolean;
    addNode?: boolean | ((nodeData: any, callback: (nodeData: any) => any) => void);
    addEdge?: boolean | ((edgeData: any, callback: (edgeData: any) => any) => void);
    editNode?: undefined | ((nodeData: any, callback: (nodeData: any) => any) => void);
    editEdge?: boolean | ((edgeData: any, callback: (edgeData: any) => any) => void);
    deleteNode?: boolean | ((nodeData: any, callback: (nodeData: any) => any) => void);
    deleteEdge?: boolean | ((edgeData: any, callback: (edgeData: any) => any) => void);
    /**
     * All node options are valid except id, x, y and fixed
     */
    controlNodeStyle?: VisNgOptionsNodes;
}

export interface VisNgOptionsPhysics {
    enables?: boolean;
    barnesHut?: {
        gravitationalConstant?: number;
        centralGravity?: number;
        springLength?: number;
        springConstant?: number;
        damping?: number;
        avoidOverlap?: number;
    };
    forceAtlas2Based?: {
        gravitationalConstant?: number;
        centralGravity?: number;
        springConstant?: number;
        springLength?: number;
        damping?: number;
        avoidOverlap?: number;
    };
    repulsion?: {
        centralGravity?: number;
        springLength?: number;
        springConstant?: number;
        nodeDistance?: number;
        damping?: number;
    };
    hierarchicalRepulsion?: {
        centralGravity?: number;
        springLength?: number;
        springConstant?: number;
        nodeDistance?: number;
        damping?: number;
    };
    maxVelocity?: number;
    minVelocity?: number;
    solver?: 'barnesHut' | 'repulsion' | 'hierarchicalRepulsion' | 'forceAtlas2Based';
    stabilization?: boolean | {
        enabled?: boolean;
        iterations?: number;
        updateInterval?: number;
        onlyDynamicEdges?: boolean;
        fit?: boolean;
    };
    timestep?: number;
    adaptiveTimestep?: boolean;
}
