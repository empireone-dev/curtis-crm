<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'asc',
        'repair_cost',
        'instruction',
        'notes',
    ];
}
