function formResponsavel() {
    var content;
    content = '<input type="text" id="txtNomeCargo" size="30" maxlength="100" placeholder="nome" />';
    content += '<input type="text" id="txtIdadeCargo" size="10" maxlength="3" placeholder="idade mín." />';
    content += comboUf();
    content += comboNacionalidade('r');
    
    content += '<input type="button" id="btnCargo" value="Cadastrar" onclick="cadastrarCargo()" />';
    $("#filterr").html(content);
    return;
}
function listaCargo() {
    var result;
    jQuery.ajax({
        url: '/cargos',
        success: function(data) {
            var json, i;
            json = $.parseJSON(data);
            content = '<h3>Lista de Cargos</h3>';
            content += '<table><tr><th>id</th><th>nome</th><th>idade mín.</th><th>UF</th><th>Nacionalidade</th></tr>';    
            for(i=0; i<json.items.length; i++) {
                content += '<tr><td>' + json.items[i].id + '</td><td>' + 
                json.items[i].nome + '</td><td>' + 
                json.items[i].idade_minima + '</td><td>' + 
                sessionStorage.getItem('uf'+json.items[i].id_uf) + '</td><td>' + 
                sessionStorage.getItem('nac'+json.items[i].id_nacionalidade) + '</td></tr>';
            }
            content += '</table>';
            result = content;
        },
        async:false
    });
    $("#listr").html(result);
    return;
}
function listaCandidato() {
    var result;
    jQuery.ajax({
        url: '/candidatos',
        success: function(data) {
            var json, i;
            json = $.parseJSON(data);
            content = '<h3>Lista de Candidatos</h3>';
            content += '<table><tr><th>id</th><th>nome</th><th>idade</th><th>cargo</th><th>Nacionalidade</th><th>chave</th></tr>';    
            for(i=0; i<json.items.length; i++) {
                content += '<tr><td>' + json.items[i].id + '</td><td>' + 
                json.items[i].nome + '</td><td>' + 
                json.items[i].idade + '</td><td>' + 
                sessionStorage.getItem('car'+json.items[i].id_cargo) + '</td><td>' + 
                sessionStorage.getItem('nac'+json.items[i].id_nacionalidade) + '</td><td>' + 
                json.items[i].chave + '</td></tr>';
            }
            content += '</table>';
            result = content;
        },
        async:false
    });
    $("#list2r").html(result);
    return;
}
function login() {
    if ( $.trim($('#txtLogin').val()).length === 0 || $.trim($('#txtPwd').val()).length === 0 ) {
        alert('Preencha o login e a senha');
        $('#txtLogin').focus();
        return;
    }
    if ($('#txtLogin').val() === 'admin' && $('#txtPwd').val() === 'admin') {
        formResponsavel();
        listaCargo();
        listaCandidato();
        $('#txtLogin').val('');
        $('#txtPwd').val('');
        sessionStorage.setItem('adminlogged', 'true');
    } else {
        alert('login ou senha inválidos');
        $('#txtLogin').val('');
        $('#txtPwd').val('');
        $('#txtLogin').focus();
    }
}
function logoff() {
    $('#filterr').html('');
    $('#listr').html('');
    $('#list2r').html('');
    sessionStorage.setItem('adminlogged', null);
}
function comboNacionalidade(posfix) {
    var result;
    jQuery.ajax({
        url: '/nacionalidades',
        success: function(data) {
            var json, i;
            json = $.parseJSON(data);
            content='<select id="selNacionalidade'+posfix+'">';    
            for(i=0; i<json.items.length; i++) {
                sessionStorage.setItem('nac'+json.items[i].id, json.items[i].nome);
                if(json.items[i].id === 32) 
                    content += '<option selected value=' + json.items[i].id + '>' + json.items[i].nome + '</option>';
                else
                    content += '<option value=' + json.items[i].id + '>' + json.items[i].nome + '</option>';
            }
            content+='</select>';
            result = content;
        },
        async:false
    });    
    return result;
}
function comboUf() {
    var result;
    jQuery.ajax({
        url: '/uf',
        success: function(data) {
            var json, i;
            json = $.parseJSON(data);
            content='<select id="selUf">';    
            for(i=0; i<json.items.length; i++) {
                sessionStorage.setItem('uf'+json.items[i].id, json.items[i].nome);
                content += '<option value=' + json.items[i].id + '>' + json.items[i].nome + '</option>';
            }
            content+='</select>';
            result = content;
        },
        async:false
    });
    
    return result;
}
function comboCargo() {
    var result;
    jQuery.ajax({
        url: '/cargos',
        success: function(data) {
            var json, i;
            json = $.parseJSON(data);
            content='<select id="selCargo">';    
            for(i=0; i<json.items.length; i++) {
                sessionStorage.setItem('car'+json.items[i].id, json.items[i].nome);
                content += '<option value=' + json.items[i].id + '>' + json.items[i].nome + '</option>';
            }
            content+='</select>';
            result = content;
        },
        async:false
    });
    
    return result;
}
function candidatar() {
    if ( $.trim($('#txtNomeCandidato').val()).length === 0 ||  $.trim($('#txtIdadeCandidato').val()).length === 0 ) {
        alert('Preencha o nome e a idade');
        $('#txtNomeCandidato').focus();
        return;
    } 
    if (!$.isNumeric($('#txtIdadeCandidato').val())) {
        alert('Idade deve ser numérica');
        $('#txtIdadeCandidato').focus();
        return;
    }

   var data = {
    "nome":$.trim($('#txtNomeCandidato').val()),
    "idade":$.trim($('#txtIdadeCandidato').val()),
    "id_nacionalidade":$('#selNacionalidadec option:selected').val(),
    "id_cargo":$('#selCargo option:selected').val()
    };

    fetch('https://apex.oracle.com/pls/apex/www/ws/candidatos/0', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }).then(response => { 
        return response.json(); 
    }).then(data => { 
        $('#resultc').html('Chave de Inscrição: ' + data.chave);
        $('#txtNomeCandidato').val('');
        $('#txtIdadeCandidato').val('');
        $('#txtNomeCandidato').focus();
        if (sessionStorage.getItem('adminlogged') === 'true') {
            listaCandidato();
        }
    }).catch(err => {
        console.log(err);
    });
}
function cadastrarCargo() {
    if ( $.trim($('#txtNomeCargo').val()).length === 0 ||  $.trim($('#txtIdadeCargo').val()).length === 0 ) {
        alert('Preencha o nome e a idade');
        $('#txtNomeCargo').focus();
        return;
    } 
    if (!$.isNumeric($('#txtIdadeCargo').val())) {
        alert('Idade mínima deve ser numérica');
        $('#txtIdadeCargo').focus();
        return;
    }
   var data = {
    "nome":$.trim($('#txtNomeCargo').val()),
    "id_uf":$('#selUf option:selected').val(),
    "idade_minima":$.trim($('#txtIdadeCargo').val()),
    "id_nacionalidade":$('#selNacionalidader option:selected').val()
    };

    fetch('https://apex.oracle.com/pls/apex/www/ws/cargos/0', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }).then(response => { 
        return response.json(); 
    }).then(data => { 
        $('#txtNomeCargo').val('');
        $('#txtIdadeCargo').val('');
        $('#txtNomeCargo').focus();
        listaCargo();
        formCandidato();
        if (sessionStorage.getItem('adminlogged') === 'true') {
            listaCandidato();
        }
    }).catch(err => {
        console.log(err);
    });
}
function formCandidato() {
    var content, c;
    content = '<input type="text" id="txtNomeCandidato" size="30" maxlength="100" placeholder="nome" />';
    content += '<input type="text" id="txtIdadeCandidato" size="10" maxlength="3" placeholder="idade" />';
    content += comboNacionalidade('c');
    content += comboCargo();
    content += '<input type="button" id="btnCandidato" value="Inscrever-se" onclick="candidatar()" />';
    $("#filterc").html(content);
    return;
}
$( document ).ready(function() {
    var json, i, content;

    $(document).on({
        ajaxStart: function() {
            $('body').addClass('loading');
        },
        ajaxStop: function() {
            $('body').removeClass('loading');
        }
    });
    
    formCandidato();

    $('#txtNomeCandidato').focus();
    $('#filterr').html('');
    $('#listr').html('');
    $('#resultr').html('');
    sessionStorage.setItem('adminlogged', 'false');

});