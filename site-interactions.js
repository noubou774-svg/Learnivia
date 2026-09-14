/**
 * Learnivia — fix dead buttons/forms without changing original UI styles
 */
(function () {
    function go(href) {
        if (href) window.location.href = href;
    }

    /* FAQ accordion */
    document.querySelectorAll('.faq-question').forEach(function (button) {
        button.addEventListener('click', function () {
            var item = button.closest('.faq-item');
            if (!item) return;
            var wasOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function (other) {
                other.classList.remove('active');
            });
            if (!wasOpen) item.classList.add('active');
        });
    });

    /* Index — program cards + bootcamp */
    document.querySelectorAll('.learning-card button').forEach(function (btn, i) {
        var targets = ['sat-tutoring.html', 'workshops.html', 'workshops.html', 'peer-tutoring.html'];
        btn.addEventListener('click', function () {
            go(targets[i] || 'index.html');
        });
    });

    var joinBootcamp = document.querySelector('.join-bootcamp');
    if (joinBootcamp && joinBootcamp.tagName === 'BUTTON') {
        joinBootcamp.addEventListener('click', function () { go('signup.html'); });
    }

    /* SAT tutoring hero */
    document.querySelectorAll('.front2 .for-parents, .space .for-parents').forEach(function (btn) {
        btn.addEventListener('click', function () { go('become-tutor.html'); });
    });
    document.querySelectorAll('.front2 .for-educator, .space .for-educator').forEach(function (btn) {
        btn.addEventListener('click', function () { go('signup.html'); });
    });

    var satJoin = document.querySelector('button.join-bootcamp, .join-bootcamp');
    if (satJoin && satJoin.tagName === 'BUTTON') {
        satJoin.addEventListener('click', function () { go('signup.html'); });
    }

    document.querySelectorAll('.register-btn').forEach(function (el) {
        if (el.tagName === 'BUTTON') {
            el.addEventListener('click', function () { go('signup.html'); });
        }
    });

    /* Debate */
    var getStarted = document.querySelector('.get-started-button');
    if (getStarted && getStarted.tagName === 'BUTTON') {
        getStarted.addEventListener('click', function () { go('signup.html'); });
    }

    /* Workshops */
    document.querySelectorAll('.register-button, .signup2-button').forEach(function (el) {
        if (el.tagName === 'BUTTON') {
            el.addEventListener('click', function () { go('signup.html'); });
        }
    });

    /* Homework help page */
    document.querySelectorAll('.tutor-hero .start-learning-button, .hw-hero .start-learning-button').forEach(function (btn) {
        btn.addEventListener('click', function () { go('signup.html'); });
    });

    /* Donate amount presets */
    var amountButtons = document.querySelectorAll('.amount-button');
    var customAmount = document.getElementById('customAmount');
    var selectedAmount = 50;

    if (amountButtons.length) {
        amountButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                amountButtons.forEach(function (b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
                selectedAmount = Number(btn.dataset.amount) || 0;
                if (customAmount) customAmount.value = '';
            });
        });
        amountButtons[1]?.classList.add('selected');
    }

    if (customAmount) {
        customAmount.addEventListener('input', function () {
            amountButtons.forEach(function (b) { b.classList.remove('selected'); });
            selectedAmount = Number(customAmount.value) || 0;
        });
    }

    var donorNote = document.getElementById('donor-note');
    var characterCount = document.getElementById('characterCount');
    if (donorNote && characterCount) {
        var updateCount = function () {
            characterCount.textContent = String(donorNote.value.length);
        };
        donorNote.addEventListener('input', updateCount);
        updateCount();
    }

    var donateButton = document.getElementById('donateButton');
    if (donateButton) {
        donateButton.addEventListener('click', function () {
            var amount = customAmount && customAmount.value
                ? Number(customAmount.value)
                : selectedAmount;
            if (!amount || amount < 1) {
                window.alert('Please choose or enter a donation amount.');
                return;
            }
            var freq = document.getElementById('frequency');
            var label = freq ? freq.options[freq.selectedIndex].text : 'One-time';
            window.alert(
                'Thank you! Your ' + label.toLowerCase() + ' donation of $' +
                amount + ' will be processed when payment is connected.'
            );
        });
    }

    /* Sign-in helpers */
    document.querySelectorAll('.show-password').forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            var field = toggle.closest('.password-field, .password-wrapper');
            var input = field ? field.querySelector('input') : null;
            if (!input) return;
            var showing = input.type === 'text';
            input.type = showing ? 'password' : 'text';
            toggle.textContent = showing ? 'Show' : 'Hide';
        });
    });

    var signinForm = document.querySelector('.signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function (event) {
            event.preventDefault();
            go('index.html');
        });
    }

    var googleSignin = document.querySelector('.google-signin');
    if (googleSignin) {
        googleSignin.addEventListener('click', function () {
            window.alert('Google Sign In will be available when authentication is connected.');
        });
    }

    /* Sync dropdown offset when nav wraps on smaller screens */
    function syncNavOffset() {
        var nav = document.querySelector('.top');
        if (!nav) return;
        document.documentElement.style.setProperty('--nav-offset', nav.offsetHeight + 'px');
    }

    syncNavOffset();
    window.addEventListener('resize', syncNavOffset);
    window.addEventListener('load', syncNavOffset);
})();
