import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { publicRoutes, protectedRoutes } from "./routes";

const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {publicRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
        {protectedRoutes.map(({ element, children }, index) => (
          <Route key={index} element={element}>
            {children.map(({ path, element: childElement }, childIndex) => (
              <Route key={childIndex} path={path} element={childElement} />
            ))}
          </Route>
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
