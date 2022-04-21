const map = new maplibregl.Map({
  container: "map",
  center: [31.2584644, 30.0594885],
  zoom: 5,
  style: {
    version: 8,
    name: "Digitizing Napoleonic Map of Egypt by LAD",

    "glyphs": "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",

    sources: {
      // bridges, coastline, riversl, riversplg"

      "jacotin": {
        "type": "vector",
        "tiles": [
          `${window.location.origin}${window.location.pathname}/tiles/{z}/{x}/{y}.pbf`,
        ],
        "maxzoom": 10,
        "attribution": `<a href="https://atlas.paths-erc.eu" rel="noopener">PAThs: Archaeological Atlas of Coptic Literature</a>
        <br>
        <a href="http://purl.org/lad" rel="noopener">LAD: Laboratorio di Archeologia Digitale @ Sapienza</a>`
      },

      'jac-raster': {
        'type': 'raster',
        "crossOrigin": 'anonymous',
        'tiles': [
        'http://tiles.paths-erc.eu/jacotin-raster/{z}/{x}/{y}.png'
        ],
        'tileSize': 256
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: {
            "background-color": "#292c34"
        }
    },
    // {
    //     'id': 'simple-tiles',
    //     'type': 'raster',
    //     'source': 'jac-raster',
    //     'minzoom': 0,
    //     'maxzoom': 22
    //   },
      {
        id: "coastline",
        source: "jacotin",
        "source-layer": "coastline",
        type: "line",
        paint: {
          "line-color": "#6498d2",
          "line-width": 1,
        },
      },
      {
        id: "hydrography_pll",
        source: "jacotin",
        "source-layer": "hydrography_pll",
        type: "line",
        paint: {
          "line-color": "#5daef2",
          "line-width": 1,
        },
      },
      {
        id: "hydrography_plg-outline",
        source: "jacotin",
        "source-layer": "hydrography_plg",
        type: "line",
        paint: {
            "line-color": "#5daef2",
            "line-width": .5,
            "line-opacity": .8,
        }
      },
      {
        id: "hydrography_plg-fill",
        source: "jacotin",
        "source-layer": "hydrography_plg",
        type: "fill",
        paint: {
            "fill-color": "#5daef2",
            "fill-opacity": .3,
        }
      },
      {
        id: "placesv1pt",
        source: "jacotin",
        "source-layer": "placesv1pt",
        type: "circle",
        layout: {
          visibility: "visible",
        },
        paint: {
          "circle-radius": 3,
          "circle-color": "#96c375",
        },
      },
      {
        id: "bridges",
        source: "jacotin",
        "source-layer": "bridges",
        type: "circle",
        layout: {
          visibility: "visible",
        },
        paint: {
          "circle-radius": 2,
          "circle-color": "#c775df",
        },
      },
      {
        id: 'poi-labels',
        type: 'symbol',
        source: 'jacotin',
        'source-layer': 'placesv1pt',
        layout: {
          'text-field': ['get', 'name'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'text-font': ['Open Sans Regular'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#abb2c0',
        }
      },
    ],
  },
});

const zoomCtrl = new maplibregl.NavigationControl({visualizePitch: true});
map.addControl(zoomCtrl, 'top-left');

const scale = new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
});
map.addControl(scale);
scale.setUnit('metric');



// map.on('zoom', (e) => {
//   console.log(map.getZoom());
// });

/**
 * Colori One Atom
 * Viola: #c775df
 * Azzurro: #5daef2
 * Grigio: #abb2c0
 * Verde: #96c375
 * Arancione: #d4666e
 * Marrone: #d29b62
 */

