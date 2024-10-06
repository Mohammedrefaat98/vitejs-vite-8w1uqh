test('App renders with initial state', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Search for a user.../i)).toBeInTheDocument();
  expect(getByText(/John/i)).not.toBeInTheDocument(); // No initial suggestions
});
