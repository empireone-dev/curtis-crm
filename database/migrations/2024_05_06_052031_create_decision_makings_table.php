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
        Schema::create('decision_makings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('ticket_id')->nullable();
            $table->string('ticket_type')->nullable();
            $table->string('asc')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('repair_cost')->nullable();
            $table->string('repair_notes')->nullable();
            $table->string('retailers_price')->nullable();
            $table->string('discount')->nullable();
            $table->string('after_discount')->nullable();
            $table->string('cheque_no')->nullable();
            $table->string('cheque_amount')->nullable();
            $table->string('date')->nullable();
            $table->string('cost_refund')->nullable();
            $table->string('refund_notes')->nullable();
            $table->string('cost_of_unit')->nullable();
            $table->string('cube_weight')->nullable();
            $table->string('length')->nullable();
            $table->string('width')->nullable();
            $table->string('height')->nullable();
            $table->string('shipping_cost')->nullable();
            $table->string('estimated_cost')->nullable();
            $table->string('instruction')->nullable();
            $table->string('replacement_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('decision_makings');
    }
};
