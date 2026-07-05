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
        Schema::create('email_attachments', function (Blueprint $table) {
            $table->id();
            // Foreign key linking to the applications table
            $table->foreignId('email_application_id')->constrained()->cascadeOnDelete();

            $table->string('name');
            $table->string('content_type')->nullable();
            $table->unsignedBigInteger('size')->nullable(); // unsignedBigInteger in case of large files
            $table->string('path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_attachments');
    }
};
