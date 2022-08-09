import { useEffect, useRef, useState } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import * as SearchService from '~/services/searchService';

const cx = classNames.bind(styles);

function Search() {
    const inputRef = useRef();

    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [showSearchResult, setShowSearchResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await SearchService.searchListAccountApi(debouncedValue, 'less');
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleChangeInputSearch = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClearInputSearch = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideSearchResult = () => {
        setShowSearchResult(false);
    };

    const handleFocusInputSearch = () => {
        setShowSearchResult(true);
        setSearchValue('');
    };

    const handleSubmitSearchAccount = () => {};

    return (
        //wrapper with div element for fix bug warning parents tippy
        <div>
            <Tippy
                interactive
                visible={showSearchResult && searchResult.length}
                render={(attrs) => (
                    <div className={cx('search-result')} {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult?.length &&
                                searchResult.map((account) => <AccountItem key={account.id} data={account} />)}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideSearchResult}
            >
                <div className={cx('search-box')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type="text"
                        placeholder="Search accounts and videos"
                        onChange={handleChangeInputSearch}
                        onFocus={handleFocusInputSearch}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx('close-btn')} onClick={handleClearInputSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button
                        className={cx('search-btn')}
                        onClick={handleSubmitSearchAccount}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <SearchIcon />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
