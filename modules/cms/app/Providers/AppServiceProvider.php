<?php

namespace Modules\Cms\Providers;


use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Modules\Cms\Services\Contract\Test;

/**
 * Class AppServiceProvider
 * @package Modules\Cms\Providers
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * @var string
     */
    private $namespace = null;

    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [

    ];

    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */

    public $singletons = [
        Test::class => \Modules\Cms\Services\Test::class,
    ];

    /**
     * AppServiceProvider constructor.
     */
    public function __construct()
    {
        $this->setNamespace();
    }

    /**
     * @return string
     */
    public function getNamespace(): string
    {
        return !empty($this->namespace) ? $this->namespace : __NAMESPACE__;
    }

    /**
     *
     */
    public function setNamespace(): void
    {
        $this->namespace = str_replace('\Providers', '', __NAMESPACE__);
    }

    /**
     * sudo php artisan vendor:publish
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../../configs/modules/test.php' => config_path('modules/test.php'),
            __DIR__ . '/../../database/migrations' => database_path('migrations'),
            __DIR__ . '/../../database/seeds' => database_path('seeds')
        ]);
    }

    /**
     *
     */
    public function register()
    {
        $this->registerHelpers();
        $this->registerRoutes();
        $this->registerCommands();
    }

    /**
     *
     */
    private function registerHelpers()
    {
        $helpers = __DIR__ . '/../../helpers.php';

        if (file_exists($helpers)) {
            require $helpers;
        }
    }

    /**
     *
     */
    private function registerRoutes()
    {
        $routes = __DIR__ . '/../../route.php';

        if (!file_exists($routes)) {
            return;
        }

        $namespace = $this->getNamespace() . '\Http\Controllers';

        Route::middleware('web')->namespace($namespace)->group($routes);
    }

    /**
     *
     */
    private function registerCommands()
    {
        $this->commands([
            \Modules\Cms\Console\Commands\Test::class
        ]);
    }
}
