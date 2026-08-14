<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('author');
            $table->text('desc');
            $table->decimal('price', 8, 2);
            $table->decimal('rating', 3, 1)->default(4.5);
            $table->integer('reviews_count')->default(0);
            $table->integer('pages')->default(0);
            $table->string('category'); // supplements, business, tech, etc
            $table->string('gradient')->nullable(); // CSS gradient for cover
            $table->string('accent')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('tag')->nullable(); // New, Top Rated, etc
            $table->boolean('featured')->default(false);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
