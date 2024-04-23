export const styles = [{
    id: "gl-draw-polygon-fill-inactive",
    type: "fill",
    filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    paint: {
        "fill-color": "#3bb2d0",
        "fill-outline-color": "#3bb2d0",
        "fill-opacity": .1
    }
}, {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    paint: {
        "fill-color": "#fbb03b",
        "fill-outline-color": "#fbb03b",
        "fill-opacity": .1
    }
}, {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
        "circle-radius": 3,
        "circle-color": "#fbb03b"
    }
}, {
    id: "gl-draw-polygon-stroke-inactive",
    type: "line",
    filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    layout: {
        "line-cap": "round",
        "line-join": "round"
    },
    paint: {
        "line-color": "#3bb2d0",
        "line-width": 2
    }
}, {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: {
        "line-cap": "round",
        "line-join": "round"
    },
    paint: {
        "line-color": "#fbb03b",
        "line-dasharray": [.2, 2],
        "line-width": 2
    }
}, {
    id: "gl-draw-line-inactive",
    type: "line",
    filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
    layout: {
        "line-cap": "round",
        "line-join": "round"
    },
    paint: {
        "line-color": "#3bb2d0",
        "line-width": 2
    }
}, {
    id: "gl-draw-line-active",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
    layout: {
        "line-cap": "round",
        "line-join": "round"
    },
    paint: {
        "line-color": "#fbb03b",
        "line-dasharray": [.2, 2],
        "line-width": 2
    }
}, {
    id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
    type: "circle",
    filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
    paint: {
        "circle-radius": 5,
        "circle-color": "#fff"
    }
}, {
    id: "gl-draw-polygon-and-line-vertex-inactive",
    type: "circle",
    filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
    paint: {
        "circle-radius": 3,
        "circle-color": "#fbb03b"
    }
}, {
    id: "gl-draw-point-point-stroke-inactive",
    type: "circle",
    filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
    paint: {
        "circle-radius": 5,
        "circle-opacity": 1,
        "circle-color": "#fff"
    }
}, {
    id: "gl-draw-point-inactive",
    type: "circle",
    filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
    paint: {
        "circle-radius": 3,
        "circle-color": "#3bb2d0"
    }
}, {
    id: "gl-draw-point-stroke-active",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]],
    paint: {
        "circle-radius": 7,
        "circle-color": "#fff"
    }
}, {
    id: "gl-draw-point-active",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]],
    paint: {
        "circle-radius": 5,
        "circle-color": "#fbb03b"
    }
}, {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    paint: {
        "fill-color": "#404040",
        "fill-outline-color": "#404040",
        "fill-opacity": .1
    }
}, {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    layout: {
        "line-cap": "round",
        "line-join": "round"
    },
    paint: {
        "line-color": "#404040",
        "line-width": 2
    }
}, {
    id: "gl-draw-line-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
    layout: {
        "line-cap": "round",
        "line-join": "round"
    },
    paint: {
        "line-color": "#404040",
        "line-width": 2
    }
}, {
    id: "gl-draw-point-static",
    type: "circle",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
    paint: {
        "circle-radius": 5,
        "circle-color": "#404040"
    }
}, {
    id: "gl-draw-symbol",
    type: "symbol",
    layout: {
        "text-line-height": 1.1,
        "text-size": 12,
        "text-font": ["Inter Regular", "Arial Unicode MS Regular"],
        "text-anchor": "left",
        "text-justify": "left",
        "text-offset": [.8, .8],
        "text-field": "{distance} \n {area}",
        "text-max-width": 7,
        'icon-image': 'label-bg',
        'icon-text-fit': 'both',
        'icon-text-fit-padding': [5,5,5,5]
    },
    paint: {
        "text-color": "#ffffff",
        "text-halo-color": "#F5F5F4",
        "text-halo-width": 0,
        "text-halo-blur": 0
    },
    filter: ["==", "meta", "currentPosition"]
}];
