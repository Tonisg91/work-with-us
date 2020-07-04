const hdn = 'hidden'
const style = 'display: flex; flex-direction: column;'

const editAnnounce = () => {
  const form = document.getElementById('edit-announce-data');
  const editBtn = document.getElementById('edit-announcement');

  document.getElementById('announce-data').classList.add(hdn);
  document.getElementById('save-button').classList.remove(hdn)
  form.classList.remove(hdn);
  editBtn.classList.add(hdn);
  //Ponemos los estilos aqui porque al introducirlo desd el scss, da problemas.
  form.style = style;
}

const editOffer = () => {
  const dataDiv = document.getElementById('offer-data');
  const editForm = document.getElementById('edit-offer-data');

  document.querySelectorAll('.btn').forEach(e => e.classList.add(hdn));
  document.getElementById('save-button').classList.remove(hdn);
  dataDiv.classList.add(hdn);
  editForm.classList.remove(hdn);
  editForm.style = style;

}