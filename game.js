$(document).ready(async function () {
    // attach button functions
    $('#showhelp').click(function () {
        $('#helpmodal').fadeIn(150);
    });

    $('#closehelp').click(function () {
        $('#helpmodal').fadeOut(150);
    });

    $('#showscore').click(function () {
        $('#scoremodal').fadeIn(150);
        $('#highscore').text(highscore);
        $('#gamesplayed').text(gamesplayed);
        $('#wordsguessed').text(wordsguessed);
    });

    $('#closescore').click(function () {
        $('#scoremodal').fadeOut(150);
    });

    $('#closegameover').click(function () {
        $('#gameovermodal').fadeOut(150);
        reset();
    });

    $('#Enter').click(function () {
        enter();
    })

    $('#Back').click(function () {
        back();
    })

    $('.key').click(function () {
        pressbutton($(this).attr('id'));
    })

    $(document).keydown(function (e) {
        switch (e.which) {
            case 8: back(); break;
            case 13: enter(); break;
            case 65: pressbutton('Ф'); break;
            case 66: pressbutton('И'); break;
            case 67: pressbutton('С'); break;
            case 68: pressbutton('В'); break;
            case 69: pressbutton('У'); break;
            case 70: pressbutton('А'); break;
            case 71: pressbutton('П'); break;
            case 72: pressbutton('Р'); break;
            case 73: pressbutton('Ш'); break;
            case 74: pressbutton('О'); break;
            case 75: pressbutton('Л'); break;
            case 76: pressbutton('Д'); break;
            case 77: pressbutton('Ь'); break;
            case 78: pressbutton('Т'); break;
            case 79: pressbutton('Щ'); break;
            case 80: pressbutton('З'); break;
            case 81: pressbutton('Й'); break;
            case 82: pressbutton('К'); break;
            case 83: pressbutton('І'); break;
            case 84: pressbutton('Е'); break;
            case 85: pressbutton('Г'); break;
            case 86: pressbutton('М'); break;
            case 87: pressbutton('Ц'); break;
            case 88: pressbutton('Ч'); break;
            case 89: pressbutton('Н'); break;
            case 90: pressbutton('Я'); break;
            case 91: pressbutton('Я'); break;
            case 92: pressbutton('Х'); break;
            case 93: pressbutton('Ї'); break;
            case 94: pressbutton('Ж'); break;
            case 95: pressbutton('Є'); break;
            case 96: pressbutton('Б'); break;
            case 97: pressbutton('Ю'); break;

        }
    })

    // load data
    let dictionary4 = await $.getJSON('dictionary4.json');
    let dictionary5 = await $.getJSON('dictionary5.json');
    let dictionary6 = await $.getJSON('dictionary6.json');

    // game
    let score;
    let attemptnumber;
    let word;
    let guess;
    let isgameover;
    let attempthistory;
    let highscore = 0;
    let gamesplayed = 0;
    let wordsguessed = 0;

    if (await load()) {
        guess = '';
        for (let i = 1; i <= attempthistory.length; i++) {
            for (let j = 1; j <= attempthistory[i - 1].length; j++) {
                let selector = `#attempt${i}>h${j}`;
                let char = attempthistory[i - 1].charAt(j - 1);
    
                $(selector).text(char);
    
                if (word.indexOf(char) === -1) {
                    $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-gray-600 text-white text-center text-3xl font-bold');
                    $(`#${char}`).attr('class', 'key bg-gray-600 rounded-lg w-8 mx-0.5 text-lg font-semibold');
                } else if (char === word.charAt(j - 1)) {
                    $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-green-700 text-white text-center text-3xl font-bold');
                    $(`#${char}`).attr('class', 'key bg-green-700 rounded-lg w-8 mx-0.5 text-lg font-semibold');
                } else {
                    const occurance = word.split('').filter(c => c === char).length;
                    let charcount = 1;
                    let budget = occurance;

                    for (k = 0; k < attempthistory[i - 1].length; k++) {
                        if (k <= j - 2 && attempthistory[i - 1].charAt(k) === char) {
                            charcount += 1;
                        }

                        if (attempthistory[i - 1].charAt(k) === word.charAt(k)) {
                            budget -= 1;
                        }
                    }

                    if (charcount <= budget) {
                        $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-yellow-600 text-white text-center text-3xl font-bold');
                        if (!$(`#${char}`).hasClass('bg-green-700')) {
                            $(`#${char}`).attr('class', 'key bg-yellow-600 rounded-lg w-8 mx-0.5 text-lg font-semibold');
                        }
                    } else {
                        $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-gray-600 text-white text-center text-3xl font-bold');
                        if (!$(`#${char}`).hasClass('bg-green-700') && !$(`#${char}`).hasClass('bg-yellow-600')) {
                            $(`#${char}`).attr('class', 'key bg-gray-600 rounded-lg w-8 mx-0.5 text-lg font-semibold');
                        }
                    }
                }
            }
        }

        if (word.length < 6) {
            $('.attempts>h6').hide();
        }
        if (word.length < 5) {
            $('.attempts>h5').hide();
        }

        if (score > 0) {
            $('#title').text(`Score: ${score}`);
            $('#title').attr('class', 'text-2xl font-extrabold my-auto');
        }

    } else {
        reset();
    }

    function reset () {
        score = 0;
        attemptnumber = 1;
        word = '';
        guess = '';
        isgameover = false;
        attempthistory = [];
        $('#title').text(`Wordle`);
        $('#title').attr('class', 'text-5xl font-extrabold my-auto');
        newword();
        save();
    }

    function newword () {
        let random = Math.floor(Math.random() * 3);

        switch(random) {
            case 0: {
                word = dictionary4[Math.floor(Math.random() * dictionary4.length)];
                break;
            }
            case 1: {
                word = dictionary5[Math.floor(Math.random() * dictionary5.length)];
                break;
            }
            case 2: {
                word = dictionary6[Math.floor(Math.random() * dictionary6.length)];
                break;
            }
        }

        $('.attempts>*').show();
        $('.attempts>*').attr('class', 'h-12 w-12 my-auto mx-1 border border-gray-900 text-center text-3xl font-bold');
        $('.attempts>*').text('');
        $('.key').attr('class', 'key bg-gray-300 rounded-lg w-8 mx-0.5 text-lg font-semibold');

        if (word.length < 6) {
            $('.attempts>h6').hide();
        }
        if (word.length < 5) {
            $('.attempts>h5').hide();
        }

        word = word.toUpperCase();
    }

    function pressbutton (letter) {
        if (isgameover || guess.length >= word.length) {
            return;
        }

        guess = guess + letter;
        $(`#attempt${attemptnumber}>h${guess.length}`).text(letter);
    }

    function back () {
        if (isgameover || (guess.length <= 0)) {
            return;
        }

        $(`#attempt${attemptnumber}>h${guess.length}`).text('');
        guess = guess.slice(0, -1);
    }

    function save () {
        localStorage.setItem('score', score);
        localStorage.setItem('attemptnumber', attemptnumber);
        localStorage.setItem('word', word);
        localStorage.setItem('isgameover', JSON.stringify(isgameover));
        localStorage.setItem('attempthistory', JSON.stringify(attempthistory));
        localStorage.setItem('highscore', highscore);
        localStorage.setItem('gamesplayed', gamesplayed);
        localStorage.setItem('wordsguessed', wordsguessed);
    }

    async function load () {
        if (localStorage.score && localStorage.attemptnumber && localStorage.word && localStorage.isgameover && localStorage.attempthistory && localStorage.highscore && localStorage.gamesplayed && localStorage.wordsguessed) {
            score = Number(localStorage.getItem('score'));
            attemptnumber = Number(localStorage.getItem('attemptnumber'));
            word = localStorage.getItem('word');
            isgameover = JSON.parse(localStorage.getItem('isgameover'));
            attempthistory = JSON.parse(localStorage.getItem('attempthistory'));
            highscore = Number(localStorage.getItem('highscore'));
            gamesplayed = Number(localStorage.getItem('gamesplayed'));
            wordsguessed = Number(localStorage.getItem('wordsguessed'));

            return true;
        }

        return false;
    }

    async function enter () {
        if (isgameover) {
            return;
        }

        if (guess.length != word.length) {
            $('#error').text('Невідповідність довжини');
            $('#error').fadeIn(150);
            $('#error').fadeOut(500);
            return;
        }

        switch (word.length) {
            case 4: {
                if (dictionary4.indexOf(guess.toLowerCase()) == -1) {
                    $('#error').text('Немає в словнику');
                    $('#error').fadeIn(150);
                    $('#error').fadeOut(500);
                    return;
                }
                break;
            }
            case 5: {
                if (dictionary5.indexOf(guess.toLowerCase()) == -1) {
                    $('#error').text('Немає в словнику');
                    $('#error').fadeIn(150);
                    $('#error').fadeOut(500);
                    return;
                }
                break;
            }
            case 6: {
                if (dictionary6.indexOf(guess.toLowerCase()) == -1) {
                    $('#error').text('Немає в словнику');
                    $('#error').fadeIn(150);
                    $('#error').fadeOut(500);
                    return;
                }
                break;
            }
        }

        guess = guess.toUpperCase();

        for (let i = 1; i <= guess.length; i++) {
            let selector = `#attempt${attemptnumber}>h${i}`;
            let char = guess.charAt(i - 1);

            $(selector).text(char);

            if (word.indexOf(char) === -1) {
                $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-gray-600 text-white text-center text-3xl font-bold');
                $(`#${char}`).attr('class', 'key bg-gray-600 rounded-lg w-8 mx-0.5 text-lg font-semibold');
            } else if (char === word.charAt(i - 1)) {
                $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-green-700 text-white text-center text-3xl font-bold');
                $(`#${char}`).attr('class', 'key bg-green-700 rounded-lg w-8 mx-0.5 text-lg font-semibold');
            } else {
                const occurance = word.split('').filter(c => c === char).length;
                let charcount = 1;
                let budget = occurance;

                for (k = 0; k < guess.length; k++) {
                    if (k <= i - 2 && guess.charAt(k) === char) {
                        charcount += 1;
                    }

                    if (guess.charAt(k) === word.charAt(k)) {
                        budget -= 1;
                    }
                }

                if (charcount <= budget) {
                    $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-yellow-600 text-white text-center text-3xl font-bold');
                    if (!$(`#${char}`).hasClass('bg-green-700')) {
                        $(`#${char}`).attr('class', 'key bg-yellow-600 rounded-lg w-8 mx-0.5 text-lg font-semibold');
                    }
                } else {
                    $(selector).attr('class', 'h-12 w-12 my-auto mx-1 bg-gray-600 text-white text-center text-3xl font-bold');
                    if (!$(`#${char}`).hasClass('bg-green-700') && !$(`#${char}`).hasClass('bg-yellow-600')) {
                        $(`#${char}`).attr('class', 'key bg-gray-600 rounded-lg w-8 mx-0.5 text-lg font-semibold');
                    }
                }
            }
        }

        if (guess === word) {
            score += (7 - attemptnumber) + (word.length - 4);
            $('#title').text(`Очків: ${score}`);
            $('#title').attr('class', 'text-2xl font-extrabold my-auto');
            await new Promise(r => setTimeout(r, 1000));
            newword();
            attemptnumber = 1;
            attempthistory = [];
            wordsguessed += 1;
        } else {
            attempthistory.push(guess);
            attemptnumber += 1;
        }

        guess = '';
        if (attemptnumber == 7) {
            isgameover = true;
            $('#gameovermodal').fadeIn(150);
            $('#word').text(word);
            $('#score').text(score);
            if (score > highscore) {
                highscore = score;
            }
            $('#bigscore').text(highscore);
            gamesplayed += 1;
            reset();
        } else {
            save();
        }
    }
});


