document.addEventListener('DOMContentLoaded', () => {
// Two tabs, 1 for Guests, 1 for Events. Each of the tabs should have its own DataTable, it must become visible when its tab is active,
// do not reinitiate the DataTable, just change its visibility.
// Guests should have 2 columns, 1 for ID, a second for Guest Name.
// Events should have 4 entries, 1 for ID, 2 for Guest List - (list of all guest names or ids), 3 is Schedule Date, and 4th one is random hash or number.
// Both of the datatables, need data adders, for Guests, you need input for new user name,
// ID should be automatically incremented. For Events, you need input for adding tags and the tags must exist in Guests datatable, for Schedule Date you need a date picker input.
// And when you submit any of these data adders, the data is processed from the inputs/entries and added to the datatable.

let guestTable, eventTable;

if (document.getElementById("guests-table") && typeof DataTable !== 'undefined') {
  guestTable = new DataTable("#guests-table", {
    searchable: false,
    perPageSelect: false
  });
}

if (document.getElementById("events-table") && typeof DataTable !== 'undefined') {
  eventTable = new DataTable("#events-table", {
    searchable: false,
    perPageSelect: false
  });
}

// New Guest Name Object
const contacts = {
  guestnames: [], // name
}
const events = [
] // { guestlist - this is obtained from the temporary array and added here on submit, date, random_hash }   

let guestnames = []
// DOM Manipulation Functions

document.getElementById("add_new_guest").addEventListener('click', function(event) {
  event.preventDefault(); 

  const name =  document.getElementById("new_guest_name").value.trim();
  const input = document.getElementById("new_guest_name");

    if (!name) { 
      alert('Enter name');
      return;
    }

    // Add a row manually to the tbody
    const tbody = document.querySelector("#guests-table tbody");
    const newId = tbody.rows.length + 1;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${newId}</td><td>${name}</td>`;
    tbody.appendChild(newRow);

    // Update the array of guest names
    contacts.guestnames.push(name);

    // Clear the input field
    document.getElementById("new_guest_name").value = "";
    });

// add a click event for the dropdown:
/* 
 on the click event:
   - use the contacts.guestnames to display all of the names inside <ul> 
     and the names need to be also having another click event, which will close the dropdown and add the clicked name into another array
     (and this array is a temporary array (that needs to be cleared when event is added), lets call this array entered_guestlist), and 
     you add a tag element above the dropdown button (instead of the 'Default' text, you put the guest name that clicked) - the newly added tag element
     needs to have a click event for removal and this event is on a remove icon, which will remove the tag and will also remove it from the temporary array.  
*/

let entered_guestlist = []; // temporary array

const dropdownBtn = document.getElementById("dropdownSearchButton");
const dropdown = document.getElementById("dropdownSearch");
const guestListUL = document.getElementById("guest-list");
const selectedGuestsContainer = document.getElementById("selected-guests");

// show / hide the dropdown 
dropdownBtn.addEventListener("click", () => {

  // Clear the list before rendering new items
  guestListUL.innerHTML = "";

  // Display names from contacts.guestnames
  contacts.guestnames.forEach((name) => {
  const li = document.createElement("li");

  li.textContent = name;
  li.classList.add("cursor-pointer", "hover:bg-gray-100", "px-4", "py-2");

  li.addEventListener("click", (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    // Hide the dropdown menu
    dropdown.classList.add("hidden");

    // If the name is already selected — do not add it again
    if (entered_guestlist.includes(name))
      return;

    // Add the name to the temporary array
    entered_guestlist.push(name);

    // Add a tag with the name
    const tag = document.createElement("span");
    tag.className =
      "inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded";
    tag.innerHTML = `
        ${name}
        <button type="button" class="ms-2 text-blue-400 hover:text-blue-900" aria-label="Remove">
          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"/>
          </svg>
        </button>
      `;

      // Remove tag handler
      tag.querySelector("button").addEventListener("click", () => {
        selectedGuestsContainer.removeChild(tag);
        entered_guestlist = entered_guestlist.filter((n) => n !== name);
      });

      selectedGuestsContainer.appendChild(tag);
    });

    guestListUL.appendChild(li);
  });

  // Toggle the dropdown visibility
  dropdown.classList.toggle("hidden");
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

// [submit of events] add a click event for the submit button of the events table:
/* 
 on the click event:
   - use the temporary array to constract a string joined with commas (this is to be used to add to new <tr> with the insertAdjacentHTMl).
   - generate random hash using a hashing algorithm and a random number, you are hashing the number (this is also to be used to add to the new <tr>).
   - get(obtain) the Datepicker value and use it for adding to the new <tr>
   
   - now add the <tr> with the values
   - create a new object with all of the values and store it inside the events array, you can also use an inline object and this means that the objec doesn't require a variable
   
   - clear the inputs (date picker, visible tags, the temporary array)
*/

  // Add event listener for the submit button of events
  document.getElementById("submit_event").addEventListener("click", (e) => {
    e.preventDefault();

    // Validate and construct data from entered_guestlist
    if (entered_guestlist.length === 0) {
      alert("Please select at least one guest.");
      return;
    }
    const guestListString = entered_guestlist.join(", ");

    // Generate a random hash
    const randomNum = Math.floor(Math.random() * 1e6);
    const hash = btoa(randomNum.toString()).slice(0, 8);

    // Get the date from the datepicker
    const dateInput = document.getElementById("time").value;
    if (!dateInput) {
      alert("Please select a date.");
      return;
    }

    // Add a new row to the events table
    const tbody = document.querySelector("#events-table tbody");
    const newId = tbody.rows.length + 1;
    const newRowHTML = `
      <tr>
        <td>${newId}</td>
        <td>${guestListString}</td>
        <td>${dateInput}</td>
        <td>${hash}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", newRowHTML);

    // Refresh the DataTable
    if (typeof eventTable !== "undefined") {
      eventTable.refresh();
    }

    // Add the object to the events array
    events.push({
      id: newId,
      guestlist: [...entered_guestlist],
      date: dateInput,
      hash: hash,
    });

    // Clear the form and the temporary array
    document.getElementById("time").value = "";
    entered_guestlist = [];
    selectedGuestsContainer.innerHTML = "";
  });

});