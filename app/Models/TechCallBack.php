<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TechCallBack extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'csr_id',
        'note'
    ];

     public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'csr_id');
    }

}
