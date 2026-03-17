<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name', 
        'description', 
        'base_price', 
        'discount_price', 
        'discount_percent', 
        'is_on_sale'
    ];

    // Quan hệ lấy danh sách ảnh
    public function images() {
        return $this->hasMany(ProductImage::class,'product_id');

    }

    // Quan hệ lấy các biến thể size/màu
    public function variants() {
        return $this->hasMany(ProductVariant::class,'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class, 'collection_product');
    }
}
