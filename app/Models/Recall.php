<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Recall extends Model
{
    use HasFactory;

    protected $fillable = [
        'threadId',
        'email',
        'user_id',
        'count',
        'isHide',
        'email_date'
    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function logs(): HasMany
    {
        return $this->hasMany(RecallLog::class, 'recall_id', 'id');
    }
}
