let guestTable, eventTable;

if (document.getElementById("guests-table") && typeof simpleDatatables.DataTable !== 'undefined') {
    guestTable = new simpleDatatables.DataTable("#guests-table", {
        searchable: false,
        perPageSelect: false
    });
}

if (document.getElementById("events-table") && typeof simpleDatatables.DataTable !== 'undefined') {
    eventTable = new simpleDatatables.DataTable("#events-table", {
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

document.getElementById("add_new_guest").addEventListener('click', function() {
    const name =  document.getElementById("new_guest_name").value.trim();
   
    if (!name) { 
        alert('Enter name');
        return;
    }

    //Get the current number of rows (excluding the header)"
    const currentRowsCount = document.querySelectorAll("#guests-table tbody tr").length;
    const newId = currentRowsCount + 1;

    //Add a row to the table by hand (manually)
    const tbody = document.querySelector("#guests-table tbody");

    tbody.insertAdjacentHTML('beforeend', /*html*/` <tr>
     <td>${newId}</td><td>${name}</td>
    </tr>`)
   
    // add to contacts array / guestName.contacts
    contacts.guestnames.push(name)
  //  guestnames.push(name)

    //Update the table
    guestTable.refresh();

    //Clear the field
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


