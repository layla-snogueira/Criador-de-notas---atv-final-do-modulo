const form = document.querySelector('#form-recados');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;

//Verificando login
let usuarioId = Number(sessionStorage.getItem('loginOn'));
const session = localStorage.getItem("session");

checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if (!usuarioId) {
        window.location.href = "login.html";
        return;
    }
}

// Salvando recados no LocalStorage
const attLS = (recados) => {localStorage.setItem('recados', JSON.stringify(recados))};

//RECUPERA DADOS DO LOCALSTORAGE
const memoLS = () => JSON.parse(localStorage.getItem('recados') || '[]');

const salvarRecado = (e) => {
    e.preventDefault();
    
    //Pegando os dados do form
    const titulo = form.titulo.value;
    const descricao = form.descricao.value;

    if(idx == 'novo'){
        const recados = memoLS();
        let idr = 0;
        for (const rec of recados){
            if(rec.usuarioId === usuarioId){
                idr = Number(rec.id);
            }
        }
        recados.push({id: idr += 1, titulo, descricao, usuarioId});
        attLS(recados);
        preencheTabela();
        form.reset();
    }else{
        let recado = {
            id: idx, titulo, descricao, usuarioId
        }
        atualizarRecado(idx, recado);
        preencheTabela();
        form.reset();
        idx = 'novo';
    }
   };

const preencheTabela = () => {
    const recados = memoLS();
    tabela.innerHTML = '';
    for(recado of recados){
        if(recado.usuarioId === usuarioId){
            tabela.innerHTML += `
            <tr>
                <th scope="row">${recado.id}</th>
                <td>${recado.titulo}</td>
                <td>${recado.descricao}</td>
                <td>
                    
                    <img title= "Deletar Nota" type="button" width="30" src="./img/lixo.png" onclick="delNote(${recado.id})">
                    <img title= "Editar Nota" type="button" width="30" src="./img/edit.png" onclick="editNote(${recado.id})">
                </td>
            </tr>
        `;
        }
    }
}

//Deletar e Editar Nota
const delNote = (id) => {
    const recados = memoLS();
    const indexRecado = recados.findIndex((recado) => recado.id === id)
    if(indexRecado < 0) return;
    recados.splice(indexRecado, 1);
    attLS(recados);
    alert("A nota foi deletado com sucesso!")
    preencheTabela();
}

const editNote = (id) => {
    const recados = memoLS();
    const indexRecado = recados.findIndex((recado) => recado.id === id);
    form.titulo.value = recados[indexRecado].titulo;
    form.descricao.value = recados[indexRecado].descricao;
    idx = id;
}

const atualizarRecado = (id, recado) => {
    const recados = memoLS();
    const indexRecado = recados.findIndex((r) => r.id === id);
    recados[indexRecado] = recado;
    attLS(recados);
}


//LogOut
document.querySelector('#btn-sair').addEventListener('click', (e)=>{
    e.preventDefault();
    logout()
  });

  function logout (){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");
    window.location.href = "login.html";
  }

//
 form.addEventListener('submit', salvarRecado);
document.addEventListener('DOMContentLoaded', preencheTabela);