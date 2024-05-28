import { render } from "@testing-library/react";
import App from "../App";

test("renders app component", () => {
  render(<App />);
  console.log("App component rendered successfully");
});
