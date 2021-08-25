import { Flex, Heading, Text } from "@chakra-ui/react";
import { Container } from "~/components/layouts/container";
import { Layout } from "~/components/layouts/layout";

export default function Home({ ...props }) {
  return (
    <Layout>
      <Container alignItems="center" justifyContent="center" paddingY={50}>
        <Flex flexDirection="column">
          <Heading textAlign="center" size="xl" lineHeight="shorter" marginBottom="6">
            Ooops!
          </Heading>
          <Text fontSize="lg" textAlign="center">Página não encontrada!</Text>
        </Flex>
      </Container>
    </Layout>
  );
}
