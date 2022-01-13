// creamos la funcion principal de carga de jQuery
$(function () {
    let expresion = /\d/gmi;//expresion regular
    let consulta = (hero) => {// una funcion con nombre consulta con un parametro de nombre hero
        if (hero && expresion.test(hero)) {//El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
            $.ajax({
                dataType: "json",
                type: "get",
                url: `https://superheroapi.com/api.php/10226964366997499/${hero}`, //en el ultimo numero de heroe,  pega lo que ingresa el usuario

                success: (result) => {
                    let name = result.name;
                    if (result.response === 'success') {

                        let primerResultado = `
                            <h3 class="text-center">super heroe encontrado</h3>
                            <div class="card">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="${result.image.url}" class="card-img" alt="${name}">

                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card   <-title">Nombre: ${result.name}</h5>
                                            <p class="card-text">conexiones: ${result.connections['group-affiliation']}</p>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item"><em>Publicado por</em>: ${result.biography.publisher}</li>
                                                <li class="list-group-item"><em>ocupacion</em>: ${result.work.occupation}</li>
                                                <li class="list-group-item"><em>primera aparicion</em>: ${result.biography['first-appearance']}</li>
                                                <li class="list-group-item"><em>altura</em>: ${result.appearance.height.join(" - ")}</li>
                                                <li class="list-group-item"><em>peso</em>: ${result.appearance.weight.join(" - ")}</li>
                                                <li class="list-group-item"><em>alianzas</em>: ${result.biography.aliases}
                                                
                        `;
                        // podemos ocupar forEach de jQuery o simplemente  usar join
                        let segundoResultado = "";
                        result.biography.aliases.forEach(alias => {
                            segundoResultado += `
                            <span>${alias}</span>
                            `
                        });
                        // cerramos las etiquetas de nuestra tarjeta
                        let tercerResultado = `
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        `;
                        $('#resultado').append(primerResultado + segundoResultado + tercerResultado);
                        // aqui no pude enlazar con la api, el canvasjs(grafico de torta), me 
                        // podrias indicar como hacerlo porfavor
                        let datosXY = [];
                        for (const key in result.powerstats) {
                            datosXY.push(
                                {
                                    label: key,
                                    y: parseInt(result.powerstats[key])
                                });
                        };
                        var options = {
                            title: {
                                text: `Estadísticas de Poder para ${result.name}`
                            },
                            data: [{
                                    type: "pie",
                                    startAngle: 45,
                                    showInLegend: "true",
                                    legendText: "{label}",
                                    indexLabel: "{label} ({y})",
                                    yValueFormatString:"#,##0.#"%"",
                                    dataPoints: datosXY
                                    
                            }]
                        };
                        $("#chartContainer").CanvasJSChart(options);
                    }


                    else {
                        alert("el Id ingresado no existe");
                        console.warn("el Id ingresado no existe");
                    };
                },
                error: () => {
                    alert("error al consultar los datos");
                    console.error("error al consultar los datos");

                }

            });

        }
        else {
            alert("debe ingresar solo numero")
            console.warn("debe ingresar solo numero");
        }


    };
    // crear evento para que escuche el formulario(form) y asi capturar lo que el usuario ingreso
    $('form').on('submit', event => {
        // prevenir comportamiento por defecto del formulario(form)
        event.preventDefault();
        // limpiamos el Dom donde desplegamos los resultados
        $("#resultado").html(" ");
        
        
        $("#chartContainer").html(" ");

        // capturamos informacion ingresada por el usuario y convertimos a numero entero
        hero = parseInt($('#hero').val());
        consulta(hero);
    })


 })
//  window.onload = function () {

//      var chart = new CanvasJS.Chart("chartContainer", {
//          theme: "dark2",
//          exportEnabled: true,
//          animationEnabled: true,
//          title: {
//              text: "Estadisticas de poder"
//          },
//          data: [{
//              type: "pie",
//              startAngle: 25,
//              toolTipContent: "<b>{label}</b>: {y}%",
//              showInLegend: "true",
//              legendText: "{label}",
//              indexLabelFontSize: 18,
//              indexLabel: "{label} - {y}%",
//              dataPoints: [

//                  { y:10, label: "Poder" },
//                  { y:10, label: "Durabilidad" },
//                  { y:10, label: "Combate" },
//                  { y:10, label: "Velocidad" },
//                  { y:10, label: "Fuerza" },
//                  { y:10, label: "Inteligencia" },

//              ]
//          }]
//      });
//      chart.render();

//  }
