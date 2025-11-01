import { useEffect } from "react";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import NavLink from "../NavLink/NavLink";
import NavbarMenu from "./NavbarMenu";
import AuthChecker from "../AuthChecker/AuthChecker";
import { axiosApi } from "../../shared/axiosApi";
import { capitalizeName } from "../../shared/utils/stringUtils";
import { AppProvider, useAppContext } from "../../contexts/AppContext";
import { deleteToken } from "../../shared/token";
import { ToastContainer } from "react-toastify";
import { Role } from "../../interfaces/roles";
import { useHasRequiredRole } from "../../shared/hooks/requireRole";

const NavbarContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppContext();
    const canViewAdmin = useHasRequiredRole([Role.ADMIN])();

    useEffect(() => {
        //Retrieve user info
        axiosApi
            .get("/api/user/me")
            .then((response) => {
                if (response) {
                    const userData = response.data;
                    setUserInfo(userData);
                    if (!userData || userData.roles.length === 0) {
                        navigate("/onboard");
                    }
                }
                if (!response || (response && response.status !== 200)) {
                    deleteToken();
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.error(error);
                deleteToken();
                navigate("/login");
            });
    }, [location.pathname]);

    return (
        <Box h="100vh" display="flex" flexDirection="column">
            <ToastContainer position="top-center" />
            <AuthChecker />
            <HStack
                p={{ base: 2, md: 4, lg: 6 }}
                bgColor="gray.600"
                w="100%"
                justifyContent="space-between"
                flexWrap={{ base: "wrap", lg: "nowrap" }}
                gap={{ base: 2, md: 4 }}
            >
                <HStack gap={{ base: 4, md: 10, lg: 20 }} flexWrap="wrap">
                    <Box cursor="pointer" onClick={() => navigate("/")}>
                        <Logo />
                    </Box>
                    <NavLink to="/methods" label="Ferramentas" />
                    {canViewAdmin ? (
                        <NavLink to="/admin" label="Administração" />
                    ) : (
                        <></>
                    )}
                </HStack>
                <HStack
                    justifySelf="flex-end"
                    gap={{ base: 2, md: 4 }}
                    flexShrink={0}
                >
                    <HStack
                        bgColor="white"
                        borderRadius="md"
                        p={1}
                        display={{ base: "none", sm: "flex" }}
                    >
                        <Avatar.Root size={{ base: "xs", md: "sm" }}>
                            <Avatar.Image src="https://bit.ly/broken-link" />
                            <Avatar.Fallback />
                        </Avatar.Root>
                        <Text
                            fontSize={{ base: "sm", md: "md" }}
                            display={{ base: "none", md: "block" }}
                        >
                            {userInfo ? capitalizeName(userInfo.name) : ""}
                        </Text>
                    </HStack>

                    <NavbarMenu />
                </HStack>
            </HStack>
            <Box flex="1" overflowY="auto">
                <Outlet></Outlet>
            </Box>
        </Box>
    );
};

const NavbarWrapper = () => {
    return (
        <AppProvider>
            <NavbarContent />
        </AppProvider>
    );
};

export default NavbarWrapper;
