<?php

namespace Modules\Cms\Http\Controllers;


use Illuminate\Routing\Controller;

/**
 * Class Base
 * @package Modules\Cms\Http\Controllers
 */
class Base extends Controller
{
    /**
     * Base constructor.
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {

            return $next($request);
        });

        view()->addLocation($this->getViewPath());
    }

    /**
     * @return string
     */
    private function getViewPath()
    {
        return base_path(strtolower(str_replace(['\Http\Controllers', '\\'], ['', '/'], __NAMESPACE__)) . '/resources/views');
    }
}
