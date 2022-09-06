import styles from './styles.module.css';
import trash from '../../assets/trash.svg';
import { useState } from 'react';

interface TaskProps {
    content: string;
    onCheckTask: (taskDone: boolean) => void;
    onDeleteTask: (task: string, taskDone: boolean) => void;
}

export function Task({ content, onCheckTask, onDeleteTask }: TaskProps) {
    const [isTaskDone, setIsTaskDone] = useState(true);
    
    function handleDoneTasks() {
        if (isTaskDone === false) {
            setIsTaskDone(true);
        } else {
            setIsTaskDone(false);
        }
        onCheckTask(isTaskDone);
    }
    
    function handleDeleteTask() {
        onDeleteTask(content, isTaskDone);
    }
    
    return (
        <div className={styles.task}>
            <label htmlFor="done">
                <input 
                    type="checkbox"
                    id="done"
                    name="done"
                    onChange={handleDoneTasks} 
                />
                <span>{content}</span>
            </label>
            <button onClick={handleDeleteTask} title="Excluir tarefa">
                <img src={trash} alt="Lixeira" />
            </button>
        </div>
    )
}