<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Activity extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'ticket_id',
        'message',
        'type',
    ];


     public function refund_shipped(): HasOne
    {
        return $this->hasOne(Activity::class, 'ticket_id', 'ticket_id')
            ->where('type', '=', 'REFUND SHIPPED')
            ->orderBy('created_at', 'desc'); // Adjust the column to your desired ordering field
    }
    public function replacement_shipped(): HasOne
    {
        return $this->hasOne(Activity::class, 'ticket_id', 'ticket_id')
            ->where('type', '=', 'REPLACEMENT SHIPPED')
            ->orderBy('created_at', 'desc'); // Adjust the column to your desired ordering field
    }
     public function decision(): HasOne
    {
        return $this->hasOne(Activity::class, 'ticket_id', 'ticket_id')
            ->where('type', '=', 'DECISION MAKING')
            ->orderBy('created_at', 'desc'); // Adjust the column to your desired ordering field
    }
    public function validate(): HasOne
    {
        return $this->hasOne(Activity::class, 'ticket_id', 'ticket_id')
            ->where('type', '=', 'ASSIGNED TO')
            ->orderBy('created_at', 'asc'); // Adjust the column to your desired ordering field
    }
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function ticket(): HasOne
    {
        return $this->hasOne(Ticket::class, 'id', 'ticket_id');
    }

     public function replacement(): HasOne
    {
        return $this->hasOne(Replacement::class, 'ticket_id', 'ticket_id');
    }

    public function refund(): HasOne
    {
        return $this->hasOne(Refund::class, 'ticket_id', 'ticket_id');
    }
}
