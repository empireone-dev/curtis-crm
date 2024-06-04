<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'ticket_id',
        'asc_id',
        'decision_making_id',
        'fname',
        'lname',
        'email',
        'phone',
        'item_number',
        'unit',
        'brand',
        'class',
        'serial_number',
        'call_type',
        'purchase_data',
        'zip_code',
        'country',
        'state',
        'decision_status',
        'city',
        'address',
        'issue',
        'explanation',
        'warranty_status',
        'validation_notes',
        'availability_notes',
        'callback_notes',
        'internal_notes',
        'created_from',
        'isUploading',
        'remarks',
        'reason_to_close',
        'status',
        'cases_status'
    ];

    
    public function user(): HasOne
    {
        return $this->hasOne(User::class,'id','user_id');
    }

    public function refund(): HasOne
    {
        return $this->hasOne(Refund::class,'ticket_id','id');
    }

    public function repair(): HasOne
    {
        return $this->hasOne(Repair::class,'ticket_id','id');
    }


    public function receipt(): HasOne
    {
        return $this->hasOne(Receipt::class,'ticket_id','id');
    }

    public function replacement(): HasOne
    {
        return $this->hasOne(Replacement::class,'ticket_id','id');
    }

    public function decision_making(): HasOne
    {
        return $this->hasOne(DecisionMaking::class,'ticket_id','id');
    }

}
