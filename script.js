const affichage = document.getElementById('resultat');
const chiffres = document.querySelectorAll('.chiffre');
const operateurs = document.querySelectorAll('.operateur');
const egal = document.querySelector('.egal');
const effacer = document.querySelector('.effacer');
const retour = document.querySelector('.retour');

// Ajouter un événement à chaque bouton chiffre
chiffres.forEach(chiffre => {
    chiffre.addEventListener('click', () => {
        console.log(chiffre.value);
        affichage.value += chiffre.value;
    });
});

// Ajouter un événement à chaque bouton opérateur
operateurs.forEach(operateur => {
    operateur.addEventListener('click', () => {
        affichage.value += operateur.value;
    });
});

// Ajouter un événement au bouton égal
egal.addEventListener('click', () => {
    // use a max of 2 decimal places
    affichage.value = eval(affichage.value).toFixed(2);
});

// Ajouter un événement au bouton effacer
effacer.addEventListener('click', () => {
    affichage.value = '';
});

// Ajouter un événement au bouton retour
retour.addEventListener('click', () => {
    affichage.value = affichage.value.slice(0, -1);
});
