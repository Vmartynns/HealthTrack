function logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href="../index.html";
    }).catch(() =>{
        alert("Erro ao fazer logout");
    })
}

findDocuments();

function findDocuments() {
    firebase.firestore()
    .collection('receitas')
    .get()
    .then(snapshot => {
        const receitas = snapshot.docs.map(doc => doc.data());
        addDocumentsToScreen(receitas);
    })
}


function addDocumentsToScreen(receitas) {
    const orderedList = document.getElementById('receitas');

    receitas.forEach(valor => {
        const li = document.createElement('li');
        
        const medic = document.createElement("p");
        medic.innerHTML = valor.medico;
        li.appendChild(medic);

        const patient = document.createElement("p");
        patient.innerHTML = valor.paciente;
        li.appendChild(patient);

        const recept = document.createElement("p");
        recept.innerHTML = valor.receita;
        li.appendChild(recept);

        orderedList.appendChild(li);
    });

}
