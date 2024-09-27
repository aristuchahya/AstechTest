<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

     protected $table = "transactions";
    protected $fillable = ['type', 'category', 'amount', 'total', 'transaction_date'];
     protected $casts = [
        'transaction_date' => 'date', 
    ];
}
