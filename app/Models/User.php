<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'users';
    protected $fillable = [
        'emp_id',
        'google_id',
        'name',
        'email',
        'password',
        'role_id',
        'agent_type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'user_id', 'id');
    }
    public function role(): HasOne
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }

    public function due_tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'user_id', 'id')->where([
            ['ticket_id', '<>', null],
            ['cases_status', '<>', 'hide'],
            ['is_reply', '=', true],
        ]);
    }
    public function getDueTicketsToday()
    {
        $today = now()->format('Y-m-d');

        $tickets = $this->relationLoaded('due_tickets')
            ? $this->due_tickets
            : $this->due_tickets()->get();

        return $tickets->filter(function ($ticket) use ($today) {
            $emailDate = Carbon::parse($ticket->email_date);
            $dayOfWeek = $emailDate->dayOfWeekIso;

            $addDays = match ($dayOfWeek) {
                4, 5 => 4,
                6 => 3,
                7 => 2,
                default => 2,
            };

            $dueDate = $emailDate->addDays($addDays)->format('Y-m-d');
            return $dueDate === $today;
        });
    }



    public function getOverDues()
    {
        $today = now()->format('Y-m-d');

        $tickets = $this->relationLoaded('due_tickets')
            ? $this->due_tickets
            : $this->due_tickets()->get();

        return $tickets->filter(function ($ticket) use ($today) {
            $emailDate = Carbon::parse($ticket->email_date);
            $dayOfWeek = $emailDate->dayOfWeekIso;

            $addDays = match ($dayOfWeek) {
                4, 5 => 4,
                6 => 3,
                7 => 2,
                default => 2,
            };

            $dueDate = $emailDate->addDays($addDays)->format('Y-m-d');
            return $dueDate < $today;
        });
    }
    public function getSeparatedDues()
    {
        return [
            'due_today' => $this->getDueTicketsToday(),
            'over_due' => $this->getOverDues(),
        ];
    }
}
