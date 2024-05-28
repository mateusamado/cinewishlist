import { render } from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

test("renders app component", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  console.log("App component rendered successfully");
});
