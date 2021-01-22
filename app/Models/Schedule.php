<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $casts = [
        'hour' => 'date:H:i'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
