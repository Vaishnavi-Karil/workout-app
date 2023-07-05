import { render, screen } from "@testing-library/react";
import { MyComponent } from "../../components/MyComponent/MyComponent";

test("renders MyComponent", () => {
  render(<MyComponent />);
  const element = screen.getByText("Hello, World!");
  expect(element).toBeInTheDocument();
});
