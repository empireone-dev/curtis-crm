<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'retailers_price',
        'discount',
        'after_discount',
        'cheque_no',
        'cheque_amount',
        'cost_refund',
        'notes',
        'ship_date'
    ];
}
