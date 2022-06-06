import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });

    return (
        <Button leftIcon={data.icon} to={data.to} className={classes} onClick={onClick}>
            <span className={cx(`${data.className}`)}>{data.title}</span>
        </Button>
    );
}

export default MenuItem;
