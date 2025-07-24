
if (document.getElementById("default-table") && typeof simpleDatatables.DataTable !== 'undefined') {Add commentMore actions
    const dataTable = new simpleDatatables.DataTable("#default-table", {
        searchable: false,
        perPageSelect: false
    });
}