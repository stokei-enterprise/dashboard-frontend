import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useMemo, useRef } from "react";
import { LogoutIcon, SettingIcon, UserIcon } from "~/components/icons";
import { Link } from "~/components/layouts/layout/menu/link";
import { UserAvatar } from "~/components/ui/user-avatar";
import { AuthContext } from "~/contexts/auth";
import { ACCOUNT_FRONTEND_URL, AUTH_FRONTEND_URL } from "~/environments";

interface Props {}

export const UserBox: React.FC<Props> = ({ children, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const btnRef = useRef();

  const fullname = useMemo(() => {
    if (!user) {
      return;
    }
    const [name, ...rest] = user.fullname.split(" ");
    return name + " " + rest[rest.length - 1];
  }, [user]);

  const redirect = (url) => (window.location.href = url);

  if (!user) {
    return <></>;
  }
  return (
    <Flex>
      <UserAvatar
        size="sm"
        src={user?.avatar}
        name={fullname}
        cursor="pointer"
        onClick={() => onOpen()}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack
              paddingTop={10}
              align="center"
              spacing={2}
              direction="column"
            >
              <UserAvatar size="lg" src={user?.avatar} name={fullname} />
              <Text fontSize="sm" fontWeight="bold">
                {fullname}
              </Text>
            </Stack>
            <Divider marginY={5} />
            <Stack direction="column" spacing={2}>
              <Link
                alignItems="flex-start"
                icon={<Icon as={UserIcon} color="gray.600" />}
                onClick={() => redirect(ACCOUNT_FRONTEND_URL)}
              >
                Minha conta
              </Link>
              <Link
                alignItems="flex-start"
                icon={<Icon as={SettingIcon} color="gray.600" />}
                onClick={() => redirect(ACCOUNT_FRONTEND_URL)}
              >
                Configurações
              </Link>
            </Stack>

            <Divider marginY={5} />

            <Stack direction="column" spacing={2}>
              <Link
                alignItems="flex-start"
                icon={<Icon as={LogoutIcon} color="gray.600" />}
                onClick={() => redirect(AUTH_FRONTEND_URL + "/logout")}
              >
                Sair
              </Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
