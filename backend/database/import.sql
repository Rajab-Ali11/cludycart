CREATE TABLE IF NOT EXISTS `products` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `author` VARCHAR(255) NOT NULL,
  `desc` TEXT NOT NULL,
  `price` DECIMAL(8,2) NOT NULL,
  `rating` DECIMAL(3,1) DEFAULT 4.5,
  `reviews_count` INT DEFAULT 0,
  `pages` INT DEFAULT 0,
  `category` VARCHAR(255) NOT NULL,
  `gradient` VARCHAR(255) NULL,
  `accent` VARCHAR(255) NULL,
  `cover_image` VARCHAR(255) NULL,
  `tag` VARCHAR(255) NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(255) NOT NULL UNIQUE,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_email` VARCHAR(255) NOT NULL,
  `subtotal` DECIMAL(8,2) NOT NULL,
  `processing_fee` DECIMAL(8,2) DEFAULT 0,
  `total` DECIMAL(8,2) NOT NULL,
  `status` VARCHAR(255) DEFAULT 'pending',
  `payment_method` VARCHAR(255) DEFAULT 'card',
  `card_last_four` CHAR(4) NULL,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  INDEX `status_index` (`status`),
  INDEX `created_at_index` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(8,2) NOT NULL,
  `quantity` INT DEFAULT 1,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed admin user (password: password)
INSERT INTO `admin_users` (`name`, `email`, `password`, `created_at`, `updated_at`) VALUES
('Admin', 'admin@cludycart.com', '$2y$12$QjZ8kGzLhN0XZx4YqXhOkeDjMhFcCqKZb3LhTqHfZ5K6JqYm8GzUa', NOW(), NOW());

-- Seed products
INSERT INTO `products` (`name`, `slug`, `author`, `desc`, `price`, `rating`, `reviews_count`, `pages`, `category`, `gradient`, `accent`, `cover_image`, `tag`, `featured`, `active`, `created_at`, `updated_at`) VALUES
('Startup Playbook', 'startup-playbook', 'James Chen', 'From zero to launch. Real strategies, not theory. The handbook every first-time founder needs.', 9.99, 4.8, 4321, 210, 'business', 'linear-gradient(135deg, #1e40af, #3b82f6)', '#bfdbfe', NULL, 'Bestseller', 1, 1, NOW(), NOW()),
('Brand Identity Workshop', 'brand-identity-workshop', 'Olivia Park', 'Build a brand people remember. Voice, visuals, values. Includes logo templates and exercises.', 11.49, 4.9, 1780, 156, 'business', 'linear-gradient(135deg, #059669, #34d399)', '#a7f3d0', NULL, 'New', 1, 1, NOW(), NOW()),
('Practical AI for Developers', 'practical-ai-for-developers', 'Marcus Rivera', 'Skip the hype. Build real things with LLMs, embeddings, and agents. Code samples in Python and JS.', 12.99, 4.9, 3920, 268, 'tech', 'linear-gradient(135deg, #9333ea, #c084fc)', '#e9d5ff', NULL, 'Top Rated', 1, 1, NOW(), NOW()),
('Microservices from Scratch', 'microservices-from-scratch', 'Anika Patel', 'A practical guide to breaking apart a monolith. Docker, messaging, and service mesh explained.', 10.99, 4.7, 2450, 202, 'tech', 'linear-gradient(135deg, #ea580c, #f97316)', '#fed7aa', NULL, NULL, 1, 1, NOW(), NOW()),
('The Athlete''s Guide to Supplements', 'athletes-guide-to-supplements', 'Dr. Sarah Mitchell', 'Evidence-based guide to sports nutrition. Creatine, protein, and beyond. No BS, just science.', 11.99, 4.7, 3420, 198, 'supplements', 'linear-gradient(135deg, #16a34a, #22c55e)', '#bbf7d0', NULL, 'New', 0, 1, NOW(), NOW()),
('Nootropics Handbook', 'nootropics-handbook', 'Dr. James Park', 'Brain-boosting supplements explained. L-theanine, alpha-GPC, lion''s mane, and 40+ compounds.', 13.49, 4.8, 2870, 264, 'supplements', 'linear-gradient(135deg, #7c3aed, #c084fc)', '#e9d5ff', NULL, 'Top Rated', 0, 1, NOW(), NOW()),
('Vitamin D: The Sunshine Vitamin', 'vitamin-d-the-sunshine-vitamin', 'Dr. Lisa Chen', 'Everything you need to know about vitamin D. Dosage, testing, deficiency, and optimal health.', 9.99, 4.6, 4150, 176, 'supplements', 'linear-gradient(135deg, #ea580c, #f97316)', '#fed7aa', NULL, NULL, 0, 1, NOW(), NOW()),
('Omega-3 Deep Dive', 'omega-3-deep-dive', 'Dr. Michael Torres', 'The science of fish oil, EPA/DHA, and inflammation. Which brands work, which don''t.', 10.99, 4.7, 2340, 212, 'supplements', 'linear-gradient(135deg, #0284c7, #38bdf8)', '#bae6fd', NULL, NULL, 0, 1, NOW(), NOW()),
('SEO in 2025', 'seo-in-2025', 'Anika Patel', 'Search engine optimization that still works. Core Web Vitals, AI overviews, and link building.', 8.49, 4.6, 4120, 168, 'marketing', 'linear-gradient(135deg, #dc2626, #f87171)', '#fecaca', NULL, NULL, 1, 1, NOW(), NOW()),
('Social Media Content Lab', 'social-media-content-lab', 'Lena Okafor', '30 days of posts, captions, and hooks. Templates for Instagram, TikTok, LinkedIn, and X.', 9.49, 4.5, 1340, 134, 'marketing', 'linear-gradient(135deg, #0891b2, #22d3ee)', '#a5f3fc', NULL, NULL, 0, 1, NOW(), NOW()),
('Cognitive Biases Field Guide', 'cognitive-biases-field-guide', 'Dr. R. Sato', '60 mental shortcuts that shape your decisions. Real examples, clear diagrams, zero fluff.', 7.99, 4.8, 6210, 142, 'psychology', 'linear-gradient(135deg, #4338ca, #818cf8)', '#c7d2fe', NULL, 'Bestseller', 1, 1, NOW(), NOW()),
('Negotiation Tactics', 'negotiation-tactics', 'Elena Voss', 'Salary, business, or life. The strategies that actually work. Includes roleplay scripts.', 10.49, 4.7, 3210, 180, 'psychology', 'linear-gradient(135deg, #b91c1c, #ef4444)', '#fca5a5', NULL, NULL, 0, 1, NOW(), NOW());
