import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@app/providers/AuthProvider';
import { Input } from '@presentation/components/common/Inputs';
import { Button } from '@presentation/components/common/Buttons';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('admin@fashion.com');
  const [password, setPassword] = useState('admin123');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    try {
      await login(email, password);
      navigate('/home');
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Login failed');
    }
  };

  const displayError = error || localError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Login</h1>
        <p className="text-center text-gray-600 text-sm mb-6">Fashion Community Platform</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {displayError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {displayError}
            </div>
          )}

          <p className="text-xs text-gray-500 italic">
            Demo: admin@fashion.com / admin123
          </p>

          <Button 
            type="submit" 
            variant="primary" 
            loading={isLoading} 
            className="w-full"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline font-semibold">Sign up</a>
        </p>
      </div>
    </div>
  );
};
