function showDialog(type, title, message) {
    swal({
        title: title,
        text: message,
        type: type,
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false
    });
}

function confirmDialog(title, message, callback) {
    swal({
        title: title,
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Huỷ",
        closeOnConfirm: false
    }, function () {
        swal.close();

        if (callback) {
            callback();
        }
    });
}

function inputDialog(title, message, input_value, callback) {
    swal({
        title: title,
        text: message,
        type: "input",
        inputValue: input_value,
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Nội dung",
        cancelButtonText: "Huỷ",
        confirmButtonText: "Cập nhật",
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("Vui lòng nhập nội dung!");

            return false
        }

        swal.close();

        if (callback) {
            callback(inputValue);
        }
    });
}

function selectDialog(title, message, input_value, callback) {
    swal({
        title: title,
        text: message,
        input: 'select',
        inputOptions: {
            'SRB': 'Serbia',
            'UKR': 'Ukraine',
            'HRV': 'Croatia'
        },
        inputValue: 'HRV',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Chọn ...",
        cancelButtonText: "Huỷ",
        confirmButtonText: "Cập nhật",
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("Vui lòng nhập nội dung!");

            return false
        }

        swal.close();

        if (callback) {
            callback(inputValue);
        }
    });
}

export {
    showDialog,
    confirmDialog,
    inputDialog,
    selectDialog
}