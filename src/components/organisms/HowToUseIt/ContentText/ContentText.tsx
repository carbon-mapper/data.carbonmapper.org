import styles from './ContentText.module.scss';

const ContentText = ({ text }: { text: string[] | undefined }) => {
    return (
        <div className={styles.section}>
            {text?.map(item => (
                <p key={item.slice(0, 5)}>{item}</p>
            ))}
        </div>
    );
};

export default ContentText;
