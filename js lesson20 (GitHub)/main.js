
if (document.getElementById("guests-table") && typeof simpleDatatables.DataTable !== 'undefined') {
    const dataTable = new simpleDatatables.DataTable("#guests-table", {
        searchable: false,
        perPageSelect: false
    });
}
if (document.getElementById("events-table") && typeof simpleDatatables.DataTable !== 'undefined') {
    const dataTable = new simpleDatatables.DataTable("#events-table", {
        searchable: false,
        perPageSelect: false
    });
}
document.getElementById('new_guest_name').addEventListener('click', () => {
    document.body.appendChild(newElm1);
});


document.getElementById('id').addEventListener('click', () => {
    toNewId();
});

//toNewId(){
//    this.index = (this.index + 1);
//};