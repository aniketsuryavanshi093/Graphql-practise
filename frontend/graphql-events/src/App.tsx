import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LayoutWrapper from './Layout/LayoutWrapper';
import { Suspense, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { RoutesType } from './types/commontypes';
import { guestRoutes, userRoutes } from './routes/routes';
import useAuthContext from './Context/AuthCOntext/useAuthContext';
import { useLazyQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { GET_LOGIN_DETAIL } from './graphql/query';
import LogoLoader from './Components/Loader/LogoLoader';

function App() {
  const [routes, setRoutes] = useState<RoutesType[]>([]);
  const { user, setuser } = useAuthContext();
  useEffect(() => {
    if (user || sessionStorage.getItem("authtoken")) {
      setRoutes(userRoutes)
    } else {
      setRoutes(guestRoutes)
    }
  }, [user])
  console.log(user);

  const [getUser, { loading }] = useLazyQuery(GET_LOGIN_DETAIL, {
    onCompleted(data) {
      setuser(data.getUser)
    },
    onError(er) {
      console.log(er);
    }
  })
  useEffect(() => {
    if (sessionStorage.getItem('authtoken')) {
      getUser()
    }
  }, [])
  const mainContent = routes?.map((route) =>
    route.component ? (
      <>
        <Route
          key={route.name}
          path={route.path}
          element={<route.component />}
        />
      </>
    ) : (
      route.redirectRoute && (
        <>
          <Route path="/" key={route.name} element={<Navigate to={route.path} />} />
          <Route path="*" key={route.name} element={<Navigate to={route.path} />} />
        </>
      )
    )
  );
  return (
    <>
      <Suspense fallback={<LogoLoader />}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
            progressClassName="toastProgress"
            bodyClassName="toastBody"
          />
          <Routes>
            <Route
              element={
                <LayoutWrapper
                  isAuthenticated={!!(user || sessionStorage.getItem("authtoken"))}
                />
              }
            >
              {mainContent}
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </>
  )
}

export default App
