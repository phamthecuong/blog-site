<?php
/**
 * Created by PhpStorm.
 * User: tungnt
 * Date: 10/22/19
 * Time: 22:32
 */

namespace Modules\Cms\Http\Controllers;


/**
 * Class Test
 * @package Modules\Cms\Http\Controllers
 */
class Test extends Base
{

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showView()
    {
        return view('test');
    }

    public function login(\Modules\Cms\Services\Contract\Models\User $user)
    {
        //\Illuminate\Support\Facades\Auth::loginUsingId(2);
        /*\Illuminate\Support\Facades\Auth::attempt([
            'email' => 'tungnt@1tv.vn',
            'password' => '123312'
        ]);*/
        //return $request->user();

        $userInfo = $user->find(2);

        $token = $userInfo->createToken('Token Name')->accessToken;

        return $token;
    }
}