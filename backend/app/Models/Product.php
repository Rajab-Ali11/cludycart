<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'author', 'desc', 'price', 'rating',
        'reviews_count', 'pages', 'category', 'gradient', 'accent',
        'cover_image', 'tag', 'featured', 'active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
        'featured' => 'boolean',
        'active' => 'boolean',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getCoverUrlAttribute(): ?string
    {
        if ($this->cover_image) {
            return '/uploads/books/' . $this->cover_image;
        }
        return null;
    }
}
