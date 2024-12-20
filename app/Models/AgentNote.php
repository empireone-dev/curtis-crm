<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AgentNote extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'ticket_id',
        'message',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class,'id','user_id');
    }

}
