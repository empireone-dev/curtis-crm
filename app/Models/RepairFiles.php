<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairFiles extends Model
{
    use HasFactory;
    protected $fillable = [
        'repair_information_id',
        'file',
        'type'
    ];
}
