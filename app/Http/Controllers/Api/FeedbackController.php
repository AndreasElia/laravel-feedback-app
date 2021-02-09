<?php

namespace App\Http\Controllers\Api;

use App\Models\Site;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FeedbackController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'key' => ['required'],
            'message' => ['required'],
            'screenshot' => ['nullable'],
        ]);

        $site = Site::where('key', $data['key'])->firstOrFail();

        $site->feedback()->create($data);

        return response('OK');
    }
}
