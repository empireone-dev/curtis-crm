<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CustomerDetailsLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'transfer_from',
        'transfer_to',
        'message',
    ];

    public function transfer_from(): HasOne
    {
        return $this->hasOne(User::class,'id','transfer_from');
    }
    public function transfer_to(): HasOne
    {
        return $this->hasOne(User::class,'id','transfer_to');
    }
}
