<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        // 1. Sử dụng paginate(10) thay vì all()
        // 2. Thêm with('images') để lấy luôn ảnh (Eager Loading), tránh lỗi N+1 query
        // 3. latest() để đưa sản phẩm mới nhất lên đầu trang 1
        $products = Product::with('images')
            ->latest()
            ->paginate(5);

        // Trả về JSON, Laravel sẽ tự động bao bọc dữ liệu phân trang
        return response()->json($products);

    }

    public function byCategory($slug)
    {
        $products = Product::with('images')
            ->whereHas('category', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })
            ->latest()
            ->paginate(5);

        return response()->json($products);
    }

    public function newestProducts()
    {
        $products = Product::with('images')
            ->latest()
            ->paginate(5);

        // Trả về JSON, Laravel sẽ tự động bao bọc dữ liệu phân trang
        return response()->json($products);
    }

    public function show($id)
    {
        // Eager load images và variants
        $product = Product::with(['images', 'variants'])->findOrFail($id);
        
        // Lấy danh sách Color và Size duy nhất (Unique)
        $colors = $product->variants->pluck('color')->unique()->values()->toArray();
        $sizes = $product->variants->pluck('size')->unique()->values()->toArray();
        
        // Tạo variant_map để Frontend truy xuất nhanh theo key "Color-Size"
        $variantMap = $product->variants->mapWithKeys(function ($item) {
            return [$item->color . '-' . $item->size => [
                'id' => $item->id,
                'stock_quantity' => $item->stock_quantity,
                'sku' => $item->sku,
                'price' => $item->base_price // Nếu mỗi variant có giá riêng
            ]];
        });

        // Trả về dữ liệu đã được cấu trúc lại
        return response()->json([
            'data' => $product,
            'options' => [
                'colors' => $colors,
                'sizes' => $sizes,
            ],
            'variant_map' => $variantMap
        ]);
    }
}
