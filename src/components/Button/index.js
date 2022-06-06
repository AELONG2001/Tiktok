import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    className,
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    large = false,
    small = false,
    disabled = false,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const _props = {
        onClick,
        ...passProps,
    };

    if (to) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = 'a';
    }

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        rounded,
        large,
        small,
        disabled,
    });

    return (
        <Comp className={classes} {..._props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
        </Comp>
    );
}

// eslint-disable-next-line react/no-typos
Button.PropTypes = {
    children: PropTypes.node.isRequired,
};

export default Button;
