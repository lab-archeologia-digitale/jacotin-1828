# Requires tippecanoe (https://github.com/mapbox/tippecanoe)
# Requires mb-util (https://github.com/mapbox/mbutil)

# Info: https://github.com/klokantech/vector-tiles-sample

rm -f jacotin.mbtiles \
&& \
rm -rf ../demo/tiles \
&& \
tippecanoe \
    -zg \
    --coalesce-densest-as-needed \
    --extend-zooms-if-still-dropping \
    -o jacotin.mbtiles \
        ../data/hydrography/bridges.geojson \
        ../data/hydrography/coastline.geojson \
        ../data/hydrography/hydrography_pll.geojson \
        ../data/hydrography/hydrography_plg.geojson \
        ../data/places/v1/places-v1-pt.geojson \
&& \
./mbutil/mb-util --image_format=pbf jacotin.mbtiles ../demo/tiles \
&& \
rm ../demo/tiles/metadata.json \
&& \
rm -f jacotin.mbtiles \
&& \
gzip -dr -S .pbf ../demo/tiles/* \
&& \
find ../demo/tiles/ -type f -exec mv '{}' '{}'.pbf \;
