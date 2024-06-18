var contatos = JSON.parse(localStorage.getItem("contatos")) || [];

var botao = document.querySelector(".botao-enviar");
var formulario = document.querySelector(".form-contatar");

botao.addEventListener("click", function(event){
    event.preventDefault();
    enviarFormulario();
    mostrarMensagens();
    limparFormulario();
});

function enviarFormulario() {

  var id = contatos.length + 1;

  var data = new Date();
  data = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`

  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var mensagem = document.getElementById("mensagem").value;

  adicionarContato(id, nome, email, mensagem, data);

 
}

//limpar formulário
function limparFormulario() {
    
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensagem").value = "";

    console.log("Formulário limpo");

}

function adicionarContato(id, nome, email, mensagem,data) {

    //adicionar contato
    contatos.push({id: id, nome: nome, email: email, mensagem: mensagem, data: data});
    localStorage.setItem("contatos", JSON.stringify(contatos));

}

//mostrar mensagem do localStorage
function mostrarMensagens() {
    var itemLista = document.querySelector(".mostrar-mensagem ul");

    // Limpar a lista antes de adicionar os itens para evitar duplicação
    itemLista.innerHTML = '';

    contatos.forEach(function(contato) {
        var li = document.createElement("li");
        
        ///criar campo span para id
        var idSpan = document.createElement("span");
        idSpan.textContent = `ID: ${contato.id}`;        

        var nomeSpan = document.createElement("span");
        nomeSpan.textContent = `Nome: ${contato.nome}`;
        nomeSpan.style.marginLeft = "30px"; 
        
        var emailSpan = document.createElement("span");
        emailSpan.textContent = `Email: ${contato.email}`;
        emailSpan.style.marginLeft = "30px"; 
        
        var mensagemSpan = document.createElement("span");
        mensagemSpan.textContent = `Mensagem: ${contato.mensagem}`;
        mensagemSpan.style.marginLeft = "30px";

        //criar campo span para data de envio
        var dataSpan = document.createElement("span");
        dataSpan.textContent = `Data de envio: ${contato.data}`;
        dataSpan.style.marginLeft = "30px";

        li.appendChild(idSpan);
        li.appendChild(nomeSpan);
        li.appendChild(emailSpan);
        li.appendChild(mensagemSpan);
        li.appendChild(dataSpan);

        //criar botão para excluir 
        var botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "X";
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.style.marginLeft = "20px";
        botaoExcluir.style.cursor = "pointer";
        botaoExcluir.style.fontSize = "12px";
        botaoExcluir.style.backgroundColor = "black";   
        botaoExcluir.style.border = "black 1px solid";
        botaoExcluir.style.borderRadius = "5px";
        botaoExcluir.style.color = "violet";

        botaoExcluir.addEventListener("click", function() {
            li.remove();
            removerContato(contato);
        });

        li.appendChild(botaoExcluir);
        itemLista.appendChild(li);
    });
}

function removerContato(contato) {
    contatos = contatos.filter(function(item) {
        return item.nome !== contato.nome || item.email !== contato.email || item.mensagem !== contato.mensagem;
    });
    
    localStorage.setItem("contatos", JSON.stringify(contatos));
}

mostrarMensagens();

// função para pesquisar por nome 
function pesquisarPorNome() {
    var nomePesquisado = document.getElementById("pesquisa").value;

    var itemLista = document.querySelector(".mostrar-mensagem ul");
    itemLista.innerHTML = '';

    contatos.forEach(function(contato) {
        var contatoNome = contato.nome.toLowerCase();

        if (contato.nome === nomePesquisado || contatoNome.startsWith(nomePesquisado.toLowerCase())) {

            var itemLista = document.querySelector(".mostrar-mensagem ul");

            var li = document.createElement("li");
            var idSpan = document.createElement("span");
            idSpan.textContent = `ID: ${contato.id}`;
            var nomeSpan = document.createElement("span");
            nomeSpan.textContent = `Nome: ${contato.nome}`;
            nomeSpan.style.marginLeft = "30px";
            var emailSpan = document.createElement("span");
            emailSpan.textContent = `Email: ${contato.email}`;
            emailSpan.style.marginLeft = "30px";
            var mensagemSpan = document.createElement("span");
            mensagemSpan.textContent = `Mensagem: ${contato.mensagem}`;
            mensagemSpan.style.marginLeft = "30px";
            li.appendChild(idSpan);
            li.appendChild(nomeSpan);
            li.appendChild(emailSpan);
            li.appendChild(mensagemSpan);
            itemLista.appendChild(li);
        }
    });
}

function limparContatos(){

    contatos = []; 
    localStorage.removeItem("contatos");
}

