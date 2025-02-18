function login(){
    const email = document.getElementById("email-login").value;
    const passwd = document.getElementById("senha-login").value;

    firebase.auth().signInWithEmailAndPassword(email,passwd).then(response => {
        if(document.querySelector('input[name="seletor"]:checked').value === "medico"){
            window.location.href = './pages/home.html'
        } else{
            window.location.href = './pages/home.html'
        }
      }).catch(error =>{
          console.log("error",alert("Dados de Login inválidos"),location.reload());
      });
}

function validateEmail(){
    const email = document.getElementById("email-login").value;
    if(!email){
        document.getElementById("submit").disabled = true;
        document.getElementById("recover-passwd").disabled = true;
    } else if(/^\S+@\S+\.\S+$/.test(email)){
        document.getElementById("submit").disabled = false;
        document.getElementById("recover-passwd").disabled = false;
    }else{
        document.getElementById("submit").disabled = true;
        document.getElementById("recover-passwd").disabled = true;
    }
}

function recoverPassword(){
    const email = document.getElementById("email-login").value;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        alert("Email de recuperação enviado com sucesso, caso não tenha recebido verifique o email digitado");
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user){
        window.location.href = "./pages/home.html"
    }
})
