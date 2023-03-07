//Criando usuário e salvando no local storage
document.querySelector('#btn-cad').addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.querySelector('#emailCad').value;
    let senha = document.querySelector('#senhaCad').value;
    let confirmaSenha = document.querySelector('#confirmsenhaCad').value;

    if (email.length > 8 && validaEmail(email) == true){
        if(senha === confirmaSenha ){
            salvar(email, senha);
            alert(`Cadastro realizado com sucesso!`);
        }else{
            alert(`Verifique sua senha! Ela deve ser igual nos dois campos!`)
        }
    }else{
        alert(`O E-mail digitado é inválido! `)
    }
    
});

//Validação do email
function validaEmail (validemail){
    let re = /\S+@\S+\.\S+/;
    return re.test(validemail);
}

//Função para salvar usuário no LocalStorage
function salvar(email, senha){
    let user = JSON.parse(localStorage.getItem('users-cad') || '[]');
  
    let usuario = {
        id: user.length + 1,
        email: email,
        senha: senha
    }

    if(usuario )

    user.push(usuario);
    localStorage.setItem('users-cad', JSON.stringify(user));
    location.href = 'recados.html';    
};







