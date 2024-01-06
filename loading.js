function showLoading() {
    // alert('funciona')
    const div = document.createElement("div");
    div.classList.add("loading", "centralize");
    
    const label = document.createElement("label");
    label.innerHTML = "Carregando...";

    div.appendChild(label);
    
    document.body.appendChild(div);

    setTimeout(() => hideLoading(), 2000)
    
}

function hideLoading() {
    // alert("heheh")
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}