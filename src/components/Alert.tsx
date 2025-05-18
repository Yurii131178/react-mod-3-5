import clsx from 'clsx';
import css from './Alert.module.css';

interface AlertProps {
  type?: 'success' | 'error';
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  return <p className={clsx(css.alert, type && css[type])}>{message}</p>;
}
