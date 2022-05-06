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
        if (document.querySelector(".game") || document.querySelector(".game-2")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".game") || document.querySelector(".game-2")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const pause_button = document.querySelector(".icon-pause");
    const pause_item = document.querySelector(".pause");
    let level_bet = document.querySelector(".game__text_bet");
    let current_win_block = document.querySelector(".game__current-count");
    let move_timer;
    if (document.querySelector(".main")) {
        if (!sessionStorage.getItem("current-hero")) sessionStorage.setItem("current-hero", 1);
        check_hero_color_button(+sessionStorage.getItem("current-hero"));
        create_hero(+sessionStorage.getItem("current-hero"));
    }
    if (document.querySelector(".main") && sessionStorage.getItem("hero-2")) check_hero_color_button(2);
    if (document.querySelector(".main") && sessionStorage.getItem("hero-3")) check_hero_color_button(3);
    function create_hero(number_hero) {
        if (document.querySelector(".characters__current-hero img")) {
            document.querySelector(".characters__current-hero img").style.opacity = "0";
            setTimeout((() => {
                document.querySelector(".characters__current-hero img").remove();
            }), 300);
        }
        let hero = document.createElement("img");
        if (document.documentElement.classList.contains("webp")) hero.setAttribute("src", `img/icons/hero-${number_hero}.webp`); else hero.setAttribute("src", `img/icons/hero-${number_hero}.png`);
        hero.setAttribute("alt", `Image`);
        setTimeout((() => {
            document.querySelector(".characters__current-hero").append(hero);
            hero.style.opacity = "0";
            setTimeout((() => {
                hero.style.opacity = "1";
            }), 10);
        }), 310);
    }
    function change_color_button(block) {
        if (block && block.classList.contains("button_yellow")) {
            block.classList.remove("button_yellow");
            document.querySelectorAll(".characters__button").forEach((el => {
                if (el.classList.contains("button_green")) {
                    el.classList.remove("button_green");
                    el.classList.add("button_yellow");
                }
            }));
            block.classList.add("button_green");
        }
    }
    function check_hero_color_button(number) {
        document.querySelector(`.characters__button_${number}`).classList.remove("button_gray");
        if (+sessionStorage.getItem("current-hero") == number) document.querySelector(`.characters__button_${number}`).classList.add("button_green"); else document.querySelector(`.characters__button_${number}`).classList.add("button_yellow");
        document.querySelectorAll(`.characters__button_${number} span`).forEach(((el, i) => {
            if (1 == i) el.textContent = "Choose";
        }));
    }
    if (document.querySelector(".game-2")) {
        create_hero_game_2();
        sessionStorage.setItem("timer", 1);
        sessionStorage.setItem("current-time-dificult", 1);
        sessionStorage.setItem("lifes", 4);
    }
    const config = {
        start_coord_x: 0,
        start_coord_y: 0,
        currentPosition: [ 300, 5 ],
        hero_speed: 5,
        hero_width: 100,
        window_width: document.documentElement.clientWidth,
        window_height: document.documentElement.clientHeight,
        timerCl: false,
        timerId: false,
        timerIdBonus: false
    };
    const config_circle = {
        last_rotate: 0,
        game_prize: "",
        count_win: 0
    };
    if (1 == +sessionStorage.getItem("current-hero")) config.hero_speed = 3; else if (2 == +sessionStorage.getItem("current-hero")) config.hero_speed = 5; else if (3 == +sessionStorage.getItem("current-hero")) config.hero_speed = 7;
    function create_hero_game_2() {
        let number = +sessionStorage.getItem("current-hero");
        let hero = document.createElement("img");
        if (document.documentElement.classList.contains("webp")) hero.setAttribute("src", `img/icons/hero-${number}.webp`); else hero.setAttribute("src", `img/icons/hero-${number}.png`);
        hero.setAttribute("alt", `Image`);
        document.querySelector(".footer__hero").append(hero);
    }
    function move_hero_game_2() {
        document.querySelector(".footer__hero").style.left = `${config.currentPosition[0]}px`;
    }
    function rotate_hero_left() {
        document.querySelector(".footer__hero").style.transform = "rotateY(-30deg)";
    }
    function rotate_hero_right() {
        document.querySelector(".footer__hero").style.transform = "rotateY(30deg)";
    }
    function clear_rotate_hero() {
        document.querySelector(".footer__hero").style.transform = "rotateY(0deg)";
    }
    function move_timer_game_2() {
        let minute = document.querySelector(".time-header__minute");
        let second = document.querySelector(".time-header__sec");
        config.timerId = setInterval((() => {
            if (+second.innerHTML > 59) {
                let sec = +second.innerHTML;
                let min = +minute.innerHTML + 1;
                let num = sec - 59;
                if (num < 10) num = `0${num}`;
                minute.textContent = min;
                second.textContent = num;
            }
            let current_sec = 0;
            if ("00" == second.innerHTML) current_sec = 59; else current_sec = +second.innerHTML - 1;
            if (current_sec < 10) current_sec = `0${current_sec}`;
            if (0 == current_sec) current_sec = "00";
            if (current_sec < 0) current_sec = 59;
            second.textContent = current_sec;
            if (59 == current_sec && +minute.innerHTML > 0) minute.textContent = +minute.innerHTML - 1; else if ("00" == current_sec && 0 == +minute.innerHTML) {
                clearInterval(config.timerId);
                sessionStorage.setItem("timer", 0);
                create_hero_timer();
                setTimeout((() => {
                    document.querySelector(".timer").classList.add("_active");
                }), 500);
            }
            if (+minute.innerHTML >= 1 && current_sec > 1) sessionStorage.setItem("current-time-dificult", 1); else if (1 == +minute.innerHTML && "00" == current_sec) sessionStorage.setItem("current-time-dificult", 2); else if (0 == +minute.innerHTML && current_sec <= 30) sessionStorage.setItem("current-time-dificult", 3);
        }), 1e3);
    }
    function check_lifes() {
        let lifes = +sessionStorage.getItem("lifes");
        let array = document.querySelectorAll(".header-game-2__hearts img");
        if (lifes < 4) {
            for (let i = 0; i < 4; i++) array[i].classList.add("_hide");
            for (let i = 0; i < lifes; i++) array[i].classList.remove("_hide");
        } else if (4 == lifes) for (let i = 0; i < 4; i++) array[i].classList.remove("_hide");
    }
    function add_bonus_lifes(num) {
        if (1 == num && +sessionStorage.getItem("lifes") < 4) sessionStorage.setItem("lifes", +sessionStorage.getItem("lifes") + num); else if (2 == num && 3 == +sessionStorage.getItem("lifes")) sessionStorage.setItem("lifes", +sessionStorage.getItem("lifes") + 1); else if (2 == num && (2 == +sessionStorage.getItem("lifes") || 1 == +sessionStorage.getItem("lifes"))) sessionStorage.setItem("lifes", +sessionStorage.getItem("lifes") + 2);
    }
    function create_bonus() {
        let images_arr = [];
        let bonus_speed = 0;
        let rand_num = 0;
        let rand_rotate = random_num(0, 360);
        if (1 == +sessionStorage.getItem("current-time-dificult")) {
            images_arr = [ "bomb", "bomb", "bomb", "bottle", "bottle", "box", "cent", "cent", "cent", "lighting" ];
            bonus_speed = random_num(30, 100);
            rand_num = random_num(0, 10);
        } else if (2 == +sessionStorage.getItem("current-time-dificult")) {
            images_arr = [ "bomb", "bomb", "bomb", "bottle", "box", "cent", "lighting" ];
            bonus_speed = random_num(30, 50);
            rand_num = random_num(0, 7);
        } else if (3 == +sessionStorage.getItem("current-time-dificult")) {
            images_arr = [ "bomb", "bomb", "bomb", "bomb", "bomb", "bomb", "bottle", "box", "cent", "lighting" ];
            bonus_speed = random_num(15, 40);
            rand_num = random_num(0, 10);
        }
        let num_height = +config.window_width - 50;
        let start_position = random_num(20, num_height);
        let bonus = document.createElement("div");
        bonus.classList.add("field__bonus");
        bonus.dataset.value = images_arr[rand_num];
        let image = document.createElement("img");
        image.setAttribute("src", `img/icons/${images_arr[rand_num]}.png`);
        image.setAttribute("alt", `Image`);
        image.style.transform = `rotate(${rand_rotate}deg)`;
        bonus.append(image);
        bonus.style.left = `${start_position}px`;
        document.querySelector(".field__body").append(bonus);
        let timerId = false;
        let top_position = -40;
        timerId = setInterval((() => {
            top_position += 5;
            bonus.style.top = `${top_position}px`;
            if (top_position > config.window_height + 40) {
                clearInterval(timerId);
                bonus.remove();
            }
        }), bonus_speed);
    }
    function generate_bonuses() {
        config.timerIdBonus = setInterval((() => {
            create_bonus();
            if (0 == +sessionStorage.getItem("timer")) clearInterval(config.timerIdBonus);
        }), 700);
    }
    function clear_intervals() {
        clearInterval(config.timerId);
        clearInterval(config.timerIdBonus);
        clearInterval(config.timerCl);
    }
    function start_game_2() {
        move_timer_game_2();
        generate_bonuses();
        config.timerCl = setInterval((() => {
            check_collision_game_2();
        }), 100);
    }
    function check_collision_game_2() {
        let pos_x = config.currentPosition[0];
        let pos_y = config.currentPosition[1];
        document.querySelectorAll(".field__bonus").forEach((el => {
            let style = window.getComputedStyle(el);
            let coord_left = parseInt(style.left, 10);
            let coord_top = parseInt(style.top, 10);
            if (pos_x + 100 > coord_left && pos_y < coord_top + 150 && pos_x < coord_left + 40 && pos_y < coord_top + 150 && !el.classList.contains("_anim")) {
                check_bonus_value(el);
                check_lifes();
                el.classList.add("_anim");
                setTimeout((() => {
                    el.remove();
                }), 500);
            } else if (coord_top >= config.window_height - 120) el.remove();
        }));
    }
    function check_bonus_value(block) {
        if ("bomb" == block.dataset.value) {
            document.querySelector(".footer__hero").classList.add("_target");
            setTimeout((() => {
                document.querySelector(".footer__hero").classList.remove("_target");
            }), 1200);
            if (+sessionStorage.getItem("lifes") <= 1) {
                clear_intervals();
                setTimeout((() => {
                    document.querySelector(".game-over").classList.add("_active");
                    document.querySelectorAll(".field__bonus").forEach((el => el.style.opacity = "0"));
                }), 500);
            }
            sessionStorage.setItem("lifes", +sessionStorage.getItem("lifes") - 1);
        } else if ("bottle" == block.dataset.value) {
            if (+sessionStorage.getItem("lifes") < 4) add_bonus_lifes(1);
        } else if ("box" == block.dataset.value) {
            clear_intervals();
            setTimeout((() => {
                document.querySelector(".bonus-box").classList.add("_active");
                document.querySelectorAll(".field__bonus").forEach((el => el.style.opacity = "0"));
            }), 500);
        } else if ("cent" == block.dataset.value) add_money(10, ".check", 1e3, 2e3); else if ("lighting" == block.dataset.value) {
            document.querySelector(".time-header__sec").textContent = +document.querySelector(".time-header__sec").innerHTML + 10;
            document.querySelector(".time-header__time").classList.add("_anim");
            setTimeout((() => {
                document.querySelector(".time-header__time").classList.remove("_anim");
            }), 1e3);
        }
    }
    function create_hero_timer() {
        let number = +sessionStorage.getItem("current-hero");
        let hero = document.createElement("img");
        if (document.documentElement.classList.contains("webp")) hero.setAttribute("src", `img/icons/hero-${number}.webp`); else hero.setAttribute("src", `img/icons/hero-${number}.png`);
        hero.setAttribute("alt", `Image`);
        document.querySelector(".timer__image_hero").append(hero);
    }
    function rotate_drum() {
        config_circle.last_rotate += random_num(100, 2e3);
        document.querySelector(".circle__image").style.transform = `rotate(${config_circle.last_rotate}deg)`;
    }
    function get_target_block() {
        let arrow_top = document.querySelector(".circle__dot").getBoundingClientRect().top;
        let arrow_left = document.querySelector(".circle__dot").getBoundingClientRect().left;
        let dot = document.createElement("div");
        dot.style.width = `5px`;
        dot.style.height = `5px`;
        dot.style.position = `fixed`;
        dot.style.zIndex = `10`;
        dot.style.top = `${arrow_top}px`;
        dot.style.left = `${arrow_left}px`;
        document.querySelector(".wrapper").append(dot);
        let arrow_top2 = dot.getBoundingClientRect().top + 6;
        let arrow_left2 = dot.getBoundingClientRect().left - 6;
        let target_block2 = document.elementFromPoint(arrow_left2, arrow_top2);
        setTimeout((() => {
            dot.remove();
        }), 1e3);
        return target_block2;
    }
    function check_target_item(block) {
        let value = block.dataset.circle;
        create_image_bonus_box(value);
        if (0 == value) document.querySelector(".prize__text-value").textContent = "zero"; else if ("heart-2" == value) {
            document.querySelector(".prize__text-value").textContent = "+2 HP";
            add_bonus_lifes(2);
            check_lifes();
        } else if ("prize" == value) document.querySelector(".prize__text-value").textContent = "a new character!"; else if ("money-2" == value) {
            document.querySelector(".prize__text-value").textContent = "+20 coins";
            add_money(20, ".check", 500, 1500);
        } else if ("heart" == value) {
            document.querySelector(".prize__text-value").textContent = "+1 HP";
            add_bonus_lifes(1);
            check_lifes();
        } else if ("money" == value) {
            document.querySelector(".prize__text-value").textContent = "+10 coins";
            add_money(10, ".check", 500, 1500);
        } else if ("lighting" == value) {
            document.querySelector(".prize__text-value").textContent = "+10 seconds";
            document.querySelector(".time-header__sec").textContent = +document.querySelector(".time-header__sec").innerHTML + 10;
            document.querySelector(".time-header__time").classList.add("_anim");
            setTimeout((() => {
                document.querySelector(".time-header__time").classList.remove("_anim");
            }), 1e3);
        }
        document.querySelector(".bonus-box__value").classList.add("_hide");
        setTimeout((() => {
            document.querySelector(".prize").classList.remove("_hide");
        }), 300);
    }
    function create_image_bonus_box(value) {
        let image = document.createElement("img");
        if (0 == value) image.setAttribute("src", `img/icons/zero.png`); else if ("heart-2" == value || "heart" == value) image.setAttribute("src", `img/icons/heart-big.png`); else if ("prize" == value) {
            let number = generate_random_character();
            image.setAttribute("src", `img/icons/hero-${number}.png`);
        } else if ("money-2" == value || "money" == value) image.setAttribute("src", `img/icons/cent-big.png`); else if ("lighting" == value) image.setAttribute("src", `img/icons/lighting-big.png`);
        image.setAttribute("alt", `Image`);
        document.querySelector(".prize__image_2").append(image);
    }
    function generate_random_character() {
        if (!sessionStorage.getItem("hero-2")) {
            sessionStorage.setItem("hero-2", true);
            return 2;
        } else if (!sessionStorage.getItem("hero-3")) {
            sessionStorage.setItem("hero-3", true);
            return 3;
        } else return 1;
    }
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
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelector(block).classList.add("_delete-money");
            document.querySelector(block).textContent = sessionStorage.getItem("money");
        }), 500);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_delete-money");
        }), 1500);
    }
    function no_money(block) {
        document.querySelector(block).classList.add("_no-money");
        setTimeout((() => {
            document.querySelector(block).classList.remove("_no-money");
        }), 1e3);
    }
    function add_money(count, block, delay, delay_off) {
        setTimeout((() => {
            document.querySelector(block).textContent = +sessionStorage.getItem("money") + count;
            document.querySelector(block).classList.add("_anim");
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), delay);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_anim");
        }), delay_off);
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
    layout = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1 ];
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
        if (1 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, random_num(250, 400)) ]; else if (2 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, random_num(250, 400)), new Stone(111, 0, random_num(250, 400)) ]; else if (3 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, random_num(250, 400)), new Stone(111, 0, random_num(250, 400)), new Stone(148, 0, random_num(250, 400)) ]; else if (4 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, random_num(250, 400)), new Stone(111, 0, random_num(250, 400)), new Stone(148, 0, random_num(250, 400)), new Stone(182, 0, random_num(250, 400)) ]; else if (5 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, random_num(250, 500)), new Stone(111, 0, random_num(250, 500)), new Stone(148, 0, random_num(250, 500)), new Stone(182, 0, random_num(250, 500)), new Stone(75, 0, random_num(250, 500)) ]; else if (6 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, random_num(250, 500)), new Stone(111, 0, random_num(250, 500)), new Stone(148, 0, random_num(250, 500)), new Stone(182, 0, random_num(250, 500)), new Stone(75, 0, random_num(250, 500)), new Stone(105, 0, random_num(250, 500)) ]; else if (7 == sessionStorage.getItem("level")) stones = [ new Stone(67, 0, random_num(250, 500)), new Stone(111, 0, random_num(250, 500)), new Stone(148, 0, random_num(250, 500)), new Stone(182, 0, random_num(250, 500)), new Stone(75, 0, random_num(250, 500)), new Stone(105, 0, random_num(250, 500)), new Stone(145, 0, random_num(250, 500)) ];
        stones.forEach((el => {
            squares[el.currentIndex].classList.add("stone");
        }));
    }
    function move_stone_random(min, max) {
        setTimeout((() => {
            stones.forEach((el => move_stone(el)));
        }), random_num(min, max));
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
            check_level_and_floor();
            document.querySelector(".play").classList.add("_active");
        }
    }
    let floorId;
    function get_current_floor() {
        sessionStorage.getItem("floor");
        let bet = write_memory_current_bet();
        floorId = setInterval((() => {
            if (squares[heroCurrentIndex].classList.contains("one-floor")) sessionStorage.setItem("floor", 1); else if (squares[heroCurrentIndex].classList.contains("two-floor")) sessionStorage.setItem("floor", 2); else if (squares[heroCurrentIndex].classList.contains("three-floor")) sessionStorage.setItem("floor", 3); else if (squares[heroCurrentIndex].classList.contains("four-floor")) sessionStorage.setItem("floor", 4); else if (squares[heroCurrentIndex].classList.contains("five-floor")) sessionStorage.setItem("floor", 5);
            sessionStorage.setItem("current-win", +sessionStorage.getItem("floor") * bet);
            current_win_block.textContent = sessionStorage.getItem("current-win");
        }), 500);
    }
    function check_level_and_floor() {
        let floor = sessionStorage.getItem("floor");
        let current_bank = +sessionStorage.getItem("money");
        let bet = write_memory_current_bet();
        sessionStorage.setItem("money", current_bank + floor * bet);
        sessionStorage.setItem("current-win", floor * bet);
        document.querySelector(".play__text").textContent = sessionStorage.getItem("current-win");
        add_money_in_bank();
    }
    function write_memory_current_bet() {
        let level = sessionStorage.getItem("level");
        let bet = 0;
        if (1 == level) bet = 50; else if (2 == level) bet = 100; else if (3 == level) bet = 150; else if (4 == level) bet = 200; else if (5 == level) bet = 250; else if (6 == level) bet = 300; else if (7 == level) bet = 350;
        return bet;
    }
    function random_num(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money_in_bank() {
        setTimeout((() => {
            document.querySelector(".check").textContent = sessionStorage.getItem("money");
            document.querySelector(".check").classList.add("_anim");
            setTimeout((() => {
                document.querySelector(".check").classList.remove("_anim");
            }), 1e3);
        }), 500);
    }
    function check_win() {
        if (24 == heroCurrentIndex) {
            sessionStorage.setItem("floor", 5);
            document.querySelector(".game__buttons").classList.add("_hold");
            document.querySelector(".play").classList.add("_active");
            check_level_and_floor();
            add_money_in_bank();
        }
    }
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
            move_stone_random(100, 500);
            get_current_floor();
            document.querySelector(".game__levels").classList.add("_hold");
            document.querySelector(".game__buttons").classList.remove("_hold");
            document.querySelector(".game__button").classList.add("_hold");
            pause_button.classList.remove("_hold");
        }
        if (targetElement.closest(".icon-pause")) if (pause_button.classList.contains("_active")) {
            pause_button.classList.remove("_active");
            pause_item.classList.remove("_active");
            move_stone_random(10, 50);
        } else {
            pause_button.classList.add("_active");
            pause_item.classList.add("_active");
            stones.forEach((el => clearInterval(el.timerId)));
        }
        if (targetElement.closest(".pause__item_continue")) {
            pause_button.classList.remove("_active");
            pause_item.classList.remove("_active");
            move_stone_random(10, 50);
        }
        if (targetElement.closest(".characters__button_1")) {
            sessionStorage.setItem("current-hero", 1);
            create_hero(1);
            change_color_button(targetElement.closest(".characters__button_1"));
        }
        if (targetElement.closest(".characters__button_2") && sessionStorage.getItem("hero-2")) {
            sessionStorage.setItem("current-hero", 2);
            create_hero(2);
            change_color_button(targetElement.closest(".characters__button_2"));
        }
        if (targetElement.closest(".characters__button_3") && sessionStorage.getItem("hero-3")) {
            sessionStorage.setItem("current-hero", 3);
            create_hero(3);
            change_color_button(targetElement.closest(".characters__button_3"));
        }
        if (targetElement.closest(".timer__button_play")) {
            document.querySelector(".timer").classList.remove("_active");
            document.querySelector(".time-header__minute").textContent = 1;
            document.querySelector(".time-header__sec").textContent = 30;
            sessionStorage.setItem("timer", 1);
            sessionStorage.setItem("current-time-dificult", 1);
            move_timer_game_2();
        }
        if (targetElement.closest(".game-2__button-start")) {
            document.querySelector(".game-2__box-button-start").classList.add("_active");
            start_game_2();
        }
        if (targetElement.closest(".game-over__button_play")) if (+sessionStorage.getItem("money") >= 700 && document.querySelector(".game-over").classList.contains("_active")) {
            document.querySelector(".game-over").classList.remove("_active");
            sessionStorage.setItem("lifes", 1);
            delete_money(700, ".check");
            check_lifes();
            start_game_2();
        } else no_money(".check");
        if (targetElement.closest(".circle__image") || targetElement.closest(".circle__values")) {
            rotate_drum();
            document.querySelector(".circle__image").classList.add("_hold");
            setTimeout((() => {
                document.querySelector(".circle__image").classList.remove("_hold");
                setTimeout((() => {
                    let block = get_target_block();
                    check_target_item(block);
                }), 100);
            }), 2e3);
        }
        if (targetElement.closest(".prize__button")) {
            document.querySelector(".bonus-box").classList.remove("_active");
            setTimeout((() => {
                document.querySelector(".bonus-box__value").classList.remove("_hide");
                document.querySelector(".prize").classList.add("_hide");
                document.querySelector(".prize__image_2 img").remove();
            }), 1e3);
            start_game_2();
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
        if (targetElement.closest(".footer__hero")) {
            config.hero_coord_x = e.touches[0].clientX;
            config.hero_coord_y = e.touches[0].clientY;
            config.currentPosition[1] = config.hero_coord_y;
        }
    }));
    document.addEventListener("touchend", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".game__arrow_left")) clearInterval(move_timer);
        if (targetElement.closest(".game__arrow_top")) clearInterval(move_timer);
        if (targetElement.closest(".game__arrow_right")) clearInterval(move_timer);
        if (targetElement.closest(".game__arrow_bottom")) clearInterval(move_timer);
        if (targetElement.closest(".footer__hero")) clear_rotate_hero();
    }));
    document.addEventListener("touchmove", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".footer__hero")) {
            let hero_cord_x2 = e.touches[0].clientX;
            let xDiff = hero_cord_x2 - config.hero_coord_x;
            if (xDiff > 0) {
                if (config.currentPosition[0] < config.window_width - config.hero_width) {
                    config.currentPosition[0] += config.hero_speed;
                    move_hero_game_2();
                    rotate_hero_right();
                }
            } else if (config.currentPosition[0] > config.hero_speed) {
                config.currentPosition[0] -= config.hero_speed;
                move_hero_game_2();
                rotate_hero_left();
            }
        }
    }));
    window["FLS"] = true;
    isWebp();
})();