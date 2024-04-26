<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Replacement extends Model
{
    use HasFactory;
    protected $fillable = [
        'unit',
        'brand' ,
        'item_number',
        'serial_number',
        'tracking',
        'ticket_id',
        'unit_cost',
        'cubed_weight',
        'length',
        'width',
        'height',
        'shipping_cost',
        'estimated_cost',
        'instruction',
        'notes',
    ];
}
