document.addEventListener("DOMContentLoaded", function () {
    var stream = document.querySelector(".slider-stream");

    fetch('gema.json')
        .then(response => response.json())
        .then(data => {
            data.Noticias.forEach(noticia => {
                var element = document.createElement('div');
                element.classList.add('slider-item');
                element.innerHTML = '<div class="card">' +
                    '<div class="card-image" style="background-image: url(\'' + noticia.imagem + '\')">' +
                    '</div>' +
                    '<div class="card-title">' +
                    '<h3>' + noticia.titulo + '</h3>' +
                    '</div>' +
                    '</div>';
                stream.appendChild(element);
            });

            var items = document.querySelectorAll(".slider-item");
            if (items.length <= 3) {
                items.forEach((item) => {
                    stream.appendChild(item.cloneNode(true));
                });
                items = document.querySelectorAll(".slider-item");
            }
            if (items[2]) {
                items[2].classList.add('current');
            }

            var prev = document.querySelector(".slider-prev");
            var next = document.querySelector(".slider-next");

            if (prev) {
                prev.addEventListener("click", function () {
                    stream.insertBefore(items[items.length - 1], items[0]);
                    items.forEach(item => {
                        item.classList.remove('current');
                    });
                    if (items[1]) {
                        items[1].classList.add('current');
                    }
                    items = document.querySelectorAll(".slider-item");
                });
            }

            if (next) {
                next.addEventListener("click", function () {
                    stream.appendChild(items[0]);
                    items.forEach(item => {
                        item.classList.remove('current');
                    });
                    if (items[3]) {
                        items[3].classList.add('current');
                    }
                    items = document.querySelectorAll(".slider-item");
                });
            }
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
    fetch('gema.json')
        .then(response => response.json())
        .then(data => {
            data.campeonatos.forEach(campeonato => {
                var element = document.createElement('div');
                element.classList.add('card-medalhas');
                element.innerHTML = '<div class="card-image-medalhas">' +
                    '<img src="' + campeonato.imagem + '" alt="">' +
                    '</div>' +
                    '<div class="medalhas">' +
                    '<div class="medalha"><img src="./image/ouro.png" alt=""><p>' + campeonato.medalhas.ouro.total + '</p></div>' +
                    '<div class="medalha"><img src="./image/prata.png" alt=""><p>' + campeonato.medalhas.prata.total + '</p></div>' +
                    '<div class="medalha"><img src="./image/bronze.png" alt=""><p>' + campeonato.medalhas.bronze.total + '</p></div>' +
                    '</div>' +
                    '<div class="card-title-medalhas">' + campeonato.nomeCompleto + '</div>' +
                    '<div class="btn btn-amarelo modal-open" data-modal="' + campeonato.nome + '">Ver mais</div>';
                document.querySelector('.row-medalhas').appendChild(element);
                element.querySelector('.modal-open').addEventListener('click', function () {
                    var modal = document.querySelector('.modal');
                    var overlayModal = document.getElementById('overlayModal');
                    var campeonatoSelect = data.campeonatos.find(c => c.nome == this.getAttribute('data-modal'));
                    modal.innerHTML = ' <div class="modal-header">' +
                        '<div class="modal-img-title">' +
                        '<img src="' + campeonatoSelect.imagem + '" alt="">' +
                        '<p>' + campeonatoSelect.nomeCompleto + '</p>' +
                        '</div>' +
                        '<div class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></div>' +
                        '</div>' +
                        '<div class="modal-body"></div>';
                    var modalBody = modal.querySelector('.modal-body');
                    for (let ano in campeonatoSelect.anos) {
                        var element = document.createElement('div');
                        element.classList.add('medalha-ano');
                        element.innerHTML = '<p class="ano">' + ano + '</p>';
                        campeonatoSelect.anos[ano].forEach(medalha => {
                            var conjuntoMedalhas = document.createElement('div');
                            conjuntoMedalhas.classList.add('conjunto-medalha');
                            conjuntoMedalhas.innerHTML = '<p class="classificacao">' + medalha.posicao + '</p>' +
                                '<div>' +
                                '<img src="./image/' + medalha.medalha + '.png" alt="">' +
                                '<p class="nome">' + medalha.nome + '</p>' +
                                '</div>';
                            element.appendChild(conjuntoMedalhas);
                        });
                        modalBody.prepend(element);
                    }
                    modal.classList.add('active');
                    overlayModal.classList.add('active');
                });
            })

        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
    var overlayModal = document.getElementById('overlayModal');
    if (overlayModal) {
        overlayModal.addEventListener('click', function () {
            closeModal();
        });
    }
});

function closeModal() {
    var modal = document.querySelector('.modal');
    var overlayModal = document.getElementById('overlayModal');
    modal.classList.remove('active');
    setTimeout(() => {
        overlayModal.classList.remove('active');
    }, 300);

}

function showMenu() {
    var overlay = document.querySelector('.overlay-back');
    var menu = document.querySelector('.nav-menu-mobile');
    overlay.classList.add('active');
    menu.classList.add('active');
}

function closeMenu() {
    var overlay = document.querySelector('.overlay-back');
    var menu = document.querySelector('.nav-menu-mobile');
    overlay.classList.remove('active');
    menu.classList.remove('active');
}
