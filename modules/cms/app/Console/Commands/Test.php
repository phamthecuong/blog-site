<?php
/**
 * Created by PhpStorm.
 * User: tungnt
 * Date: 10/22/19
 * Time: 23:50
 */

namespace Modules\Cms\Console\Commands;


use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Modules\Cms\Services\Contract\Models\User;

/**
 * Class Test
 * @package Modules\Cms\Console\Commands
 */
class Test extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'id:test';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Test module command";


    public function handle(User $user)
    {
        $this->line('Test module command...');

        $user->store([
            'name' => 'tungnt',
            'email' => 'tungnt@1tv.vn',
            'password' => Hash::make('123312'),
            'api_token' => Str::random(80),
        ]);

        var_dump(\TungNTXYZ\ExamplePkg\Test::getInstance()->hello());

        event(new \Modules\Cms\Events\Test(['dev' => 1]));
    }
}