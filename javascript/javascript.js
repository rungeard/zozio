/*création des différents diagrammes*/

/* permet de définir le format des données*/

const schema = [
  { 
    name: 'Chariot', 
  },
  {
    name: 'Zone',
  },
  {
    name: 'Type',
  },
  {
    name: 'Quantité',  
    type: 'measure',
  },
  { 
      name: 'sav',
  },
];

const DataModel = muze.DataModel;
const dm = new DataModel(data, schema);
const env = muze();



/* graphique nombre de pièces par zone*/
const canvas1 = env.canvas();

        canvas1
    	.rows(['Quantité']) // axe Y
      	.columns(['Zone']) // axe X
      	.color('Type') // choix du filtre sur les couleurs
        .data(dm)
  	.layers([{
        	mark: 'bar', // type de graphique
        	transform: { type: 'group' } // 
        }])
  	.title('Nombre de pièces par zone',)
        .mount('#chart1') // nom du point de montage

/* calcul du nombre de capteurs liés au critère sav*/

const select = DataModel.Operators.select; 
const dm2 = new DataModel(data, schema);
/* séléction des lignes ayant un critère sav */
const selectFn = select(fields => fields.sav.value !== '');
const outputDM = selectFn(dm2);

const dmWithCount = outputDM.calculateVariable(
    {
      name: "nombre de capteurs",
      type: "measure",
      defAggFn: "count", //Comptabilise le nombre de capteurs liés à un critère de sav
      numberFormat: val => parseInt(val, 10)
    },
    ["Chariot", () => 1]
  );

/* graphique empilé nombre de capteurs par type*/
const canvas2 = env.canvas();

        canvas2
	.rows(['nombre de capteurs']) //  axe y
	.columns(['Type']) // axe x
	.color('sav') // choix du filtre sur la couleur
	.data(dmWithCount)
	.layers([
	  {
	    mark: "bar",
	    encoding: { y: "nombre de capteurs" },
	    transform: { type: "stack" }
	  }
	])
	.title("Nombre de capteurs par type")
    .mount('#chart2') // nom du point de montage


/* graphique donut Répartition des quantités par zone */
  const env2 = muze();
    env2
    .canvas()
    .data(dm)
    .rows([])
    .columns([])
    .config({
      axes: {
        radius: {
          range: (range) => {
            return [range[0] + 50, range[1]];
          }
        }
      }
    })
      .layers([{
        mark: 'arc',
        encoding: {
          angle: 'Quantité'
        }
      }
              ])
    .color("Zone")
    .title('Répartition des quantités par zone', { position: "top", align: "center", })
    .mount("#chart3"); // point de montage

/* graphique donut Répartition des capteurs sur le critère du sav*/
  const env3 = muze();
    env3
    .canvas()
    .data(dmWithCount)
    .rows([])
    .columns([])
    .config({
      axes: {
        radius: {
          range: (range) => {
            return [range[0] + 50, range[1]];
          }
        }
      }
    })
      .layers([{
        mark: 'arc',
        encoding: {
          angle: 'nombre de capteurs'
        }
      }
              ])
    .color("sav")
    .title('Répartition des capteurs sur le critère du sav', { position: "top", align: "center", })
    .mount("#chart4");// point de montage

/* graphique donut Répartition des quantités par type*/
  const env4 = muze();
    env4
    .canvas()
    .data(dm)
    .rows([])
    .columns([])
    .config({
      axes: {
        radius: {
          range: (range) => {
            return [range[0] + 50, range[1]];
          }
        }
      }
    })
      .layers([{
        mark: 'arc',
        encoding: {
          angle: 'Quantité'
        }
      }
              ])
    .color("Type")
    .title('Répartition des quantités par type', { position: "top", align: "center", })
    .mount("#chart5");//point de montage

/* création du tableau avec filtres, etc*/

$(document).ready( function () {

  
    $('#example').DataTable( {
	// paramétrage en francais
	language : { 
	"sEmptyTable":     "Aucune donnée disponible dans le tableau",
	"sInfo":           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
	"sInfoEmpty":      "Affichage de l'élément 0 à 0 sur 0 élément",
	"sInfoFiltered":   "(filtré à partir de _MAX_ éléments au total)",
	"sInfoPostFix":    "",
	"sInfoThousands":  ",",
	"sLengthMenu":     "Afficher _MENU_ éléments",
	"sLoadingRecords": "Chargement...",
	"sProcessing":     "Traitement...",
	"sSearch":         "Rechercher :",
	"sZeroRecords":    "Aucun élément correspondant trouvé",
	"oPaginate": {
	    "sFirst":    "Premier",
	    "sLast":     "Dernier",
	    "sNext":     "Suivant",
	    "sPrevious": "Précédent"
	},
	"oAria": {
	    "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
	    "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
	},
	"select": {
		"rows": {
		    "_": "%d lignes sélectionnées",
		    "0": "Aucune ligne sélectionnée",
		    "1": "1 ligne sélectionnée"
		} 
	}
        },
	// source des données
        data: data,
	// format des données
        columns: [
            { data: "Chariot" },
            { data: "Zone" },
            { data: "Type" },
            { data: "Quantité" },
            { data: "sav" },
        ]
    } );

} );

/* affichage du bouton remonter en haut*/
jQuery(function(){
    $(function () {
        $(window).scroll(function () { //Fonction appelée quand on descend la page
            if ($(this).scrollTop() > 200 ) {  // Quand on est à 200pixels du haut de page,
                $('#scrollUp').css('right','10px'); // Replace à 10pixels de la droite l'image
            } else { 
                $('#scrollUp').removeAttr( 'style' ); // Enlève les attributs CSS affectés par javascript
            }
        });
    });
});
 
