function login(){
    const email = document.getElementById("email").value;
    const passwd = document.getElementById("senha").value;

    firebase.auth().signInWithEmailAndPassword(email,passwd).then(response => {
        if(document.querySelector('input[name="seletor"]:checked').value === "medico"){
            window.location.href = "/pages/medico.html"
        } else{
            window.location.href = "/pages/paciente.html"
        }
      }).catch(error =>{
          console.log("error",alert("Dados de Login inválidos"),location.reload())
      });
}

function teste(){
    console.log("deu bom");
}

function validateEmail(){
    const email = document.getElementById("email").value;
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

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('cadastro-form').addEventListener('submit', function(e) {
		var cpf = document.getElementById('cpf').value;
		if (!validaCPF(cpf)) {
			e.preventDefault();
			alert('CPF inválido. Verifique o número digitado.');
			document.getElementById('cpf').focus();
		}
	});

	document.getElementById('cpf').addEventListener('input', function(e) {
		var value = e.target.value;
		var cpfPattern = value.replace(/\D/g, '')
							  .replace(/(\d{3})(\d)/, '$1.$2')
							  .replace(/(\d{3})(\d)/, '$1.$2')
							  .replace(/(\d{3})(\d)/, '$1-$2')
							  .replace(/(-\d{2})\d+?$/, '$1');
		e.target.value = cpfPattern;
	});
});

function changeCadastro(){
    if(document.querySelector('input[name="seletor-cadastro"]:checked').value === "medico"){
        document.getElementById("crm").style.display = 'block';
        document.getElementById("crm").required = true;
    } else{
        document.getElementById("crm").style.display = 'none';
        document.getElementById("crm").required = false;
    }
}

function recoverPassword(){
    const email = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        alert("Email de recuperação enviado com sucesso, caso não tenha recebido verifique o email digitado");
    });
}