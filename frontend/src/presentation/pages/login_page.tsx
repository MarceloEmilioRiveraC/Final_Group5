return (
  <div className="min-h-screen flex items-center justify-center bg-[#F6FAF3]">
    
    <div className="w-full max-w-md px-6">

      {/* Logo */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-[#2D1B4E] tracking-wide">
          INSPIRER
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome Back
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-100">

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-[#2D1B4E] font-medium">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#F6FAF3] focus:bg-white focus:border-[#9D4EDD]"
            />
          </div>

          <div>
            <label className="text-sm text-[#2D1B4E] font-medium">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#F6FAF3] focus:bg-white focus:border-[#9D4EDD]"
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full py-3 rounded-lg bg-[#5A1E5C] text-white font-medium hover:bg-[#7B2C7D] transition"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-[#9D4EDD] font-semibold">
            Create Account
          </a>
        </p>

      </div>
    </div>
  </div>
);