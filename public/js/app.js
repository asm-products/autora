var auLandingPage = {
    init: function () {
        this.initSubscribeForm();
    },

    initSubscribeForm: function () {
        $('#subscribe-form').on('submit', this.subscribeSubmit.bind(this));
    },

    subscribeSubmit: function (e) {
        e.preventDefault();

        var $email = $('#subscribe-email'),
            $form = $('#subscribe-form'),
            email = $email.val();

        if (!this.validateEmail(email)) {
            $form.addClass('shake');
            $form.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
                $form.removeClass('shake');
            });

            return;
        }

        $.post( '/api/subscribe', { email: email } )
            .done(this.validationSuccess)
            .fail(this.validationFail);
    },

    validationSuccess: function () {
        $('#subscribe-form').animate({'opacity': 0}, 500, function () {
            $('#subscribe-form').hide(1000);
        });

        $('.subscribe h3').fadeOut(500, function () {
            $('.subscribe h3').html('Thanks for subscribing! We will be in touch when Autora is ready.').fadeIn(500);
        });
    },

    validationFail: function () {
        var $form = $('#subscribe-form');

        $form.addClass('shake');
        $form.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
            $form.removeClass('shake');
        });
    },

    validateEmail: function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
}

$(document).ready(function () {
    auLandingPage.init();
});
