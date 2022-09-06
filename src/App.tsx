import { Header } from './components/Header';
import { v4 as uuid } from 'uuid';
import plus from './assets/plus.svg';
import './global.css';
import styles from './App.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { NoTask } from './components/NoTask';
import { Task } from './components/Task';

function App() {
    const [tasks, setTasks] = useState([{
        id: '',
        content: ''
    }]);
    
    const [newTask, setNewTask] = useState('');

    const [taskCounter, setTaskCounter] = useState(0);
    const [doneTasksCounter, setDoneTasksCounter] = useState(0);

    function handleCreatedTask(event: FormEvent) {
        event.preventDefault();
        if (tasks[0].content === '') {
            setTasks([{
                id: uuid(),
                content: newTask
            }]);
        } else {
            setTasks([...tasks, {
                id: uuid(),
                content: newTask
            }]);
        }
        setTaskCounter(taskCounter + 1);
        setNewTask('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function calculateDoneTasks(taskDone: boolean) {
        if (taskDone) {
            setDoneTasksCounter(doneTasksCounter + 1);
        } else {
            setDoneTasksCounter(doneTasksCounter - 1);
        }
    }

    function deleteTask(taskToDelete: string, taskDone: boolean) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.content !== taskToDelete;
        })
        setTasks(tasksWithoutDeletedOne);
        setTaskCounter(taskCounter - 1);
        if (taskDone === false) {
            setDoneTasksCounter(doneTasksCounter - 1);
        }
        if (taskCounter === 1) {
            setTasks([{
                id: '',
                content: ''
            }]);
        }
    }

    return (
        <>
            <Header />
            <form onSubmit={handleCreatedTask} className={styles.addNewForm}>
                <input 
                    type="text"
                    name="task" 
                    placeholder="Adicione uma nova tarefa"
                    value={newTask}
                    onChange={handleNewTaskChange}
                    required 
                />
                <button type="submit">
                    <p>Criar</p>
                    <img src={plus} alt="Add" />
                </button>
            </form>
            <div className={styles.tasks}>
                <div className={styles.taskNumber}>
                    <p className={styles.created}>
                        Tarefas criadas 
                        <strong>{taskCounter}</strong>
                    </p>
                    <p className={styles.done}>
                        Concluídas  
                        {taskCounter > 0 ?
                            <strong>{`${doneTasksCounter} de ${taskCounter}`}</strong> :
                            <strong>0</strong>
                        } 
                    </p>
                </div>
                {taskCounter === 0 ?
                    <NoTask /> :
                    tasks.map(task => {
                        return (
                            <Task
                                key={task.id} 
                                content={task.content}
                                onCheckTask={calculateDoneTasks}
                                onDeleteTask={deleteTask} 
                            /> 
                        )
                    })
                }
            </div>
        </>
    )
}

export default App;