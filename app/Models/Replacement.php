<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Replacement extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'unit_cost',
        'cube_weight',
        'length',
        'width',
        'height',
        'shipping_cost',
        'estimated_cost',
        'instruction',
        'notes',
    ];
}
