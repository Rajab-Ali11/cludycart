@extends('layouts.admin')

@section('title', 'Products')
@section('header', 'Products')

@section('actions')
<a href="/admin/products/create" class="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Add Product
</a>
@endsection

@section('content')
<!-- Filters -->
<div class="flex flex-wrap gap-3 mb-6">
    <form method="GET" class="flex flex-wrap gap-3">
        <input
            type="text"
            name="search"
            value="{{ request('search') }}"
            placeholder="Search products..."
            class="px-4 py-2 bg-[#1a1a1c] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 w-64"
        >
        <select name="category" class="px-4 py-2 bg-[#1a1a1c] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500">
            <option value="">All Categories</option>
            @foreach($categories as $cat)
                <option value="{{ $cat }}" {{ request('category') === $cat ? 'selected' : '' }}>{{ ucfirst($cat) }}</option>
            @endforeach
        </select>
        <select name="status" class="px-4 py-2 bg-[#1a1a1c] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500">
            <option value="">All Status</option>
            <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Active</option>
            <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Inactive</option>
        </select>
        <button type="submit" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">Filter</button>
        @if(request('search') || request('category') || request('status'))
            <a href="/admin/products" class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Clear</a>
        @endif
    </form>
</div>

<!-- Products Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    @forelse($products as $product)
        <div class="bg-[#111113] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
            <div class="h-32 flex items-center justify-center" style="background: {{ $product->gradient }}">
                @if($product->cover_image)
                    <img src="{{ $product->cover_url }}" alt="{{ $product->name }}" class="w-full h-full object-cover">
                @else
                    <span class="text-white/80 text-sm font-medium">{{ $product->name }}</span>
                @endif
            </div>
            <div class="p-4">
                <div class="flex items-start justify-between gap-2 mb-2">
                    <h3 class="text-sm font-semibold text-white truncate">{{ $product->name }}</h3>
                    @if($product->tag)
                        <span class="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400">{{ $product->tag }}</span>
                    @endif
                </div>
                <p class="text-xs text-gray-500 mb-3">{{ $product->author }} &middot; {{ ucfirst($product->category) }}</p>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-white">${{ number_format($product->price, 2) }}</span>
                    <div class="flex items-center gap-1 text-xs text-gray-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {{ $product->rating }}
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
                    <a href="/admin/products/{{ $product->id }}/edit" class="flex-1 text-center py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-[#1a1a1c] hover:bg-gray-700 rounded-lg transition-colors">Edit</a>
                    <form method="POST" action="/admin/products/{{ $product->id }}/toggle" class="flex-1">
                        @csrf
                        <button type="submit" class="w-full py-1.5 text-xs font-medium {{ $product->active ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/10' : 'text-gray-500 hover:text-gray-400 bg-[#1a1a1c]' }} rounded-lg transition-colors">
                            {{ $product->active ? 'Active' : 'Inactive' }}
                        </button>
                    </form>
                    <form method="POST" action="/admin/products/{{ $product->id }}" onsubmit="return confirm('Delete this product?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="py-1.5 px-3 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg transition-colors">Del</button>
                    </form>
                </div>
            </div>
        </div>
    @empty
        <div class="col-span-full text-center py-16 text-gray-500">
            <p class="text-lg mb-2">No products found</p>
            <a href="/admin/products/create" class="text-violet-400 hover:text-violet-300 text-sm">Add your first product</a>
        </div>
    @endforelse
</div>

<!-- Pagination -->
<div class="mt-6">
    {{ $products->links() }}
</div>
@endsection
