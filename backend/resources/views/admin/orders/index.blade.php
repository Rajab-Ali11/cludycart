@extends('layouts.admin')

@section('title', 'Orders')
@section('header', 'Orders')

@section('content')
<!-- Filters -->
<div class="flex flex-wrap gap-3 mb-6">
    <form method="GET" class="flex flex-wrap gap-3">
        <input
            type="text"
            name="search"
            value="{{ request('search') }}"
            placeholder="Search orders..."
            class="px-4 py-2 bg-[#1a1a1c] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 w-64"
        >
        <select name="status" class="px-4 py-2 bg-[#1a1a1c] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500">
            <option value="">All Status</option>
            <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option>
            <option value="processing" {{ request('status') === 'processing' ? 'selected' : '' }}>Processing</option>
            <option value="completed" {{ request('status') === 'completed' ? 'selected' : '' }}>Completed</option>
            <option value="cancelled" {{ request('status') === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
        </select>
        <button type="submit" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">Filter</button>
        @if(request('search') || request('status'))
            <a href="/admin/orders" class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Clear</a>
        @endif
    </form>
</div>

<!-- Orders Table -->
<div class="bg-[#111113] border border-gray-800 rounded-xl overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead>
                <tr class="border-b border-gray-800">
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
                @forelse($orders as $order)
                    <tr class="hover:bg-white/[0.02]">
                        <td class="px-6 py-4">
                            <a href="/admin/orders/{{ $order->id }}" class="text-sm font-medium text-white hover:text-violet-400">
                                {{ $order->order_number }}
                            </a>
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-sm text-white">{{ $order->customer_name }}</p>
                            <p class="text-xs text-gray-500">{{ $order->customer_email }}</p>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-400">{{ $order->items->count() }}</td>
                        <td class="px-6 py-4 text-sm font-medium text-white">${{ number_format($order->total, 2) }}</td>
                        <td class="px-6 py-4">
                            <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium
                                {{ $order->status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : '' }}
                                {{ $order->status === 'pending' ? 'bg-amber-500/10 text-amber-400' : '' }}
                                {{ $order->status === 'processing' ? 'bg-blue-500/10 text-blue-400' : '' }}
                                {{ $order->status === 'cancelled' ? 'bg-red-500/10 text-red-400' : '' }}">
                                {{ ucfirst($order->status) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ $order->created_at->format('M d, Y') }}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-2">
                                <a href="/admin/orders/{{ $order->id }}" class="text-xs text-gray-400 hover:text-white">View</a>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                            No orders found.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<!-- Pagination -->
<div class="mt-6">
    {{ $orders->links() }}
</div>
@endsection
