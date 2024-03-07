// PROJECT IMPORTS
import CodeVerification from 'views/authentication/code-verification';

// ================================|| CODE VERIFICATION ||================================ //

export type PropsCodeVerification = {
  searchParams: { [key: string]: string };
};

const CodeVerificationPage = ({ searchParams }: PropsCodeVerification) => {
  return <CodeVerification searchParams={searchParams} />;
};

export default CodeVerificationPage;
