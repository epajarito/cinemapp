<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    const STATUS_CANCELLED = 0;
    const STATUS_ACTIVE = 1;

    public static $opsStatus = [
        self::STATUS_CANCELLED => 'Cancelado',
        self::STATUS_ACTIVE => 'Activo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class,'id','schedule_id');
    }

    public function getValueStatus()
    {
        return self::$opsStatus[$this->status];
    }

    public function markAsCancelled()
    {
        $this->status = self::STATUS_CANCELLED;
        $this->save();
    }
}
