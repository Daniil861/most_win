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
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".game")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    } else {
        sessionStorage.setItem("money", 500);
        document.querySelector(".check").textContent = 500;
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    let level_bet = document.querySelector(".game__text_bet");
    let move_timer;
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".game__button")) {
            check_level_game();
            draw_stones();
            move_stone_random();
            document.querySelector(".game__levels").classList.add("_hold");
            document.querySelector(".game__buttons").classList.remove("_hold");
            document.querySelector(".game__button").classList.add("_hold");
        }
    }));
    document.addEventListener("touchstart", (e => {
        let targetElement = e.target;
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
    document.addEventListener("touchend", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".game__arrow_left")) clearInterval(move_timer);
        if (targetElement.closest(".game__arrow_top")) clearInterval(move_timer);
        if (targetElement.closest(".game__arrow_right")) clearInterval(move_timer);
        if (targetElement.closest(".game__arrow_bottom")) clearInterval(move_timer);
    }));
    function add_class(class_name, block) {
        document.querySelectorAll(block).forEach((el => {
            el.addEventListener("click", (() => {
                document.querySelectorAll(block).forEach((el => {
                    if (el.classList.contains(class_name)) el.classList.remove(class_name);
                }));
                el.classList.add(class_name);
                check_level_game();
                draw_bet();
            }));
        }));
    }
    function draw_bet() {
        let num = sessionStorage.getItem("level");
        if (1 == num) level_bet.textContent = 50; else if (2 == num) level_bet.textContent = 100; else if (3 == num) level_bet.textContent = 150; else if (4 == num) level_bet.textContent = 200; else if (5 == num) level_bet.textContent = 250; else if (6 == num) level_bet.textContent = 300; else if (7 == num) level_bet.textContent = 350;
    }
    if (document.querySelector(".game")) add_class("_active", ".game__level");
    function check_level_game() {
        let num;
        document.querySelectorAll(".game__level").forEach((el => {
            if (el.classList.contains("_active")) num = el.dataset.level;
        }));
        sessionStorage.setItem("level", num);
    }
    const grid = document.querySelector(".box-field__field");
    const width = 20;
    let layout;
    layout = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1 ];
    const squares = [];
    function create_board() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);
            if (1 == layout[i]) squares[i].classList.add("wall-trp"); else if (2 == layout[i]) squares[i].classList.add("wall"); else if (3 == layout[i]) squares[i].classList.add("empty"); else if (4 == layout[i]) squares[i].classList.add("stairs"); else if (5 == layout[i]) squares[i].classList.add("one-floor"); else if (6 == layout[i]) squares[i].classList.add("two-floor"); else if (7 == layout[i]) squares[i].classList.add("three-floor"); else if (8 == layout[i]) squares[i].classList.add("four-floor"); else if (9 == layout[i]) squares[i].classList.add("five-floor");
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
    function move_left() {
        remove_hero();
        if (!squares[heroCurrentIndex - 1].classList.contains("wall-trp") && !squares[heroCurrentIndex - 1].classList.contains("wall") && !squares[heroCurrentIndex - 1].classList.contains("stone")) heroCurrentIndex -= 1;
        squares[heroCurrentIndex].classList.add("hero");
        check_empty();
    }
    function move_right() {
        remove_hero();
        if (!squares[heroCurrentIndex + 1].classList.contains("wall-trp") && !squares[heroCurrentIndex + 1].classList.contains("wall") && !squares[heroCurrentIndex + 1].classList.contains("stone")) heroCurrentIndex += 1;
        squares[heroCurrentIndex].classList.add("hero");
        check_empty();
    }
    function move_up() {
        remove_hero();
        if (squares[heroCurrentIndex - width].classList.contains("stairs")) heroCurrentIndex -= 2 * width;
        squares[heroCurrentIndex].classList.add("hero");
    }
    function move_down() {
        remove_hero();
        if (squares[heroCurrentIndex + width].classList.contains("stairs")) heroCurrentIndex += 2 * width;
        squares[heroCurrentIndex].classList.add("hero");
    }
    function check_empty() {
        if (squares[heroCurrentIndex + width].classList.contains("empty")) {
            remove_hero();
            heroCurrentIndex += 2 * width;
            squares[heroCurrentIndex].classList.add("hero");
        }
    }
    function move_hero_left() {
        move_left();
        move_timer = setInterval((() => {
            move_left();
            check_game_over();
        }), 250);
    }
    function move_hero_up() {
        move_up();
        check_win();
        move_timer = setInterval((() => {
            move_up();
            check_game_over();
        }), 250);
    }
    function move_hero_right() {
        move_right();
        move_timer = setInterval((() => {
            move_right();
            check_game_over();
        }), 250);
    }
    function move_hero_down() {
        move_down();
        move_timer = setInterval((() => {
            move_down();
            check_game_over();
        }), 250);
    }
    class Stone {
        constructor(startIndex, startRotate, speed) {
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.startRotate = 0;
            this.currentRotate = startRotate;
        }
    }
    let stones;
    function draw_stones() {
        if (1 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, 300) ]; else if (2 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, 250), new Stone(111, 0, 300) ]; else if (3 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, 250), new Stone(111, 0, 300), new Stone(148, 0, 400) ]; else if (4 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, 450), new Stone(111, 0, 400), new Stone(148, 0, 300), new Stone(182, 0, 400) ]; else if (5 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, 500), new Stone(111, 0, 350), new Stone(148, 0, 300), new Stone(182, 0, 350), new Stone(75, 0, 400) ]; else if (6 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, 500), new Stone(111, 0, 400), new Stone(148, 0, 300), new Stone(182, 0, 350), new Stone(75, 0, 400), new Stone(105, 0, 400) ]; else if (7 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, 300), new Stone(111, 0, 450), new Stone(148, 0, 400), new Stone(182, 0, 350), new Stone(75, 0, 350), new Stone(105, 0, 350), new Stone(145, 0, 250) ];
        stones.forEach((el => {
            squares[el.currentIndex].classList.add("stone");
        }));
    }
    function move_stone_random() {
        setTimeout((() => {
            stones.forEach((el => move_stone(el)));
        }), random_num(2500, 4e3));
    }
    function move_stone(stone) {
        const directions = [ -1, +1 ];
        let direction = directions[Math.floor(Math.random() * (directions.length - 0) + 0)];
        stone.timerId = setInterval((function() {
            document.querySelectorAll(".box-field__field div").forEach((el => {
                el.style.transform = `rotate(0deg)`;
            }));
            if (-1 == direction) stone.currentRotate -= 20; else stone.currentRotate += 20;
            document.querySelectorAll(".stone").forEach((el => {
                el.style.transform = `rotate(${stone.currentRotate}deg)`;
            }));
            if (!squares[stone.currentIndex + direction].classList.contains("wall") && !squares[stone.currentIndex + direction].classList.contains("wall-trp") && !squares[stone.currentIndex + direction].classList.contains("stone")) {
                squares[stone.currentIndex].classList.remove("stone");
                let current_direction = direction;
                stone.currentIndex += current_direction;
                squares[stone.currentIndex].classList.add("stone");
            } else direction = directions[Math.floor(Math.random() * (directions.length - 0) + 0)];
            if (squares[stone.currentIndex + width].classList.contains("empty")) {
                squares[stone.currentIndex].classList.remove("stone");
                stone.currentIndex += 2 * width;
                squares[stone.currentIndex].classList.add("stone");
            }
            check_game_over();
        }), stone.speed);
    }
    function check_game_over() {
        if (squares[heroCurrentIndex].classList.contains("stone")) {
            stones.forEach((el => clearInterval(el.timerId)));
            clearInterval(move_timer);
            document.querySelector(".game__buttons").classList.add("_hold");
            document.querySelector(".play").classList.add("_active");
            if (squares[heroCurrentIndex].classList.contains("one-floor")) sessionStorage.setItem("floor", 1); else if (squares[heroCurrentIndex].classList.contains("two-floor")) sessionStorage.setItem("floor", 2); else if (squares[heroCurrentIndex].classList.contains("three-floor")) sessionStorage.setItem("floor", 3); else if (squares[heroCurrentIndex].classList.contains("four-floor")) sessionStorage.setItem("floor", 4); else if (squares[heroCurrentIndex].classList.contains("five-floor")) sessionStorage.setItem("floor", 5);
            check_level_and_floor();
        }
    }
    function check_level_and_floor() {
        let floor = sessionStorage.getItem("floor");
        let level = sessionStorage.getItem("level");
        let current_bank = +sessionStorage.getItem("money");
        let bet = 0;
        if (1 == level) bet = 50; else if (2 == level) bet = 100; else if (3 == level) bet = 150; else if (4 == level) bet = 200; else if (5 == level) bet = 250; else if (6 == level) bet = 300; else if (7 == level) bet = 350;
        sessionStorage.setItem("money", current_bank + floor * bet);
    }
    function random_num(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function check_win() {
        if (24 == heroCurrentIndex) {
            document.querySelector(".game__buttons").classList.add("_hold");
            document.querySelector(".play").classList.add("_active");
            check_level_and_floor();
        }
    }
    window["FLS"] = true;
    isWebp();
})();