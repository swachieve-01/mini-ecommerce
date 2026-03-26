import { useState } from "react";
import TermsContent from "../components/signup/TermsContent";

export default function SignupPage() {
  const [termId, setTermId] = useState(1);

  return (
    <>
      <button onClick={() => setTermId("service")}>약관1</button>
      <button onClick={() => setTermId("privacy")}>약관2</button>
      <button onClick={() => setTermId("marketing")}>약관3</button>

      <TermsContent termId={termId} />
    </>
  );
}
