var Events = function () {
    this.__construct = function () {
        this.blog();
        this.user();
        this.portfolio();

    };


    this.blog = function () {

        $(document).on('submit', '#blogForm', function (e) {
            e.preventDefault();
            var url = $(this).attr('action');
            $.ajax({
                url: url,
                type: "post",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function (out) {
                    console.log(out);
                    for (var i in out.errors) {
                        $("#" + i).parents(".form-group").append('<span class="text-danger">' + out.errors[i] + "</span>");
                    }

                    if (out.result === -1) {
                        toastr.remove();
                        toastr.error(out.msg);
                        return false;
                    }
                    if (out.result === 1) {
                        toastr.remove();
                        toastr.success(out.msg);
                        window.setTimeout(function () {
                            window.location.href = out.url;
                        }, 1000);
                    }
                }
            })
        })


        $(document).on('click', '.add', function (e) {
            e.preventDefault();
            // alert();

            var url = $(this).data('url');
            $.post(url, {}, function (out) {
                if (out.result == 1) {
                    $('#form').html(out.htmlwrapper)
                    $('#bform').modal('show');

                }
            })
        })

        $(document).on('input', '#search', function (e) {
            e.preventDefault();

            var url = $(this).data('url');
            var keyword = $(this).val()
            $.post(url, { keyword: keyword }, function (out) {
                if (out.result == 1) {
                    $('#appenddata').html(out.htmlwrapper)
                    // $('#bform').modal('show');

                }
            })
        })
    }

    $(document).on('click', '.dlt', function (d) {
        d.preventDefault();
        //    alert();
        var url = $(this).attr('href');
        var confir = confirm("Do you want to delete");
        if (confir) {
            $.get(url, {}, function (out) {
                if (out.result == 1) {
                    window.location.reload();
                }
            })
        }

    })

    this.user = function () {
        $(document).on('submit', '#user', function (e) {
            e.preventDefault();
        //    alert();
            var url = $(this).attr('action');
            var data = $(this).serialize();
            $.post(url, data, function (out) {
                if (out.result == 0) {
                    $('#error').html("<span>" + out.errors + "</span>")
                }

                if (out.result == -1) {
                    toastr.remove();
                    toastr.error(out.msg);
                    return false;
                }

                if (out.result === 1) {
                    toastr.remove();
                    toastr.success(out.msg);
                    setTimeout(() => {
                        window.location.href = out.url;
                    }, 1000);
                }

            })
        })

        this.portfolio = function () {
            $(document).on('submit', '#portfolio', function (e) {
                e.preventDefault();
                alert();
       

          })

        }
          $(document).on('click', '#submit', function (e) {
    e.preventDefault();
    alert();
    var url = $(this).data('url');
    $.post(url, {}, function (out) {
        if (out.result == 1) {
            $('#form').html(out.htmlwrapper)
            $('#bform').modal('show');

        }
    })
})

    }
    this.__construct();
};

var obj = new Events();


