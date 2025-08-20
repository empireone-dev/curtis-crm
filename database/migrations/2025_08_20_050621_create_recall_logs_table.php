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
        Schema::create('recall_logs', function (Blueprint $table) {
            $table->id();
            $table->string('recall_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->string('remarks')->nullable();
            $table->string('isEscalate')->nullable();
            $table->string('case_type')->nullable();
            $table->string('case_status')->nullable();
            $table->string('log_from')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recall_logs');
    }
};
