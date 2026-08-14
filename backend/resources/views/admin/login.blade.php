<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - CludyCart</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body class="dark bg-[#0a0a0b] text-gray-200 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md">
        <div class="text-center mb-8">
            <a href="/" class="inline-flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                </div>
                <span class="text-xl font-bold text-white">CludyCart</span>
            </a>
            <h2 class="text-2xl font-bold text-white">Admin Panel</h2>
            <p class="text-gray-500 text-sm mt-1">Sign in to manage your store</p>
        </div>

        <div class="bg-[#111113] border border-gray-800 rounded-xl p-8">
            <form method="POST" action="/admin/login">
                @csrf

                @if($errors->any())
                    <div class="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {{ $errors->first() }}
                    </div>
                @endif

                <div class="mb-5">
                    <label for="email" class="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value="{{ old('email') }}"
                        required
                        autofocus
                        class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                        placeholder="admin@cludycart.com"
                    >
                </div>

                <div class="mb-5">
                    <label for="password" class="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        class="w-full px-4 py-2.5 bg-[#1a1a1c] border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                        placeholder="Enter password"
                    >
                </div>

                <div class="flex items-center mb-6">
                    <input type="checkbox" id="remember" name="remember" class="w-4 h-4 rounded border-gray-600 bg-[#1a1a1c] text-violet-500 focus:ring-violet-500">
                    <label for="remember" class="ml-2 text-sm text-gray-400">Remember me</label>
                </div>

                <button type="submit" class="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-colors">
                    Sign In
                </button>
            </form>
        </div>

        <p class="text-center text-xs text-gray-600 mt-6">
            Default: admin@cludycart.com / password
        </p>
    </div>
</body>
</html>
