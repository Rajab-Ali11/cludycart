@extends('layouts.admin')

@section('title', 'Dashboard')
@section('header', 'Dashboard')

@section('content')
<!-- Stats Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="stat-card bg-[#111113] border border-gray-800 rounded-xl p-5">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <span class="text-sm text-gray-500">Products</span>
        </div>
        <p class="text-3xl font-bold text-white">{{ $stats['total_products'] }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ $stats['active_products'] }} active</p>
    </div>

    <div class="stat-card bg-[#111113] border border-gray-800 rounded-xl p-5">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <span class="text-sm text-gray-500">Total Orders</span>
        </div>
        <p class="text-3xl font-bold text-white">{{ $stats['total_orders'] }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ $stats['pending_orders'] }} pending</p>
    </div>

    <div class="stat-card bg-[#111113] border border-gray-800 rounded-xl p-5">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <span class="text-sm text-gray-500">Total Revenue</span>
        </div>
        <p class="text-3xl font-bold text-white">${{ number_format($stats['total_revenue'], 2) }}</p>
        <p class="text-xs text-gray-500 mt-1">${{ number_format($stats['monthly_revenue'], 2) }} this month</p>
    </div>

    <div class="stat-card bg-[#111113] border border-gray-800 rounded-xl p-5">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span class="text-sm text-gray-500">Pending</span>
        </div>
        <p class="text-3xl font-bold text-white">{{ $stats['pending_orders'] }}</p>
        <p class="text-xs text-gray-500 mt-1">orders to process</p>
    </div>
</div>

<!-- Recent Orders -->
<div class="bg-[#111113] border border-gray-800 rounded-xl">
    <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-white">Recent Orders</h2>
        <a href="/admin/orders" class="text-sm text-violet-400 hover:text-violet-300">View all</a>
    </div>
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
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
                @forelse($recentOrders as $order)
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
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                            No orders yet.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
