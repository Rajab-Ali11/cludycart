<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('author', 'ilike', "%{$search}%")
                  ->orWhere('category', 'ilike', "%{$search}%");
            });
        }

        if ($category = $request->input('category')) {
            $query->where('category', $category);
        }

        if ($request->input('status') === 'active') {
            $query->where('active', true);
        } elseif ($request->input('status') === 'inactive') {
            $query->where('active', false);
        }

        $products = $query->latest()->paginate(12)->withQueryString();
        $categories = Product::distinct()->pluck('category')->filter();

        return view('admin.products.index', compact('products', 'categories'));
    }

    public function create()
    {
        return view('admin.products.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'desc' => 'required|string',
            'price' => 'required|numeric|min:0',
            'pages' => 'required|integer|min:1',
            'category' => 'required|string',
            'gradient' => 'nullable|string',
            'accent' => 'nullable|string',
            'cover_image' => 'nullable|image|max:2048',
            'tag' => 'nullable|string|max:50',
            'featured' => 'boolean',
            'active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['featured'] = $request->boolean('featured');
        $validated['active'] = $request->boolean('active', true);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('books', 'public');
        }

        Product::create($validated);

        return redirect('/admin/products')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'desc' => 'required|string',
            'price' => 'required|numeric|min:0',
            'pages' => 'required|integer|min:1',
            'category' => 'required|string',
            'gradient' => 'nullable|string',
            'accent' => 'nullable|string',
            'cover_image' => 'nullable|image|max:2048',
            'tag' => 'nullable|string|max:50',
            'featured' => 'boolean',
            'active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['featured'] = $request->boolean('featured');
        $validated['active'] = $request->boolean('active', true);

        if ($request->hasFile('cover_image')) {
            // Delete old image
            if ($product->cover_image) {
                \Storage::disk('public')->delete($product->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('books', 'public');
        }

        $product->update($validated);

        return redirect('/admin/products')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        if ($product->cover_image) {
            \Storage::disk('public')->delete($product->cover_image);
        }

        $product->delete();

        return redirect('/admin/products')->with('success', 'Product deleted successfully.');
    }

    public function toggle(Product $product)
    {
        $product->update(['active' => !$product->active]);

        return back()->with('success', "Product {$product->name} is now " . ($product->active ? 'active' : 'inactive') . ".");
    }
}
