<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    /** @var array */
    protected $fillable = [
        'message',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
