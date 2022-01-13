import styles from '../styles/card.module.scss';

interface CardProps {
  href?: string;
  title: string;
  description: string;
  tags?: string[];
}

const Card = ({href, title, description, tags}: CardProps) => {
  return (
    <a href={href ? href : ''} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.project}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
        {tags && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <p key={tag} className={styles.tag}>
                {tag}
              </p>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};
export default Card;
