(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();



const taxSwitch=document.getElementById("flexSwitchCheckDefault")
taxSwitch.addEventListener("click",()=>{
  let taxInfos = document.querySelectorAll("#tax-info"); // all elements with class tax-info
  taxInfos.forEach(info => {
    if (info.style.display !== "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  });

})
