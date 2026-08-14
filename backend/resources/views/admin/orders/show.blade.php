@extends('layouts.admin')

@section('title', 'Order ' . $order->order_number)
@section('header', 'Order ' . $order->order_number)

@section('actions')
<a href="/admin/orders" class="text-sm text-gray-400 hover:text-white transition-colors">&larr; Back to Orders</a>
@endsection

@section('content')
<div class="max-w-4xl">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Order Details -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Order Info -->
            <div class="bg-[#111113] border border-gray-800 rounded-xl p-6">
                <h2 class="text-lg font-semibold text-white mb-4">Order Details</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Order Number</p>
                        <p class="text-sm font-medium text-white">{{ $order->order_number }}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Date</p>
                        <p class="text-sm text-white">{{ $order->created_at->format('M d, Y \a\t g:i A') }}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Payment Method</p>
                        <p class="text-sm text-white">Card ending in {{ $order->card_last_four }}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Status</p>
                        <form method="POST" action="/admin/orders/{{ $order->id }}/status" class="inline-flex">
                            @csrf
                            @method('PATCH')
                            <select name="status" onchange="this.form.submit()"
                                class="text-sm px-3 py-1 rounded-lg border border-gray-700 bg-[#1a1a1c] text-white focus:outline-none focus:border-violet-500">
                                @foreach(['pending', 'processing', 'completed', 'cancelled'] as $status)
                                    <option value="{{ $status }}" {{ $order->status === $status ? 'selected' : '' }}>{{ ucfirst($status) }}</option>
                                @endforeach
                            </select>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Items -->
            <div class="bg-[#111113] border border-gray-800 rounded-xl">
                <div class="px-6 py-4 border-b border-gray-800">
                    <h2 class="text-lg font-semibold text-white">Items</h2>
                </div>
                <div class="divide-y divide-gray-800">
                    @foreach($order->items as $item)
                        <div class="px-6 py-4 flex items-center gap-4">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style="background: {{ $item->product->gradient ?? 'var(--bg-secondary)' }}">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-white truncate">{{ $item->product_name }}</p>
                                <p class="text-xs text-gray-500">Qty: {{ $item->quantity }}</p>
                            </div>
                            <p class="text-sm font-medium text-white">${{ number_format($item->price * $item->quantity, 2) }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
            <!-- Customer -->
            <div class="bg-[#111113] border border-gray-800 rounded-xl p-6">
                <h2 class="text-lg font-semibold text-white mb-4">Customer</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Name</p>
                        <p class="text-sm text-white">{{ $order->customer_name }}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Email</p>
                        <p class="text-sm text-white">{{ $order->customer_email }}</p>
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="bg-[#111113] border border-gray-800 rounded-xl p-6">
                <h2 class="text-lg font-semibold text-white mb-4">Summary</h2>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Subtotal</span>
                        <span class="text-white">${{ number_format($order->subtotal, 2) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Processing</span>
                        <span class="text-white">Free</span>
                    </div>
                    <div class="flex justify-between text-sm font-semibold pt-2 border-t border-gray-800">
                        <span class="text-white">Total</span>
                        <span class="text-white">${{ number_format($order->total, 2) }}</span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="bg-[#111113] border border-gray-800 rounded-xl p-6">
                <h2 class="text-lg font-semibold text-white mb-4">Actions</h2>
                <div class="space-y-2">
                    <form method="POST" action="/admin/orders/{{ $order->id }}" onsubmit="return confirm('Delete this order permanently?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="w-full py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                            Delete Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
