import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const addTaxPayerForm = document.getElementById('addTaxPayerForm');
  const searchButton = document.getElementById('searchButton');
  const searchTid = document.getElementById('searchTid');
  const searchResult = document.getElementById('searchResult');
  const taxPayerList = document.getElementById('taxPayerList');

  addTaxPayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    addTaxPayerForm.reset();
    await updateTaxPayerList();
  });

  searchButton.addEventListener('click', async () => {
    const tid = searchTid.value;
    const result = await backend.searchTaxPayer(tid);
    if (result.length > 0) {
      const taxPayer = result[0];
      searchResult.innerHTML = `
        <p>TID: ${taxPayer.tid}</p>
        <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
        <p>Address: ${taxPayer.address}</p>
      `;
    } else {
      searchResult.innerHTML = '<p>No TaxPayer found with this TID.</p>';
    }
  });

  async function updateTaxPayerList() {
    const taxPayers = await backend.getAllTaxPayers();
    taxPayerList.innerHTML = taxPayers.map(tp => `
      <div class="tax-payer">
        <p>TID: ${tp.tid}</p>
        <p>Name: ${tp.firstName} ${tp.lastName}</p>
        <p>Address: ${tp.address}</p>
      </div>
    `).join('');
  }

  await updateTaxPayerList();
});
