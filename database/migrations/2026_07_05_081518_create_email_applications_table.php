<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('email_applications', function (Blueprint $table) {
            $table->id();
            $table->string('subject')->index();
            $table->string('from_email');
            $table->string('to_email');
            $table->dateTime('email_date');
            $table->string('message_id')->unique();
            $table->string('thread_id')->index();
            $table->integer('message_count')->default(1);
            $table->string('source')->nullable();
            $table->longText('body')->nullable();
            $table->json('threads')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_applications');
    }
};
