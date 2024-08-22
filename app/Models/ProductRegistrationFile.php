<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductRegistrationFile extends Model
{
    use HasFactory;
    protected $fillable = [
        'pr_id',
        'url'
    ];
}
