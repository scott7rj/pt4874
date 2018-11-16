function buildMenu(menu) {
    var result;
    $.get( "/menu", function( data ) {
        console.log( "buildMenu was performed." );
        var json, i, content, idchange, aux;
        content = '<ul>';
        idchange = false;
        aux = '';
        json = $.parseJSON(data);
        for(i=0; i<json.items.length; i++) {

            switch (json.items[i].level) {
                case 1:
                    content += '<ul>';
                    break;
                case 2:
                    console.log('#level2');
                    content += '<ul>';
                    break;
                default:
                    break;
            }
            content += '<li>' + json.items[i].id + '-' +
                         json.items[i].description + '- id menu: ' +
                         json.items[i].id_menu + '- id_parent: ' +
                         json.items[i].id_parent + '- level: ' +
                         json.items[i].level + '- order: ' +
                         json.items[i].order +
                         '</li>';
            
            switch (json.items[i].level) {
                case 1:
                    content += '</ul>';
                    break;
                case 2:
                    content += '</ul>';
                    break;
                case 3:
                default:
                    break;
            }
            /*
            switch(json.items[i].level) {
                case '0':
                    content += '<li>' + json.items[i].id + '-' +
                         json.items[i].description + '-' +
                         json.items[i].id_menu + '-' +
                         json.items[i].id_parent + '-' +
                         json.items[i].level + '-' +
                         json.items[i].order + '-' +
                         '</li>';
                    break;
                case '1':
                    content += '<li>' + json.items[i].id + '-' +
                    json.items[i].description + '-' +
                    json.items[i].id_menu + '-' +
                    json.items[i].id_parent + '-' +
                    json.items[i].level + '-' +
                    json.items[i].order + '-' +
                    '</li>';
                    break;
                default:
                    break;
            }
            */
        }
        content += '</ul>';
        $('#menu').html(content);
    });
}
$( document ).ready(function() {
    //var json, i, content;
    
    buildMenu('NSGD');


});