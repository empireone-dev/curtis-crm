<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectEmail extends Model
{
    use HasFactory;
    protected $fillable = [
        'threadId',
        'email',
        'user_id',
        'count',
        'isHide',
    ];
    
}
