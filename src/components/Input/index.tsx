import type { ChangeEvent } from "react";
import styles from "./Input.module.css";
import AddIcon from "../../assets/add.svg?react";

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}
 

export const Input = ({ value, onChange, placeholder }: Props) => {
    return (
        <div className={styles.container}>
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}