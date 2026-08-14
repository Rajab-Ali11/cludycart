// CludyCart API Configuration
const API_BASE = '/api';

const api = {
    async getProducts(category = null) {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        const response = await fetch(`${API_BASE}/products?${params}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    async getProduct(slug) {
        const response = await fetch(`${API_BASE}/products/${slug}`);
        if (!response.ok) throw new Error('Product not found');
        return response.json();
    },

    async createOrder(orderData) {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined') {
    module.exports = api;
}
