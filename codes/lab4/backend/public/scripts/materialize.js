//fix Materialize drop-down bug
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('select');
   var instances = M.FormSelect.init(elems);
});

