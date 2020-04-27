<?php
/**
 * Created by PhpStorm.
 * User: tungnt
 * Date: 10/22/19
 * Time: 23:54
 */

namespace Modules\Cms\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * Class Test
 * @package Modules\Cms\Listeners
 */
class Test
{
    /**
     * @param \Modules\Cms\Events\Test $event
     */
    public function handle(\Modules\Cms\Events\Test $event)
    {
        var_dump($event->data);
    }
}