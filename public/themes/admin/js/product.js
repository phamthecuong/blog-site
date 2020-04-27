App.validProduct = function () {
    var html = '';

    if ($('input[name=name]').val() == '') {
        html += '<li>The name field is required</li>';
    }

    if ($('textarea[name=description]').val() == '') {
        html += '<li>The description field is required</li>';
    }

    if ($('input[name=price]').val() == '') {
        html += '<li>The price field is required</li>';
    }

    if (html == '') {
        $('#product_form').submit();
    } else {
        App.showMsgAlert(html);

        App.toTop();
    }
};

App.on('change', '#product_images', function (event) {
    var $this = $(this),
        product_id = $(this).data('product'),
        target_files = event.target.files,
        images = [],
        form_data = new FormData();

    form_data.append('product_id', product_id);

    $.each(target_files, function (key, value) {
        form_data.append('images[]', value);
    });

    $.ajax({
        url: '/admin/product/image/upload',
        type: 'post',
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        data: form_data,
        beforeSend: function () {
            App.mask(true);
        },
        success: function (response) {
            App.mask(false);

            if (response.status == 200) {
                $('#tab_images table > tbody').html(response.data.html);
            } else {
                swal({
                    title: "Error",
                    text: response.message,
                    type: "error"
                }, function (isConfirm) {
                    if (isConfirm) {
                        swal.close();
                    }
                });
            }
        }
    });
});

App.on('click', '.product_image_delete', function (event) {
    var $this = $(this);

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
                url: '/admin/product/image/delete',
                type: 'post',
                data: {
                    ids: $this.data('ids')
                },
                beforeSend: function () {
                    App.mask(true);
                },
                success: function (response) {
                    App.mask(false);

                    $this.closest('tr').remove();
                }
            });

            swal.close();
        }
    });

    return false;
});

App.on('click', '.product_attribute_image_delete', function (event) {
    var $this = $(this),
        parent = $this.closest('td');

    parent.find('.product-attribute--upload').removeAttr('style');
    parent.find('.product-attribute--upload input[type=hidden]').val('');

    return false;
});

App.on('click', '.product_form_submit', function (event) {
    var $this = $(this);

    App.validProduct();

    return false;
});

App.on('click', '.product_attribute_add_btn', function () {
    var $this = $(this),
        product_attributes = [];

    $('#product_attribute_list > table').each(function () {
        product_attributes.push($(this).data('id'));
    });

    $.getJSON('/admin/product-attribute.json', {
        exclude: product_attributes
    }, function (data) {
        var html = '';

        $.each(data, function (index, item) {
            html += '<tr>' +
                '<td class="p-l-0-imp">' +
                '<div>' +
                '<input type="checkbox" id="item-checkbox--' + item.id + '" value="' + item.id + '" class="item-checkbox item-checkbox_product_attribute filled-in" data-obj = \'' + JSON.stringify(item) + '\' />' +
                '<label for="item-checkbox--' + item.id + '"></label>' +
                '</div>' +
                '</td>' +
                '<td>' + item.name + '</td>' +
                '</tr>';
        });

        $('#productAttributeModal .modal-body table > tbody').html(html);

        $('#productAttributeModal').modal({
            backdrop: 'static'
        });
    });
});

App.on('click', '.product_attribute_select_btn', function () {
    var html = '';

    $('input.item-checkbox_product_attribute:checked').each(function () {
        var item_obj = $(this).data('obj');

        html += '<table class="table table-hover" data-id = "' + item_obj.id + '">' +
            '<thead>' +
            '<tr>' +
            '<th>' + item_obj.name + '</th>' +
            '<th>Hình ảnh</th>' +
            '<th>Giá</th>' +
            '<th>Trạng thái</th>' +
            '<th class="text-right">' +
            '<a class="item-tool product_attribute_delete" title="Delete" href="#">' +
            '<i class="material-icons">delete</i>' +
            '</a>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        if (item_obj.default_items.length > 0) {
            item_obj.default_items.forEach(function (item) {
                var img = '<label class="product-attribute--upload">' +
                    '<input type="file" accept="image/*" name="attribute_item[' + item_obj.id + '][' + item.id + '][image_file]" value=""/>' +
                    '<input type="hidden" name="attribute_item[' + item_obj.id + '][' + item.id + '][image]" value="' + item.image + '">' +
                    '</label>' +
                    '<a class="item-tool product_attribute_image_delete" title="Image delete" href="javascript:void(0);"><i class="material-icons">close</i></a>';

                if (item.image != null) {
                    img = '<label class="product-attribute--upload" style="background-image: url(' + item.image + ')">' +
                        '<input type="file" accept="image/*"  name="attribute_item[' + item_obj.id + '][' + item.id + '][image_file]"/>' +
                        '<input type="hidden" name="attribute_item[' + item_obj.id + '][' + item.id + '][image]" value="' + item.image + '">' +
                        '</label>' +
                        '<a class="item-tool product_attribute_image_delete" title="Image delete" href="javascript:void(0);"><i class="material-icons">close</i></a>';
                }

                html += '<tr>' +
                    '<td width="150">' + item.name + '</td>' +
                    '<td width="100">' + img + '</td>' +
                    '<td width="200">' +
                    '<div class="col-md-12">' +
                    '<div class="form-group">' +
                    '<div class="form-line">' +
                    '<input type="text" class="form-control" name="attribute_item[' + item_obj.id + '][' + item.id + '][price]" placeholder="Nhập giá sản phẩm" value="0"/>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td width="120">' +
                    '<div class="col-md-12">' +
                    '<div class="form-group">' +
                    '<input type="checkbox" id="status_' + item.id + '" class="filled-in" name="attribute_item[' + item_obj.id + '][' + item.id + '][status]" />' +
                    '<label for="status_' + item.id + '"></label>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td class="text-right"></td>' +
                    '</tr>';
            });
        }

        html += '</tbody>' +
            '</table>';
    });

    $('#product_attribute_list').append(html);

    $('#productAttributeModal').modal('hide');
});

App.on('click', '.product_attribute_delete', function () {
    $(this).closest('table').remove();
});

App.on('change', '.product-attribute--upload > input[type=file]', function (event) {
    var $this = $(this), reader = new FileReader(), target_files = event.target.files;
    reader.onload = function (e) {
        $this.parent('.product-attribute--upload').css('background-image', 'url("' + e.target.result + '")');
        $this.parent('.product-attribute--upload').find('input[type=hidden]').val(e.target.result);
    };

    reader.readAsDataURL(target_files[0]);
});