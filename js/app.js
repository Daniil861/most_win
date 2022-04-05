(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    let move_timer;
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".game__arrow_left")) {
            clearInterval(move_timer);
            move_hero_left();
        }
        if (targetElement.closest(".game__arrow_top")) {
            clearInterval(move_timer);
            move_hero_up();
        }
        if (targetElement.closest(".game__arrow_right")) {
            clearInterval(move_timer);
            move_hero_right();
        }
        if (targetElement.closest(".game__arrow_bottom")) {
            clearInterval(move_timer);
            move_hero_down();
        }
    }));
    const grid = document.querySelector(".box-field__field");
    const width = 20;
    const height = 11;
    let layout;
    layout = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1 ];
    const squares = [];
    function create_board() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);
            if (1 == layout[i]) squares[i].classList.add("wall-trp"); else if (2 == layout[i]) squares[i].classList.add("wall"); else if (3 == layout[i]) squares[i].classList.add("empty");
        }
    }
    let heroCurrentIndex = 190;
    if (document.querySelector(".game")) {
        create_board();
        squares[heroCurrentIndex].classList.add("hero");
    }
    function remove_hero() {
        squares[heroCurrentIndex].classList.remove("hero");
    }
    function move_hero_left() {
        remove_hero();
        if (!squares[heroCurrentIndex - 1].classList.contains("wall-trp") && !squares[heroCurrentIndex - 1].classList.contains("wall") && !squares[heroCurrentIndex - 1].classList.contains("stone")) heroCurrentIndex -= 1;
        squares[heroCurrentIndex].classList.add("hero");
    }
    function move_hero_up() {
        remove_hero();
        if (heroCurrentIndex - width >= 0 && !squares[heroCurrentIndex - width].classList.contains("wall-trp") && !squares[heroCurrentIndex - width].classList.contains("wall") && !squares[heroCurrentIndex - width].classList.contains("stone") && !squares[heroCurrentIndex - width].classList.contains("empty")) heroCurrentIndex -= width;
        squares[heroCurrentIndex].classList.add("hero");
    }
    function move_hero_right() {
        remove_hero();
        if (!squares[heroCurrentIndex + 1].classList.contains("wall-trp") && !squares[heroCurrentIndex + 1].classList.contains("wall") && !squares[heroCurrentIndex + 1].classList.contains("stone")) heroCurrentIndex += 1;
        if (squares[heroCurrentIndex - width + 2].classList.contains("empty")) heroCurrentIndex += 2 * width;
        squares[heroCurrentIndex].classList.add("hero");
    }
    function move_hero_down() {
        remove_hero();
        if (heroCurrentIndex + width < width * height && !squares[heroCurrentIndex + width].classList.contains("wall-trp") && !squares[heroCurrentIndex + width].classList.contains("stone") && !squares[heroCurrentIndex + width].classList.contains("empty")) heroCurrentIndex += width;
        squares[heroCurrentIndex].classList.add("hero");
    }
    window["FLS"] = true;
    isWebp();
})();