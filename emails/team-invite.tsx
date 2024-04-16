import { ORGNISE_LOGO } from "@/lib/constants/constants";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "./component/footer";

export default function TeamInvite({
  email = "john@doe.io",
  appName = "Orgnise",
  url = "http://localhost:8888/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
  teamName = "Acme",
  teamUser = "John Doe",
  teamUserEmail = "john@doe.co",
}: {
  email: string;
  appName: string;
  url: string;
  teamName: string;
  teamUser: string | null;
  teamUserEmail: string | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Join {teamName} on {appName}
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={ORGNISE_LOGO}
                width="40"
                height="40"
                alt="Orgnise"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Join {teamName} on {appName}
            </Heading>
            {teamUser && teamUserEmail ? (
              <Text className="text-sm leading-6 text-black">
                <strong>{teamUser}</strong> (
                <Link
                  className="text-blue-600 no-underline"
                  href={`mailto:${teamUserEmail}`}
                >
                  {teamUserEmail}
                </Link>
                ) has invited you to join the <strong>{teamName}</strong> team
                on {appName}!
              </Text>
            ) : (
              <Text className="text-sm leading-6 text-black">
                You have been invited to join the <strong>{teamName}</strong>{" "}
                team on {appName}!
              </Text>
            )}
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Join Team
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
