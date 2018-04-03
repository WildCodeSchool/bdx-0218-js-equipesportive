function changeText() {
  let bouton = document.getElementById('button-lire-suite');
  if (bouton.innerText === 'Lire la suite ...') {
    bouton.innerText = 'Cacher le texte';
  } else {
    bouton.innerText = 'Lire la suite ...';
  }
}
