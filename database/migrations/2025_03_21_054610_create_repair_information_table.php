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
        Schema::create('repair_information', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_id')->nullable();
            $table->string('name')->nullable();
            $table->string('major_labour_details')->nullable();
            $table->string('major_labour_rate')->nullable();
            $table->string('major_labour_notes')->nullable();
            $table->string('minor_labour_details')->nullable();
            $table->string('minor_labour_rate')->nullable();
            $table->string('minor_labour_notes')->nullable();
            $table->string('misc_cost')->nullable();
            $table->string('invoice_date')->nullable();
            $table->string('repair_start')->nullable();
            $table->string('repair_end')->nullable();
            $table->string('invoice_number')->nullable();
            $table->string('sub_total')->nullable();
            $table->string('tax')->nullable();
            $table->string('total')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_information');
    }
};
