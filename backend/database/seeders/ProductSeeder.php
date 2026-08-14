<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Business
            [
                'name' => 'Startup Playbook',
                'slug' => 'startup-playbook',
                'author' => 'James Chen',
                'desc' => 'From zero to launch. Real strategies, not theory. The handbook every first-time founder needs.',
                'price' => 9.99,
                'rating' => 4.8,
                'reviews_count' => 4321,
                'pages' => 210,
                'category' => 'business',
                'gradient' => 'linear-gradient(135deg, #1e40af, #3b82f6)',
                'accent' => '#bfdbfe',
                'tag' => 'Bestseller',
                'featured' => true,
            ],
            [
                'name' => 'Brand Identity Workshop',
                'slug' => 'brand-identity-workshop',
                'author' => 'Olivia Park',
                'desc' => 'Build a brand people remember. Voice, visuals, values. Includes logo templates and exercises.',
                'price' => 11.49,
                'rating' => 4.9,
                'reviews_count' => 1780,
                'pages' => 156,
                'category' => 'business',
                'gradient' => 'linear-gradient(135deg, #059669, #34d399)',
                'accent' => '#a7f3d0',
                'tag' => 'New',
                'featured' => true,
            ],

            // Technology
            [
                'name' => 'Practical AI for Developers',
                'slug' => 'practical-ai-for-developers',
                'author' => 'Marcus Rivera',
                'desc' => 'Skip the hype. Build real things with LLMs, embeddings, and agents. Code samples in Python and JS.',
                'price' => 12.99,
                'rating' => 4.9,
                'reviews_count' => 3920,
                'pages' => 268,
                'category' => 'tech',
                'gradient' => 'linear-gradient(135deg, #9333ea, #c084fc)',
                'accent' => '#e9d5ff',
                'tag' => 'Top Rated',
                'featured' => true,
            ],
            [
                'name' => 'Microservices from Scratch',
                'slug' => 'microservices-from-scratch',
                'author' => 'Anika Patel',
                'desc' => 'A practical guide to breaking apart a monolith. Docker, messaging, and service mesh explained.',
                'price' => 10.99,
                'rating' => 4.7,
                'reviews_count' => 2450,
                'pages' => 202,
                'category' => 'tech',
                'gradient' => 'linear-gradient(135deg, #ea580c, #f97316)',
                'accent' => '#fed7aa',
                'featured' => true,
            ],

            // Supplements
            [
                'name' => "The Athlete's Guide to Supplements",
                'slug' => 'athletes-guide-to-supplements',
                'author' => 'Dr. Sarah Mitchell',
                'desc' => 'Evidence-based guide to sports nutrition. Creatine, protein, and beyond. No BS, just science.',
                'price' => 11.99,
                'rating' => 4.7,
                'reviews_count' => 3420,
                'pages' => 198,
                'category' => 'supplements',
                'gradient' => 'linear-gradient(135deg, #16a34a, #22c55e)',
                'accent' => '#bbf7d0',
                'tag' => 'New',
            ],
            [
                'name' => 'Nootropics Handbook',
                'slug' => 'nootropics-handbook',
                'author' => 'Dr. James Park',
                'desc' => "Brain-boosting supplements explained. L-theanine, alpha-GPC, lion's mane, and 40+ compounds.",
                'price' => 13.49,
                'rating' => 4.8,
                'reviews_count' => 2870,
                'pages' => 264,
                'category' => 'supplements',
                'gradient' => 'linear-gradient(135deg, #7c3aed, #c084fc)',
                'accent' => '#e9d5ff',
                'tag' => 'Top Rated',
            ],
            [
                'name' => 'Vitamin D: The Sunshine Vitamin',
                'slug' => 'vitamin-d-the-sunshine-vitamin',
                'author' => 'Dr. Lisa Chen',
                'desc' => 'Everything you need to know about vitamin D. Dosage, testing, deficiency, and optimal health.',
                'price' => 9.99,
                'rating' => 4.6,
                'reviews_count' => 4150,
                'pages' => 176,
                'category' => 'supplements',
                'gradient' => 'linear-gradient(135deg, #ea580c, #f97316)',
                'accent' => '#fed7aa',
            ],
            [
                'name' => 'Omega-3 Deep Dive',
                'slug' => 'omega-3-deep-dive',
                'author' => 'Dr. Michael Torres',
                'desc' => "The science of fish oil, EPA/DHA, and inflammation. Which brands work, which don't.",
                'price' => 10.99,
                'rating' => 4.7,
                'reviews_count' => 2340,
                'pages' => 212,
                'category' => 'supplements',
                'gradient' => 'linear-gradient(135deg, #0284c7, #38bdf8)',
                'accent' => '#bae6fd',
            ],

            // Marketing
            [
                'name' => 'SEO in 2025',
                'slug' => 'seo-in-2025',
                'author' => 'Anika Patel',
                'desc' => 'Search engine optimization that still works. Core Web Vitals, AI overviews, and link building.',
                'price' => 8.49,
                'rating' => 4.6,
                'reviews_count' => 4120,
                'pages' => 168,
                'category' => 'marketing',
                'gradient' => 'linear-gradient(135deg, #dc2626, #f87171)',
                'accent' => '#fecaca',
                'featured' => true,
            ],
            [
                'name' => 'Social Media Content Lab',
                'slug' => 'social-media-content-lab',
                'author' => 'Lena Okafor',
                'desc' => '30 days of posts, captions, and hooks. Templates for Instagram, TikTok, LinkedIn, and X.',
                'price' => 9.49,
                'rating' => 4.5,
                'reviews_count' => 1340,
                'pages' => 134,
                'category' => 'marketing',
                'gradient' => 'linear-gradient(135deg, #0891b2, #22d3ee)',
                'accent' => '#a5f3fc',
            ],

            // Psychology
            [
                'name' => 'Cognitive Biases Field Guide',
                'slug' => 'cognitive-biases-field-guide',
                'author' => 'Dr. R. Sato',
                'desc' => '60 mental shortcuts that shape your decisions. Real examples, clear diagrams, zero fluff.',
                'price' => 7.99,
                'rating' => 4.8,
                'reviews_count' => 6210,
                'pages' => 142,
                'category' => 'psychology',
                'gradient' => 'linear-gradient(135deg, #4338ca, #818cf8)',
                'accent' => '#c7d2fe',
                'tag' => 'Bestseller',
                'featured' => true,
            ],
            [
                'name' => 'Negotiation Tactics',
                'slug' => 'negotiation-tactics',
                'author' => 'Elena Voss',
                'desc' => 'Salary, business, or life. The strategies that actually work. Includes roleplay scripts.',
                'price' => 10.49,
                'rating' => 4.7,
                'reviews_count' => 3210,
                'pages' => 180,
                'category' => 'psychology',
                'gradient' => 'linear-gradient(135deg, #b91c1c, #ef4444)',
                'accent' => '#fca5a5',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                array_merge($product, [
                    'active' => true,
                ])
            );
        }
    }
}
