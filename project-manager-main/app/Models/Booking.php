<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'city',
        'project_type',
        'approx_size',
        'message',
        'moodboard_urls',
        'preferred_contact',
        'preferred_time',
        'status',
    ];

    protected $casts = [
        'moodboard_urls' => 'array',
    ];
}
