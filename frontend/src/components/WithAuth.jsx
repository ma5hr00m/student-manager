import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('lemo_token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      axios.get('http://localhost:3000/api/v2/verify', config)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.message);
            setIsLoading(false);
          } else {
            navigate('/login');
          }
        })
        .catch(() => navigate('/login'));
    }, [navigate]);

    if (isLoading) {
      return <span>Loading</span>;
    }

    return <Component {...props} />;
  };
}
