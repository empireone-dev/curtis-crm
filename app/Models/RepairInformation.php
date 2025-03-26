<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RepairInformation extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'name',
        'major_labour_details',
        'major_labour_rate',
        'major_labour_notes',
        'minor_labour_details',
        'minor_labour_rate',
        'minor_labour_notes',
        'misc_cost',
        'invoice_date',
        'repair_start',
        'repair_end',
        'sub_total',
        'invoice_number',
        'tax',
        'total',
    ];

    public function attachments1(): HasMany
    {
        return $this->hasMany(RepairFiles::class, 'repair_information_id', 'ticket_id')->where('type','=','attachment');
    }
    public function invoices1(): HasMany
    {
        return $this->hasMany(RepairFiles::class, 'repair_information_id', 'ticket_id')->where('type','=','invoice');
    }
}
