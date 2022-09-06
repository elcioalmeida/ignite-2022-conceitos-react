import styles from './styles.module.css';
import clipboard from '../../assets/clipboard.png';

export function NoTask() { 
    return (
        <div className={styles.noTask}>
            <img src={clipboard} alt="Clipboard" />
            <strong>Você ainda não tem tarefas cadastradas.</strong>
            <p>Crie tarefas e organize seus itens a fazer.</p>
        </div>            
    )
}