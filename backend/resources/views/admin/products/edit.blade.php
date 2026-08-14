@extends('layouts.admin')

@section('title', isset($product) ? 'Edit Product' : 'Add Product')
@section('header', isset($product) ? 'Edit Product' : 'Add Product')

@section('content')
<div class="max-w-3xl">
    <form method="POST" action="{{ isset($product) ? '/admin/products/' . $product->id : '/admin/products' }}" enctype="multipart/form-data">
        @csrf
        @if(isset($product))
            @method('PUT')
        @endif

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <div class="md:col-span-2">
                <label for="name" class="block text-sm font-medium text-gray-400 mb-1.5">Book Title</label>
                <input type="text" id="name" name="name" value="{{ old('name', $product->name ?? '') }}" required
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
                @error('name') <p class="text-xs text-red-400 mt-1">{{ $message }}</p> @enderror
            </div>

            <!-- Author -->
            <div>
                <label for="author" class="block text-sm font-medium text-gray-400 mb-1.5">Author</label>
                <input type="text" id="author" name="author" value="{{ old('author', $product->author ?? '') }}" required
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
                @error('author') <p class="text-xs text-red-400 mt-1">{{ $message }}</p> @enderror
            </div>

            <!-- Category -->
            <div>
                <label for="category" class="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                <select id="category" name="category" required
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
                    <option value="">Select category</option>
                    @foreach(['business', 'tech', 'supplements', 'marketing', 'psychology', 'finance', 'design'] as $cat)
                        <option value="{{ $cat }}" {{ old('category', $product->category ?? '') === $cat ? 'selected' : '' }}>{{ ucfirst($cat) }}</option>
                    @endforeach
                </select>
                @error('category') <p class="text-xs text-red-400 mt-1">{{ $message }}</p> @enderror
            </div>

            <!-- Price -->
            <div>
                <label for="price" class="block text-sm font-medium text-gray-400 mb-1.5">Price ($)</label>
                <input type="number" id="price" name="price" value="{{ old('price', $product->price ?? '') }}" step="0.01" min="0" required
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
                @error('price') <p class="text-xs text-red-400 mt-1">{{ $message }}</p> @enderror
            </div>

            <!-- Pages -->
            <div>
                <label for="pages" class="block text-sm font-medium text-gray-400 mb-1.5">Pages</label>
                <input type="number" id="pages" name="pages" value="{{ old('pages', $product->pages ?? '') }}" min="1" required
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
                @error('pages') <p class="text-xs text-red-400 mt-1">{{ $message }}</p> @enderror
            </div>

            <!-- Tag -->
            <div>
                <label for="tag" class="block text-sm font-medium text-gray-400 mb-1.5">Tag (optional)</label>
                <input type="text" id="tag" name="tag" value="{{ old('tag', $product->tag ?? '') }}" placeholder="e.g. New, Bestseller"
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
            </div>

            <!-- Gradient -->
            <div>
                <label for="gradient" class="block text-sm font-medium text-gray-400 mb-1.5">Cover Gradient (CSS)</label>
                <input type="text" id="gradient" name="gradient" value="{{ old('gradient', $product->gradient ?? 'linear-gradient(135deg, #1e40af, #3b82f6)') }}"
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500 font-mono text-xs">
            </div>

            <!-- Accent -->
            <div>
                <label for="accent" class="block text-sm font-medium text-gray-400 mb-1.5">Accent Color (CSS)</label>
                <input type="text" id="accent" name="accent" value="{{ old('accent', $product->accent ?? '#bfdbfe') }}"
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
            </div>

            <!-- Cover Image -->
            <div class="md:col-span-2">
                <label for="cover_image" class="block text-sm font-medium text-gray-400 mb-1.5">Cover Image (optional)</label>
                <input type="file" id="cover_image" name="cover_image" accept="image/*"
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-violet-600 file:text-white file:text-sm file:cursor-pointer">
                @if(isset($product) && $product->cover_image)
                    <p class="text-xs text-gray-500 mt-1">Current: {{ $product->cover_image }}</p>
                @endif
            </div>

            <!-- Description -->
            <div class="md:col-span-2">
                <label for="desc" class="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                <textarea id="desc" name="desc" rows="3" required
                    class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">{{ old('desc', $product->desc ?? '') }}</textarea>
                @error('desc') <p class="text-xs text-red-400 mt-1">{{ $message }}</p> @enderror
            </div>

            <!-- Toggles -->
            <div class="md:col-span-2 flex items-center gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="featured" value="1" {{ old('featured', $product->featured ?? false) ? 'checked' : '' }}
                        class="w-4 h-4 rounded border-gray-600 bg-[#1a1a1c] text-violet-500 focus:ring-violet-500">
                    <span class="text-sm text-gray-400">Featured on homepage</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="active" value="1" {{ old('active', $product->active ?? true) ? 'checked' : '' }}
                        class="w-4 h-4 rounded border-gray-600 bg-[#1a1a1c] text-violet-500 focus:ring-violet-500">
                    <span class="text-sm text-gray-400">Active (visible on store)</span>
                </label>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 mt-8 pt-6 border-t border-gray-800">
            <button type="submit" class="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-colors">
                {{ isset($product) ? 'Update Product' : 'Create Product' }}
            </button>
            <a href="/admin/products" class="px-6 py-2.5 text-gray-400 hover:text-white transition-colors">Cancel</a>
        </div>
    </form>
</div>
@endsection
