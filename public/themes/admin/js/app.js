var App = App || {};

!function (window, $, App) {
    App.log = function (msg) {
        if (typeof console == 'object') {
            window.console.log(msg);
        }
    };

    App.on = function (event, element, callback) {
        /* Used jQbox-App-likeuery 1.7 event handler */
        $('body').on(event, element, function (e) {
            callback.apply(this, arguments); // Used arguments to fixed error in IE

            // e.preventDefault();
        });
    };

    App.alert = function ($msg) {
        alert($msg);
    };

    App.refresh = function (url, timeout) {
        timeout = typeof (timeout) == 'undefined' ? 0 : timeout;
        return window.setTimeout(function () {
            if (typeof (url) == 'undefined' || url === '') {
                window.location.reload()
            } else {
                window.location = url;
            }
        }, timeout);
    };

    App.changeUrl = function (title, url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = {Title: title, Url: url};
            history.pushState(obj, obj.Title, obj.Url);
        } else {
            window.location.href = url;
        }
    };

    App.sweetDeleteItemMessage = function (url, ids) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover it!",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    url: url,
                    type: 'post',
                    data: {
                        ids: ids
                    },
                    success: function (response) {
                        if (response.status == 200) {
                            App.refresh();
                        } else {
                            swal("Error", response.message, "error");
                        }
                    }
                });
            }
        });
    };

    App.toTop = function () {
        $("html, body").animate({scrollTop: 0}, "slow");
    };

    App.showMsgAlert = function (msg) {
        $('#msg-alert .alert-content').html(msg);

        $('#msg-alert').show();
    };

    App.mask = function (mask) {
        if (mask) {
            $('#mask').addClass('in');
        } else {
            $('#mask').removeClass('in');
        }
    };

    App.urlInsertParam = function (key, value) {
        key = encodeURI(key);
        value = encodeURI(value);

        var kvp = document.location.search.substr(1).split('&');

        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }

        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    };

    // DOM ready
    $(function () {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": document.querySelector('meta[name=csrf-token]').getAttribute("content")
            }
        });

        App.on('change', '#item-checkbox--all', function (e) {
            var $this = $(this), checked = $this.is(':checked');

            if (checked) {
                $('input.item-checkbox').prop('checked', true);
            } else {
                $('input.item-checkbox').prop('checked', false);
            }
        });

        App.on('click', '.delete-item--selected', function (e) {
            var $this = $(this),
                url = $this.data('href'),
                ids = [];

            $('input.item-checkbox:checked').each(function () {
                ids.push($(this).val());
            });

            App.sweetDeleteItemMessage(url, ids);

            e.preventDefault();
        });

        App.on('click', '.sweet-alert--action', function (e) {
            var $this = $(this),
                url = $this.data('href'),
                ids = $this.data('ids');

            App.sweetDeleteItemMessage(url, ids);
        });

        App.on('change', '.image-upload > input[type=file]', function (event) {
            var $this = $(this), reader = new FileReader(), target_files = event.target.files;
            reader.onload = function (e) {
                $this.parent('.image-upload').css('background-image', 'url("' + e.target.result + '")');
            };

            reader.readAsDataURL(target_files[0]);
        });

        App.on('change', 'input[name=setting_lang]', function (e) {
            var $this = $(this);

            App.urlInsertParam('hl', $this.val());
        });


    }); // End DOM ready
}(window, window.jQuery, window.App);