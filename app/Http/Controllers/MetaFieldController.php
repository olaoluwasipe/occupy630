<?php

namespace App\Http\Controllers;

use App\Models\MetaField;
use Illuminate\Http\Request;

class MetaFieldController extends Controller
{
    public function index($location)
    {
        $fields = MetaField::where('location', $location)->get();
        return response()->json($fields);
    }
}
