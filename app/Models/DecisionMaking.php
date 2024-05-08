<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DecisionMaking extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'ticket_type',
        'asc',
        'address',
        'phone',
        'repair_cost',
        'repair_notes',
        'retailers_price',
        'discount',
        'after_discount',
        'cheque_no',
        'cheque_amount',
        'date',
        'cost_refund',
        'refund_notes',
        'cost_of_unit',
        'cube_weight',
        'length',
        'width',
        'height',
        'shipping_cost',
        'estimated_cost',
        'instruction',
        'replacement_notes',
    ];
}
