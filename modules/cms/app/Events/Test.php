<?php
/**
 * Created by PhpStorm.
 * User: tungnt
 * Date: 10/22/19
 * Time: 23:54
 */

namespace Modules\Cms\Events;


use App\Events\Event;

/**
 * Class Test
 * @package Modules\Cms\Events
 */
class Test extends Event
{
    /**
     * @var
     */
    public $data;

    /**
     * Test constructor.
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }


}