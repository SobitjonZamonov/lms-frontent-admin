import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        {routes.map((element, index) => (
          <Route key={index} path={element.path} element={element.element}>
            <Route
              path={element.children?.path}
              element={element.children?.element}
            >
              {element.children?.children?.map((childElement, childIndex) => (
                <Route
                  key={childIndex}
                  index={!childElement.path ? true : false}
                  path={childElement.path}
                  element={childElement.element}
                />
              ))}
            </Route>
          </Route>
        ))}
      </Routes>
    </>
  );
}

export default App;
