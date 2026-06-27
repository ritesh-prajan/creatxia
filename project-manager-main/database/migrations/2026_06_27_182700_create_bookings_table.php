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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('city');
            $table->enum('project_type', ['Residential', 'Retail', 'Corporate']);
            $table->string('approx_size');
            $table->text('message')->nullable();
            $table->json('moodboard_urls')->nullable();
            $table->enum('preferred_contact', ['whatsapp', 'email', 'call']);
            $table->string('preferred_time')->nullable();
            $table->enum('status', ['new', 'contacted', 'converted'])->default('new');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
