<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'cases_status',
        'move_status',
        'purchase_date',
        'email_date',
        'validator_id',
        'is_reply',
        'isExported',
        'isEscalated'
    ];

    public function direct_emails(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function pr(): HasOne
    {
        return $this->hasOne(ProductRegistration::class, 'serial', 'serial_number');
    }

    public function validator(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'validator_id');
    }

    public function refund(): HasOne
    {
        return $this->hasOne(Refund::class, 'ticket_id', 'id');
    }

    public function repair(): HasOne
    {
        return $this->hasOne(Repair::class, 'ticket_id', 'id');
    }

    public function internal(): HasMany
    {
        return $this->hasMany(Internal::class, 'ticket_id', 'id');
    }


    public function receipt(): HasOne
    {
        return $this->hasOne(Receipt::class, 'ticket_id', 'id');
    }

    public function replacement(): HasOne
    {
        return $this->hasOne(Replacement::class, 'ticket_id', 'id');
    }

    public function decision_making(): HasOne
    {
        return $this->hasOne(DecisionMaking::class, 'ticket_id', 'id');
    }
    public function agent_notes(): HasMany
    {
        return $this->hasMany(AgentNote::class, 'ticket_id', 'id');
    }
    public function cases_logs(): HasMany
    {
        return $this->hasMany(CasesLog::class, 'ticket_id', 'id');
    }
    public function activity(): HasOne
    {
        return $this->hasOne(Activity::class, 'ticket_id', 'id')
            ->where('type', '=', 'WARRANTY VALIDATION')
            ->orderBy('created_at', 'desc');
    }
    public function validate(): HasOne
    {
        return $this->hasOne(Activity::class, 'ticket_id', 'id')
            ->where('type', '=', 'ASSIGNED TO')
            ->orderBy('created_at', 'desc'); // Adjust the column to your desired ordering field
    }
}
