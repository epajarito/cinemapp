<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = ['name','created_at','image','user_id'];

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
        return $this->belongsToMany(Schedule::class);
    }

    public function getValueStatus()
    {
        return self::$opsStatus[$this->status ?? 1];
    }

    public function markAsCancelled()
    {
        $this->status = self::STATUS_CANCELLED;
        $this->save();
    }
}
