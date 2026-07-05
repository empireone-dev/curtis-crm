<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'from_email',
        'to_email',
        'email_date',
        'message_id',
        'thread_id',
        'message_count',
        'source',
        'body',
        'threads'
    ]; 

    protected $casts = [
        'email_date' => 'datetime',
        'threads' => 'array',
    ];

    public function attachments()
    {
        return $this->hasMany(EmailAttachment::class);
    }
}
