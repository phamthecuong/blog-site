<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet"
          type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <link href="/themes/admin/plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/themes/admin/plugins/node-waves/waves.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/animate-css/animate.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/sweetalert/sweetalert.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/morrisjs/morris.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet">
    <link href="/themes/admin/plugins/nestable/jquery-nestable.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.css" rel="stylesheet"/>
    <link href="/themes/admin/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css"
          rel="stylesheet">
    <link href="/themes/admin/plugins/bootstrap-datepicker/css/bootstrap-datepicker.css" rel="stylesheet">
    <link href="/themes/admin/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="/themes/admin/css/nprogress.css" rel="stylesheet">
    <link href="/themes/admin/css/style.css" rel="stylesheet">
    <link href="/themes/admin/css/themes/all-themes.css" rel="stylesheet"/>
    <link href="/themes/admin/css/custom.css?v=20190321223" rel="stylesheet">

    <script type="text/javascript">
        window.app_api_url = '{{env('APP_API_URL')}}';
    </script>

    <style>
        table.table-bordered.dataTable {
            border-collapse: collapse !important;
        }
    </style>
</head>

<body class="theme-blue">

<div id="app">
    <app></app>
</div>

<script src="/themes/admin/plugins/jquery/jquery.min.js"></script>
<script src="/themes/admin/plugins/bootstrap/js/bootstrap.js"></script>
<script src="/themes/admin/plugins/bootstrap-select/js/bootstrap-select.js"></script>
<script src="/themes/admin/plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
<script src="/themes/admin/plugins/node-waves/waves.js"></script>
<script src="/themes/admin/plugins/jquery-countto/jquery.countTo.js"></script>
<script src="/themes/admin/plugins/raphael/raphael.min.js"></script>
<script src="/themes/admin/plugins/morrisjs/morris.js"></script>
<script src="/themes/admin/plugins/chartjs/Chart.bundle.js"></script>
<script src="/themes/admin/plugins/flot-charts/jquery.flot.js"></script>
<script src="/themes/admin/plugins/flot-charts/jquery.flot.resize.js"></script>
<script src="/themes/admin/plugins/flot-charts/jquery.flot.pie.js"></script>
<script src="/themes/admin/plugins/flot-charts/jquery.flot.categories.js"></script>
<script src="/themes/admin/plugins/flot-charts/jquery.flot.time.js"></script>
<script src="/themes/admin/plugins/jquery-sparkline/jquery.sparkline.js"></script>
<script src="/themes/admin/plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
<script src="/themes/admin/plugins/autosize/autosize.js"></script>
<script src="/themes/admin/plugins/momentjs/moment.js"></script>
<script src="/themes/admin/plugins/node-waves/waves.js"></script>
<script src="/themes/admin/plugins/sweetalert/sweetalert.min.js"></script>
<script src="/themes/admin/plugins/jquery-validation/jquery.validate.js"></script>
<script src="/themes/admin/plugins/jquery-validation/additional-methods.js"></script>
<script src="/themes/admin/plugins/ckeditor/ckeditor.js"></script>
<script src="/themes/admin/plugins/ckeditor/plugins/colorbutton/plugin.js"></script>
<script src="/themes/admin/plugins/ckeditor/plugins/colordialog/plugin.js"></script>
<script src="/themes/admin/plugins/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js"></script>
<script src="/themes/admin/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js"></script>
<script src="/themes/admin/plugins/nestable/jquery.nestable.js"></script>
<script src="/themes/admin/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>
<script src="/themes/admin/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="/themes/admin/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<!--<script src='https://www.google.com/recaptcha/api.js?hl=vi'></script>-->

<!-- Jquery DataTable Plugin Js -->
<script src="/themes/admin/plugins/jquery-datatable/jquery.dataTables.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
<script src="/themes/admin/plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

<script src="/js/cms.js?v=000000057"></script>

<script src="/themes/admin/js/admin.js"></script>


@section('footer.script')

@show

</body>

</html>
