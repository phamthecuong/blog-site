$(document).on('click', '.product_attribute_item_add', function () {
    var value = $('#product_attribute_item_add_input').val(),
        length = $('.product_attribute_item_input').length + 1,
        html = '<div class="row product_attribute_item">' +
            '<div class="col-md-6">' +
            '<div class="row">' +
            '<div class="input-group m-b-0">' +
            '<div class="form-line">' +
            '<input type="text" class="form-control product_attribute_item_input" name="item[NEW_'+length+']" placeholder="Nhập giá trị thuộc tính" value = "' + value + '"/>' +
            '</div>' +
            '<span class="input-group-addon">' +
            '<a href="#" class="product_attribute_item_remove">' +
            '<i class="material-icons">remove_circle</i>' +
            '</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

    $('#product_attribute_items').append(html);

    $('#product_attribute_item_add_input').val('');

    var last_item = $('#product_attribute_items .product_attribute_item_input:last-child');

    $('.product_attribute_item_input').each(function () {
        $(this).rules('add', {
            required: true,
            messages: {
                required: "Vui lòng nhập giá trị thuộc tính"
            }
        })
    });

    last_item.focus();

    return false;
});

$(document).on('click', '.product_attribute_item_remove', function () {
    $(this).closest('.product_attribute_item').remove();

    return false;
});

$(document).on('keyup', '.product_attribute_item_input', function () {
    return false;
});
