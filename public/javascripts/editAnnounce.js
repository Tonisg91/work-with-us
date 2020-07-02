const editFunction = () => {
  const className = 'hidden'
  const form = document.getElementById('edit-announce-data');
  const editBtn = document.getElementById('edit-announcement');

  document.getElementById('announce-data').classList.add(className);
  document.getElementById('save-button').classList.remove(className)
  form.classList.remove(className);
  editBtn.classList.add(className);
  //Ponemos los estilos aqui porque al introducirlo desd el scss, da problemas.
  form.style = 'display: flex; flex-direction: column;'
}