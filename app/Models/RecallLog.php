<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecallLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'recall_id',
        'user_id',
        'remarks',
        'isEscalate',
        'case_type',
        'case_status',
        'log_from',
    ];
}
