const editFunction = () => {
  const className = 'hidden'
  document.getElementById('announce-data').classList.add(className);
  document.getElementById('edit-announce-data').classList.remove(className);
  document.getElementById('edit-announcement').classList.add(className)
  document.getElementById('save-button').classList.remove(className)
}