<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Replacement extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'ship_date',
        'unit',
        'brand',
        'model',
        'serial_number',
        'tracking',
        'notes',
    ];
}
