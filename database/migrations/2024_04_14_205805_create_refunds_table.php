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
        Schema::create('refunds', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('ticket_id')->nullable();
            $table->double('retailers_price',8, 2)->nullable();
            $table->double('discount',8, 2)->nullable();
            $table->double('after_discount',8, 2)->nullable();
            $table->string('cheque_no')->nullable();
            $table->double('cheque_amount',8, 2)->nullable();
            $table->double('cost_refund',8, 2)->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refunds');
    }
};
