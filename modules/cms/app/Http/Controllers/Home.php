<?php

namespace Modules\Cms\Http\Controllers;


/**
 * Class Home
 * @package Modules\Cms\Http\Controllers
 */
class Home extends Base
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('home.index');
    }
}