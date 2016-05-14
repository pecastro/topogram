// get colors
var defaultColors = d3.scale.category20(); // default value

categoriesColors = {
  "laboratoire" : "#3182bd",
  "etablissement" :"#9ecae1",
  "ecole-doctorale" :"#deebf7",

  "enseignement" : "#ffffb2",
  "médiation" :"#fecc5c",
  "creation" :"#fd8d3c",
  "patrimoine" :"#f03b20",
  "cst" : "#bd0026",

  "ville" : "#31a354"
};

colors = function(group){
  if (Object.keys(categoriesColors).indexOf(group) > -1)  return categoriesColors[group]
  else return defaultColors(group);
}


Template.registerHelper( 'objectToPairs', function( object ) {
    return _.map( object, function( value, key ) {
        return {
            key: key,
            value: value
        };
    } );
} );

// get current node
getCurrentSelection = function() {
  var id = Session.get( 'currentId' ),
      type = Session.get( 'currentType' ),
      item = {};
  if(id && type) {
    if ( type == 'node' ) {
        item = Nodes.findOne( {
            'data.id': id
        } );
    } else if ( type == 'edge' ) {
        item = Edges.findOne( {
            'data.id': id
        } );
    }
  }
  return item;
}

// truncate String to make it shorter
String.prototype.trunc = function(m) {
  return (this.length > m)
    ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
    : this;
};
