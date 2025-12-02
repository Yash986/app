import PasswordGate from "../PasswordGate";

export default function PasswordGateExample() {
  return (
    <PasswordGate>
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">You're in! This is the protected content.</h1>
      </div>
    </PasswordGate>
  );
}
