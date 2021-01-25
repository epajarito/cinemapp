<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    const STATUS_CANCELLED = 0;
    const STATUS_ACTIVE = 1;

    public static $opsStatus = [
        self::STATUS_CANCELLED => 'Cancelado',
        self::STATUS_ACTIVE => 'Activo'
    ];

    protected $fillable = ['hour','status','user_id'];

    protected $casts = [
        'hour' => 'date:H:i'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function movies()
    {
        return $this->belongsToMany(Movie::class);
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
