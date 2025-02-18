function validatePassword(){
    const senha = document.getElementById("senha-cadastro").value;
    const confirmsenha = document.getElementById("confirm-senha").value;

    if(senha === confirmsenha){
        return true;
    }else{
        return false;
    }
}

function validateCPF(cpf) {
	cpf = cpf.replace(/\D+/g, '');
	if (cpf.length !== 11) return false;

	let soma = 0;
	let resto;
	if (/^(\d)\1{10}$/.test(cpf)) return false;

	for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
	resto = (soma * 10) % 11;
	if ((resto === 10) || (resto === 11)) resto = 0;
	if (resto !== parseInt(cpf.substring(9, 10))) return false;

	soma = 0;
	for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
	resto = (soma * 10) % 11;
	if ((resto === 10) || (resto === 11)) resto = 0;
	if (resto !== parseInt(cpf.substring(10, 11))) return false;

	return true;
}

function register(){
    const email = document.getElementById("email-cadastro").value;
    const senha = document.getElementById("senha-cadastro").value;

    firebase.auth().createUserWithEmailAndPassword(email,senha).then(() =>{
        alert("Cadastro efetuado com sucesso, retornando à pagina de login...");
        window.location.href="../index.html"
    }).catch(error => {
        if(error.code == "auth/email-already-in-use"){
            alert("E-mail já cadastrado, tente novamente!");
        } else{
            alert("Erro ao cadastrar, tente novamente!");
        }
    })
}

function changeCadastro(){
    if(document.querySelector('input[name="seletor-cadastro"]:checked').value === "medico"){
        document.getElementById("crm").style.display = 'block';
        document.getElementById("crm").required = true;
    } else{
        document.getElementById("crm").style.display = 'none';
        document.getElementById("crm").required = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('cadastro-form').addEventListener('submit', function(e) {
        
        var cpf = document.getElementById('cpf').value;
        if (!validateCPF(cpf)) {
            e.preventDefault();
            alert('CPF inválido. Verifique o número digitado.');
            document.getElementById('cpf').focus();
        } else if (!validatePassword()) {

            e.preventDefault();
            alert('Senha e confirmação de senha não são iguais');
            document.getElementById("senha").focus();      
        } else{
            e.preventDefault();
            register();
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

firebase.auth().onAuthStateChanged(user => {
    if (user){
        window.location.href = "./home.html"
    }
})