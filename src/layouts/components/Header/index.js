import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolTip from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import styles from './Header.module.scss';
import Search from '~/layouts/components/Search';
import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        className: 'title-popper',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Việt Nam',
                },
            ],
        },
    },

    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
        className: 'title-popper',
    },

    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
        className: 'title-popper',
    },
];

function Header() {
    const handleMenuChange = (item) => {};

    const currentUser = true;

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: config.routes.following,
            className: 'title-popper',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get icons',
            to: '/',
            className: 'title-popper',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/',
            className: 'title-popperk',
        },
        ...MENU_ITEM,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Logout',
            to: '/logout',
            className: 'title-popper',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <ToolTip delay={[0, 200]} content="Upload Video" placement="bottom">
                                <>
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>

                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>

                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                    </button>
                                </>
                            </ToolTip>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/61d3ff70567cb70070ccc6d8/52f88998-1ca3-4ec9-8186-c96311a8091f/48"
                                alt="avatar"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
