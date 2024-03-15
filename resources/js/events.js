var Events = function () {
    this.__construct = function () {
        this.loader();
        this.commonForm();
        this.submitForm();
        this.submitFormNew();
        this.cart();
        this.quantity();
        this.ajax();
        this.form();
        this.blog();

    };

    this.loader = function () {
        $(document).ready(function () {
            $(".loadermain").fadeOut("slow");
        });
    };

    this.commonForm = function () {
        $(document).on("submit", "#common-form", function (evt) {
            evt.preventDefault();
            $(".loader").fadeIn("slow");
            var url = $(this).attr("action");
            var contact_us = $(this).data("contact");
            var postdata = $(this).serialize();
            $('.loadermain').fadeIn('slow');
            $.post(url, postdata, function (out) {
                $(".loadermain").fadeOut("slow");
                $(".form-group > .text-danger").remove();
                if (out.result === 0) {
                    if (contact_us === "") {
                        $("html, body").animate({ scrollTop: 0, }, 800);
                    }
                    for (var i in out.errors) {
                        $("#" + i).parents(".form-group").append('<span class="text-danger">' + out.errors[i] + "</span>");
                    }
                }
                if (out.result === 1) {
                    toastr.remove();
                    toastr.success(out.msg);
                    if (out.url !== undefined) {
                        window.setTimeout(function () {
                            window.location.href = out.url;
                        }, 1000);
                    }
                }
                if (out.result === -1) {
                    toastr.remove();
                    toastr.error(out.msg);
                }
                if (out.result === -2) {
                    toastr.remove();
                    toastr.error(out.msg);
                    window.setTimeout(function () {
                        window.location.href = out.url;
                    }, 1000);
                }
                if (out.result === 5) {
                    toastr.remove();
                    toastr.success(out.msg);
                    if (out.url !== undefined) {
                        window.setTimeout(function () {
                            window.location.href = out.url;
                        }, 1000);
                    }
                }
                if (out.result === -5) {
                    toastr.remove();
                    toastr.error(out.msg);
                    window.setTimeout(function () {
                        window.location.href = out.url;
                    }, 1000);
                }
            });
        });
    };

    this.submitForm = function () {
        $(document).on("submit", "#submit-form", function (evt) {
            evt.preventDefault();
            $(".loadermain").fadeIn("slow");
            if ($('#email').val() !== '' && $('#subject').val() !== '' && $('#message').val() !== '') {
                $('#sendmail1').attr("disabled", 'disabled');
            }

            $.ajax({
                url: $(this).attr("action"),
                type: "post",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function (out) {
                    $(".loadermain").fadeOut("slow");
                    $(".form-group > .text-danger").remove();
                    if (out.result === 0) {
                        $("html, body").animate(
                            {
                                scrollTop: 0,
                            },
                            800
                        );
                        for (var i in out.errors) {
                            $("#" + i)
                                .parents(".form-group")
                                .append(
                                    '<span class="text-danger">' +
                                    out.errors[i] +
                                    "</span>"
                                );
                            $("#" + i).focus();
                        }
                    }
                    if (out.result === -1) {
                        toastr.remove();
                        toastr.error(out.msg);
                        $('#sendmail1').removeAttr('disabled');
                        return false;
                    }

                    if (out.result === 1) {
                        toastr.remove();
                        toastr.success(out.msg);
                        window.setTimeout(function () {
                            window.location.href = out.url;
                        }, 1000);
                    }

                    if (out.result === 2) {
                        toastr.remove();
                        toastr.success(out.msg);
                        var case_id = out.case_id;
                        var url = out.url;
                        $(".loadermain").fadeIn("slow");
                        $.post(url, { case_id: case_id }, function (out) {
                            if (out.result == 1) {
                                $(".loadermain").fadeOut("slow");
                                $('#powerAttorneyModal').modal('hide');
                                $('#paymentAgreementModal').modal('show');
                                $(".paymentagreementwrapper").html(out.htmlwrapper);
                            }
                        });
                        return false;
                    }

                    if (out.result === 3) {
                        toastr.remove();
                        toastr.success(out.msg);
                        $('#delayRejectionModal-rejected').modal('hide');
                        $('#delayCaseRejected').modal('show');
                        return false;
                    }
                },
                failure: function (out) {

                }
            });
        });
    };

    this.submitFormNew = function () {
        $(document).on("submit", "#submit-form-new", function (evt) {
            evt.preventDefault();
            $(".loader").fadeIn("slow");
            var form = new FormData(this);
            var type = $('#power_of_attorney').html();
            form.append('power_of_attorney', type);
            var type = $('#payment_agreement').html();
            form.append('payment_agreement', type);
            $.ajax({
                url: $(this).attr("action"),
                type: "post",
                data: form,
                processData: false,
                contentType: false,
                success: function (out) {
                    $(".loader").fadeOut("slow");
                    $(".form-group > .text-danger").remove();
                    if (out.result === 0) {
                        $("html, body").animate({ scrollTop: 0, }, 800);
                        for (var i in out.errors) {
                            $("#" + i).parents(".form-group").append('<span class="text-danger">' + out.errors[i] + "</span>");
                            $("#" + i).focus();
                        }
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
                    if (out.result === 2) {
                        toastr.remove();
                        toastr.success(out.msg);
                        var case_id = out.case_id;
                        var url = out.url;
                        $(".loadermain").fadeIn("slow");
                        $.post(url, { case_id: case_id }, function (out) {
                            if (out.result == 1) {
                                $(".loadermain").fadeOut("slow");
                                $('#powerAttorneyModal-new').modal('hide');
                                $('#newPaymentAgreementModal').modal('show');
                                $(".paymentagreementwrapper").html(out.htmlwrapper);
                            }
                        });
                        return false;
                    }
                    if (out.result === -2) {
                        toastr.remove();
                        toastr.error(out.msg);
                        var case_id = out.case_id;
                        var url = out.url;
                        $(".loadermain").fadeIn("slow");
                        $.post(url, { case_id: case_id }, function (out) {
                            if (out.result == 1) {
                                $(".loadermain").fadeOut("slow");
                                $('#powerAttorneyModal-new').modal('hide');
                                $('#newPaymentAgreementModal').modal('show');
                                $(".paymentagreementwrapper").html(out.htmlwrapper);
                            }
                        });
                        return false;
                    }
                },
            });
        });
    };

    this.cart = function () {
        $(document).on('click', '.cart', function () {
            var url = $(this).data('url');
            var price = $(this).data('price')
            var qty = $(this).data('qty')
            var user_id = $(this).data('user_id')
            var product_id = $(this).data('product_id')

            $.post(url, { price: price, qty: qty, product_id: product_id, user_id: user_id }, function (out) {
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

            })
        })
    };

    this.quantity = function () {
        $(document).on('click', '.manage', function () {
            var url = $(this).data('url');
            var qty = $(this).data('val');
            var cart_id = $(this).data('cart_id');

            $.post(url, { qty: qty, cart_id: cart_id }, function (out) {
                if (out.result == 1) {
                    toastr.success(out.msg)
                    setTimeout(() => {
                        window.location.reload()

                    }, 1000);

                } else {
                    toastr.error("dnkscdk");
                }
            })

        })
    };

    this.ajax = function () {
        $(document).on('submit', '#ajax', function (k) {
            k.preventDefault();
            // alert();
            var url = $(this).attr("action");
            var name = $('#name').val();
            var email = $('#email').val();
            var dob = $('#dob').val();
            var gender = $('#gender').val();
            var course_level = $('.course_level:checked').val();
            var image = $('#image').val();

            $.post(url, { name: name, email: email, dob: dob, gender: gender, course_level: course_level, image: image }, function (out) {
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

    };



    this.form = function () {
        $(document).on('submit', '#form', function (kush) {
            kush.preventDefault();
            var url = $(this).attr("action");
            $.ajax({
                url: url,
                type: "post",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function (out) {
                    console.log(out);
                },
                failure: function (out) {

                }
            })
        })

        $(document).on('click', '.delete', function (e) {
            e.preventDefault();
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

        $(document).on('click', '.openForm', function (e) {
            e.preventDefault();

            var url = $(this).data('url');
            $.post(url, {}, function (out) {
                if (out.result == 1) {
                    $('#append').html(out.htmlwrpper)
                    $('#eshu').modal('show');

                }
            })

        })


    };



    this.blog = function () {
        $(document).on('submit', '#blog', function (evt) {
            evt.preventDefault();
            alert();
            var url = $(this).attr('action');
            $.ajax({
                url:url,
                type: "post",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function (out) {
                    console.log(out);
                    for (var i in out.errors) {
                        $("#" + i).parents(".form-group").append('<span class="text-danger">' + out.errors[i] + "</span>");
                    }
                },
                failure: function (out) {

                }
            })
        })
 
        $(document).on('click', '.blogs', function (e) {
            e.preventDefault();
           
            var url = $(this).data('url');
            $.post(url, {}, function (out) {
                if (out.result == 1) {
                    $('#ku').html(out.htmlwrpper)
                    $('#kush').modal('show');
                    if (out.result == 0) {
                       
                        //$('#error').html("<span>" + out.errors + "</span>")
                    }
                }
            })
        })  
        
    }

    this.__construct();
};
var obj = new Events();