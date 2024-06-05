<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CasesLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'user_id',
        'remarks',
        'isEscalate',
        'case_type',
        'case_status',
    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class,'id','user_id');
    }
}
