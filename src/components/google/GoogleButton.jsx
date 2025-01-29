import { GoogleLogin } from "@react-oauth/google";
export function GoogleButton({ loading, handleGoogleSignInSuccess, handleGoogleSignInFailure }) {
  return (
    <div className="flex items-center justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSignInSuccess}
        onError={handleGoogleSignInFailure}
        size="large"
        shape="pill"
        logo_alignment="center"
        theme="filled_blue"
        width={"335px"}
        disabled={loading}
      />
    </div>
  );
}
