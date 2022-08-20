
var data = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : spreadsheet_key,
  worksheet : worksheet_id
});
var width = parseInt(d3.select('article.item').style('width'), 10);
data.fetch({ 
  success : function() {
    var json = data.sort(function(a, b) {return d3.descending(a.Goles, b.Goles);}).toJSON()
    var x = d3.scale.linear()
    .domain([0, data.max('Goles')])
    .range([0, width-100]);

    d3.select(".chart")
      .selectAll("div")
        .data(json)
      .enter().append("div")
        .style("width", function(d) { return 100+x(d.Goles) + "px"; })
        .attr("class", "stretchRight")
        .html(function(d) { return  d.Jugador + "<span class='goles'>" + d.Goles + "</span>"; });
    d3.select("p.total")
      .html("En total se han marcado <strong>" + data.sum('Goles') +"</strong> goles.")
   
    d3.select(window).on('resize', resize);
    function resize() {
     // update width
     width = parseInt(d3.select('article.item').style('width'), 10);

     // reset x range
     x.range([0, width-100]);

     d3.selectAll('.chart div')
        .style("width", function(d) { return 100+x(d.Goles) + "px"; })
    }
 
 },
  error : function() {
    d3.select(".chart").text("Hubo un problema al cargar los datos. Vuelve a intentarlo más tarde.")
  }
});



