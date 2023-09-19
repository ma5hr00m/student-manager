import { Suspense, lazy } from "react";
import { Routes, Route} from 'react-router-dom';
import withAuth from "../components/WithAuth";

export default function Router() {
  const routes = [
    {
      path: '/',
      component: withAuth(lazy(() => import('../views/Home'))),
    },
    {   
      path: '/login',
      component: lazy(() => import('../views/Login')),
    },
    {
      path: '*',
      component: lazy(() => import('../views/Error')),
    },
  ];

  return(
    <Routes>
      {
        routes.map((item, i) => {
          return (
            <Route key={i} path={item.path} element={
							<Suspense fallback={<span>Loading</span>}>
								<item.component />
							</Suspense>
            } />
          )
      	})
      }
    </Routes>
  );
}