// DEV MODE: Auth check bypassed — all pages accessible without login.
// To re-enable auth, restore the original ProtectedRoute with JWT checks.

export default function ProtectedRoute({ children }) {
  return children;
}
