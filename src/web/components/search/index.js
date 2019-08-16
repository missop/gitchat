import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './index.less'

const Search = (props) => {
    const [searchField, changeSearchField] = useState('');
    const {canSearch, search} = props;

    function _changeSearch(e) {
        const {value} = e.target;
        changeSearchField(value);
        search(value);
    }

    return (
        <div className="searchBox">
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-search1"/>
            </svg>
            <input type="text"
                   name="searchField"
                   placeholder="搜索用户/群"
                   value={canSearch ? searchField : ''}
                   onChange={_changeSearch}
            />
        </div>
    );
};

export default Search;

Search.propTypes = {
    search: PropTypes.func,
    canSearch: PropTypes.bool
};

Search.defaultProps = {
    search: ()=>{},
    canSearch: false
};
