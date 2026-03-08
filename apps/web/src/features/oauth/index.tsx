import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export default function GoogleOAuth() {
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      window.location.href = '/';
    } else {
      const errorMessage = searchParams.get('errorMessage');

      setError(
        errorMessage ?? 'Something went wrong with authentication'
      );
    }
  }, [location]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};