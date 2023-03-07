
//Login
document.querySelector('#btn-login').addEventListener('click', (e)=>{
    e.preventDefault();
    login()
});

function login(){
    let email = document.querySelector('#email').value;
    let senha = document.querySelector('#senha').value;


    let usuarioValido = {
        email: "",
        senha: ""
    }

    listaUser = JSON.parse(localStorage.getItem('users-cad') || '[]');

    listaUser.forEach(item => {
        if(email === item.email && senha === item.senha){
            usuarioValido = {
                id: item.id,
                login: item.email,
                senha: item.senha
            }
        }
    });

    if(email === usuarioValido.login && senha === usuarioValido.senha){
        saveSession(usuarioValido.id);
        window.location.href ='recados.html';
    }else{
        alert('Algo deu errado, verifique o e-mail e a senha digitados e caso não possua cadastro, clique em cadaste-se e crie uma conta agora mesmo!')
    }
};

function saveSession(data){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("loginOn", JSON.stringify(data));

};

