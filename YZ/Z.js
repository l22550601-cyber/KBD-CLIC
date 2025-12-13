// script.js
document.addEventListener('DOMContentLoaded', () => {
  const phonesContainer = document.getElementById('phonesContainer');
  const addressesContainer = document.getElementById('addressesContainer');
  const addPhoneBtn = document.getElementById('addPhoneBtn');
  const addAddressBtn = document.getElementById('addAddressBtn');
  const phoneTpl = document.getElementById('phoneRowTemplate');
  const addressTpl = document.getElementById('addressRowTemplate');
  const form = document.getElementById('contactForm');
  const cancelBtn = document.getElementById('cancelBtn');

  // function to add a phone rowa
  function addPhone(value = '', type = 'Mobile') {
    const clone = phoneTpl.content.cloneNode(true);
    const row = clone.querySelector('.phone-row');
    const input = row.querySelector('input[type="tel"]');
    const select = row.querySelector('select');
    input.value = value;
    select.value = type;
    attachRemove(row);
    phonesContainer.appendChild(row);
  }

  // function to add an address
  function addAddress(street = '', city = '', postal = '', type = 'Domicile') {
    const clone = addressTpl.content.cloneNode(true);
    const panel = clone.querySelector('.address-panel');
    const inputs = panel.querySelectorAll('input');
    const select = panel.querySelector('select');
    // order: street, city, postal
    inputs[0].value = street;
    if (inputs[1]) inputs[1].value = city;
    if (inputs[2]) inputs[2].value = postal;
    select.value = type;
    attachRemove(panel);
    addressesContainer.appendChild(panel);
  }

  // attach remove handler to row element (expects a .remove button inside)
  function attachRemove(el) {
    const btn = el.querySelector('.remove');
    if (btn) {
      btn.addEventListener('click', () => el.remove());
    }
  }

  // add initial one phone and one address to match the reference UI
  addPhone();
  addAddress();

  addPhoneBtn.addEventListener('click', () => addPhone());
  addAddressBtn.addEventListener('click', () => addAddress());

  cancelBtn.addEventListener('click', () => {
    if (confirm('Annuler et vider le formulaire ?')) {
      form.reset();
      // remove extra phone/address rows leaving 1 each
      phonesContainer.innerHTML = '';
      addressesContainer.innerHTML = '';
      addPhone();
      addAddress();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple form gather for demo (no server)
    const data = new FormData(form);
    const obj = {};
    for (let [k, v] of data.entries()) {
      if (k.endsWith('[]')) {
        // handled below (but template uses phone[] names so keep simple)
      }
      if (obj[k] === undefined) obj[k] = v;
      else if (Array.isArray(obj[k])) obj[k].push(v);
      else obj[k] = [obj[k], v];
    }

    // As a friendly demo show the values in console and alert summary
    console.log('Form data (raw):');
    for (const pair of data.entries()) console.log(pair[0], pair[1]);

    alert('Contact créé (simulation). Consulte la console pour voir les données.');
    form.reset();
    phonesContainer.innerHTML = '';
    addressesContainer.innerHTML = '';
    addPhone();
    addAddress();
  });
});