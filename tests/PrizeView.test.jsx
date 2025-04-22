// PrizeView.test.jsx
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import PrizeView from "../resources/js/Components/PrizeView";

// Mock Inertia and Modal
jest.mock("@inertiajs/react", () => require("../__mocks__/inertiajs-react.js"));
jest.mock("../resources/js/Components/Modal", () => ({ children }) => <div>{children}</div>);

describe("PrizeView", () => {
  it("renders prize info and lets user claim prize", async () => {
    const onClose = jest.fn();

    render(<PrizeView onClose={onClose} game="spin" prize="10% Discount" />);

    // Prize text
    expect(screen.getByText(/You won/i)).toBeInTheDocument();
    expect(screen.getByText(/10% Discount/)).toBeInTheDocument();

    // Click "Claim Prize"
    const claimBtn = screen.getByText(/Claim Prize/i);
    fireEvent.click(claimBtn);

    // Wait for success message to show
    await waitFor(() => {
      expect(screen.getByText(/🎉 Prize Claimed!/)).toBeInTheDocument();
      expect(screen.getByText(/You successfully claimed your prize!/)).toBeInTheDocument();
    });

    // Click close button
    fireEvent.click(screen.getByText(/Close/i));
    expect(onClose).toHaveBeenCalled();
  });
});
