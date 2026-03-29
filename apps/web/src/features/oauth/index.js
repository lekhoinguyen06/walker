import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
export default function GoogleOAuth() {
    var location = useLocation();
    var _a = useState(null), error = _a[0], setError = _a[1];
    useEffect(function () {
        var searchParams = new URLSearchParams(location.search);
        var accessToken = searchParams.get('accessToken');
        var refreshToken = searchParams.get('refreshToken');
        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            window.location.href = '/';
        }
        else {
            var errorMessage = searchParams.get('errorMessage');
            setError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : 'Something went wrong with authentication');
        }
    }, [location]);
    return <div>{error && <div className="error">{error}</div>}</div>;
}
