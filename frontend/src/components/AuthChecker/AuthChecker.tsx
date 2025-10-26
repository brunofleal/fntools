import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getToken } from "../../shared/token";

const AuthChecker = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const checkAuth = () => {
        const token = getToken();
        console.log(location);
        if (!token && location.pathname != "/") {
            navigate("/login");
        }
    };

    useEffect(() => {
        checkAuth();
    }, [location]);

    return <></>;
};

export default AuthChecker;
