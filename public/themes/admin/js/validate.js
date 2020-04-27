if ($('#product_attribute_form').length) {
    $('#product_attribute_form').validate({
        rules: {
            name: {
                required: true
            }
        },
        messages: {
            name: "Vui lòng nhập tên thuộc tính"
        }
    });

    $('.product_attribute_item_input').each(function () {
        $(this).rules('add', {
            required: true,
            messages: {
                required: "Vui lòng nhập giá trị thuộc tính"
            }
        })
    });
}