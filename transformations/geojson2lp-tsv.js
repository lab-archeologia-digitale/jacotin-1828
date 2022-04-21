const fs = require('fs');
const { stringify } = require('wkt');
var tsv = require('tsv');


const input_file  = './data/places/v1/places-v1-pt.geojson';
const output_file = './data/places/v1/places-v1-LP.tsv';



/**
 * Maps GeoJson structure 
 * as developed by LAD
 * to LP-TSV v.0.3
 * documented at https://github.com/LinkedPasts/linked-places-format/blob/master/tsv_0.3.md
 * @param {object} f geojson feature object
 * @returns 
 */
const feature2lp = f => {

    // Places without name are not considered: title is required
    if (!f.properties.name){
      return false;
    }
    
    const ret = {};
    
    //  Required: https://github.com/LinkedPasts/linked-places-format/blob/master/tsv_0.3.md#-required-
    ret['id'] = f.properties.fid;
    ret['title'] = f.properties.name;
    ret['title_source'] = "Jacotin, Pierre, and Edme François Jomard. Carte Topographique De L'Égypte Et De Plusieurs Parties Des Pays Limitrophes; Levée Pendant L'Expédition De L' Armée Française, Par Les Ingénieurs-Géographes, Les Officiers Du Génie Militaire Et Les Ingénieurs Des Ponts Et Chaussées; Assujettie Aux Observations Des Astronomes, Construite Par M. Jacotin, Colonel Au Corps Royal Des Ingénieur-Géographes Militaires, Chevalier de l'Ordre Royal et Militaire de Saint-Louis et de la Légion d'Honneur, Membre de l'Institut d'Égypte; Gravée Au Dépôt Général De La Guerre, à l'Échelle de 1 Millimètre pour 100 Mètres. Publiée Par Ordre Du Gouvernement. 1828.";
    ret['start'] = "1828"
    
    //  encouraged
    ret['title_uri'] = "http://www.worldcat.org/oclc/248989716";
    ret['ccodes'] = "EG";
    
    if (f.properties.geonamesid && f.properties.geonamesid.length > 0){
      ret['matches'] = `gn:${f.properties.geonamesid}`;
    }

    ret['variants'] = '';
    if (f.properties.aka){
      ret['variants'] += f.properties.aka.replace(',', ';');
    }
    ret['types'] = "village";
    // Reference: https://github.com/LinkedPasts/linked-places-format/blob/master/feature-types-AAT_20210118.tsv
    ret['aat_types'] = "300008372";
    
    
    // optional
    ret['parent_name'] = "EG";
    // ret['parent_id'] = "";
    // ret['lon'] = "";
    // ret['lat'] = "";
    ret['geowkt'] = stringify(f.geometry);
    // ret['geo_source'] = "";
    // ret['geo_id'] = "";
    // ret['end'] = "";
    // ret['description'] = "";
    
    return ret;
  };
  
  
  
  fs.readFile(input_file, 'utf8', (err, data) => {
      
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
      return false;
    } else {
      // parse JSON string to JSON object
      const json = JSON.parse(data);
      if (typeof json !== 'object'){
        console.log(`Error parsing ${file}. Not valid JSON`);
        return false;
      }

      const features = json.features;

      if (typeof features !== 'object' || !features.length){
        console.log('Not valid features list');
        return;
      }

      const lparr = features.reduce( (filtered, option)  => {
        const value = feature2lp(option);
        if (value){
          filtered.push(value);
        }
        return filtered;
      }, []);

      const tsv_text = tsv.stringify(lparr);

      fs.writeFile(output_file, tsv_text, err => {
        if (err){
          console.log(`Error reading file to disk: ${err}`);
        } else {
          console.log('All done!')
        }
      });
    }
  });

