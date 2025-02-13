import "./actions.css";
import { MouseEvent } from "react";

interface ActionButtonProps {
    label: string;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function ActionButton({ label, onClick }: ActionButtonProps) {
    return (
        <div onClick={onClick} className="action">
            {label}
        </div>
    );
}