<?php

Route::get('/{any}', 'Home@index')->where('any', '.*');
