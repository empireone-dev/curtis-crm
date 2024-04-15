<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'retail_price',
        'discount',
        'after_discount',
        'cheque_no',
        'cheque_amount',
        'mail_date',
        'unit_cost',
        'cubed_weight',
        'length',
        'width',
        'height',
        'shipping_cost',
        'estimated_cost',
        'notes',
    ];
}
