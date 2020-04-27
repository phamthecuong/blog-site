import Vue from 'vue'

Vue.filter('toCurrency', function (value, currency) {
    // https://gist.github.com/ncreated/9934896
    switch (currency) {
        case '$':
        case 'USD':
            var formatter = new Intl.NumberFormat('us-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            break;
        case '¥':
        case 'NDT':
            var formatter = new Intl.NumberFormat('zh-CN', {
                style: 'currency',
                currency: 'CNY',
                minimumFractionDigits: 0
            });
            break;
        case 'đ':
        case 'VNĐ':
        case 'VND':
        default:
            var formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
    }

    return formatter.format(parseFloat(value));
});
