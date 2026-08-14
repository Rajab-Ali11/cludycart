<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    public function products(Request $request)
    {
        $query = Product::where('active', true);

        if ($category = $request->input('category')) {
            $query->where('category', $category);
        }

        if ($featured = $request->boolean('featured')) {
            $query->where('featured', true);
        }

        $products = $query->latest()->get();

        return response()->json($products);
    }

    public function product($slug)
    {
        $product = Product::where('slug', $slug)->where('active', true)->firstOrFail();
        return response()->json($product);
    }

    public function storeOrder(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'card_number' => 'required|string|max:19',
            'card_expiry' => 'required|string|max:5',
            'card_cvc' => 'required|string|max:4',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            $order = DB::transaction(function () use ($validated) {
                $subtotal = 0;
                $orderItems = [];

                foreach ($validated['items'] as $item) {
                    $product = Product::findOrFail($item['id']);
                    $quantity = $item['quantity'];
                    $subtotal += $product->price * $quantity;

                    $orderItems[] = [
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'price' => $product->price,
                        'quantity' => $quantity,
                    ];
                }

                $order = Order::create([
                    'customer_name' => $validated['customer_name'],
                    'customer_email' => $validated['customer_email'],
                    'subtotal' => $subtotal,
                    'processing_fee' => 0,
                    'total' => $subtotal,
                    'status' => 'pending',
                    'payment_method' => 'card',
                    'card_last_four' => substr(str_replace(' ', '', $validated['card_number']), -4),
                ]);

                foreach ($orderItems as $item) {
                    $order->items()->create($item);
                }

                return $order;
            });

            return response()->json([
                'success' => true,
                'order' => $order->load('items'),
                'message' => "Order {$order->order_number} placed successfully!",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to process order. Please try again.',
            ], 500);
        }
    }
}
