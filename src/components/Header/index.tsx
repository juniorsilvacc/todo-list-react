import styles from "./Header.module.css";
import { useContext, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { Input } from "../Input";
import { Button } from "../Button";

export const Header = () => {
    const [inputValue, setInputValue] = useState('')

    const { dispatch } = useContext(TodoContext)

    const handleNewTask = () => {
        if (!inputValue) {
            alert("Digite um título para a nova tarefa")
            return;
        }

        dispatch({ type: 'ADD', payload: {title: inputValue, isDone: true } })
        setInputValue('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.brandContainer}>
                <h1>TO-DO</h1>
            </div>

            <div className={styles.newTaskContainer}>
                <div className={styles.newTaskInput}>
                    <Input 
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Adiciona uma tarefa"
                    />
                </div>

                <Button 
                    onClick={handleNewTask}
                />
            </div>
        </div>
    )
}