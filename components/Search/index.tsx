import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MovieSearchOutline from 'mdi-react/MovieSearchOutlineIcon';
import { selectUser } from '../../redux/user/userSelectors';
import { fetchMovies } from '../../redux/searcher/searcherActions';
import { getFavorites } from '../../redux/favoriteMovies/favoriteMoviesSelectors';
import { connect } from 'react-redux';

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-adornedStart': {
            paddingRight: '0',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#c5c5c5 !important',
            },
            '&:hover fieldset': {
                borderColor: '#c5c5c5 !important',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#0a2a43; !important',
            },
        },
    },
})(TextField);

type searcherProps = {
    getFavorites: {
        items: [{ id: number }];
    };
    session: {
        session_id: string;
    };
    getValue: ({}) => void;
    fetchMovies: ({}) => void;
    properties: {
        name: string;
    };
};

const Searcher: React.FC<searcherProps> = ({
    properties,
    fetchMovies,
    session,
    getValue,
    getFavorites,
}: searcherProps) => {
    const [value, setValue] = useState('');

    const handleChange = async (e) => {
        const { value } = e.target;
        setValue(value);
        getValue({ slug: value });
        const payload = {
            session_id: session.session_id,
            slug: value,
            page: 1,
            getFavorites: getFavorites,
        };
        await fetchMovies(payload);
    };

    const handleKeyPress = async (e) => {
        if (value.length > 0) {
            const payload = {
                session_id: session.session_id,
                slug: value,
                getFavorites: getFavorites,
            };
            await fetchMovies(payload);
            getValue({ slug: value });
        }
    };

    return (
        <div className={styles.Searcher}>
            <div className={styles.Searcher__container}>
                <CssTextField
                    name={properties.name}
                    InputProps={{
                        startAdornment: (
                            <span className={styles.Searcher__icon}>
                                <MovieSearchOutline size={30} />
                            </span>
                        ),
                    }}
                    classes={{
                        root: styles.Searcher__inputRoot,
                    }}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    value={value}
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    placeholder={'Search Movie'}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    session: selectUser(state),
    getFavorites: getFavorites(state),
});

const mapDispatchToProps = {
    fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
