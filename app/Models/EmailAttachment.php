<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'email_application_id',
        'name',
        'content_type',
        'size',
        'path'
    ];

    // Establish the inverse relationship
    public function emailApplication()
    {
        return $this->belongsTo(EmailApplication::class);
    }
}
