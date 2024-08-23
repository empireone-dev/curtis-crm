<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductRegistration extends Model
{
    use HasFactory;
    protected $fillable = [
        'address1',
        'address2',
        'city',
        'country',
        'email',
        'fname',
        'lname',
        'model',
        'phone',
        'serial',
        'state',
        'zipcode',
    ];

    public function prf(): HasMany
    {
        return $this->hasMany(ProductRegistrationFile::class,'pr_id','id');
    }

}
