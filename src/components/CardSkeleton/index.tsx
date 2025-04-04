import { Card, CardContent, Skeleton } from '@mui/material';
import styles from './styles.module.scss';

const CardSkeleton = () => {
  return (
    <Card className={styles['card']}>
      <div className={styles['image']}>
        <Skeleton data-testid="skeleton-product" variant="rectangular" width="100%" height="100%" />
      </div>
      <CardContent className={styles['info']}>
        <Skeleton variant="text" className={styles['line']} />
        <Skeleton variant="text" className={`${styles['line']} ${styles['short']}`} />
        <Skeleton variant="text" className={`${styles['line']} ${styles['short']}`} />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
