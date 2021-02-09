<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index(Request $request)
    {
        return view('sites.index')->with([
            'sites' => $request->user()->sites,
        ]);
    }

    public function create()
    {
        return view('sites.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:255'],
        ]);

        $data['key'] = Str::uuid();

        $request->user()->sites()->create($data);
    }

    public function show(Site $site)
    {
        return view('sites.show')->with([
            'site' => $site,
        ]);
    }

    public function edit(Request $request, Site $site)
    {
        //
    }

    public function update(Request $request, Site $site)
    {
        //
    }

    public function destroy(Site $site)
    {
        //
    }
}
