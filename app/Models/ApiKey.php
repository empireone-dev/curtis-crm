<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ApiKey extends Model
{
    protected $fillable = ['user_id', 'key'];

    // Generate a new API key
    public static function generate($userId = null)
    {
        $plainKey = Str::random(60); // secure random string
        self::create([
            'user_id' => $userId,
            'key' => hash('sha256', $plainKey), // store hashed key
        ]);
        return $plainKey; // return plain key for the client
    }
}
