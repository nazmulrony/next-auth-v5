import { FaExclamationTriangle } from "react-icons/fa";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div>
                <FaExclamationTriangle className="text-destructive mx-auto" />
            </div>
        </CardWrapper>
    );
};
