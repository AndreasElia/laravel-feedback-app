<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;

    /** @var array */
    protected $fillable = [
        'key',
        'name',
        'url',
    ];

    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }
}
