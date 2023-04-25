import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import curBoardAtom from '../atoms/curBoardAtom';
import { useAtom } from 'jotai';
import { call } from '../../api_config/ApiService';
import { Link } from 'react-router-dom';

const ListTableTest = (props) => {
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('viewCount');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [articles, setArticles] = useState([]);
    const [_, setCurBoard] = useAtom(curBoardAtom);
    // const [auth, setAuth] = useAtom(authAtom);

    const viewCountIncrease = (id) => {
        call(`/article/viewCount?articleId=${id}`, "GET")
            .then((res) => {
                console.log(res);
            })
    } // 조회수 증가함수

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    
    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    
    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    // No.	제목    작성자	작성일	조회수
    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'No.',
        },
        {
            id: 'title',
            numeric: true,
            disablePadding: false,
            label: 'Title',
        },
        {
            id: 'writer',
            numeric: true,
            disablePadding: false,
            label: 'Writer',
        },
        {
            id: 'uploadDate',
            numeric: true,
            disablePadding: false,
            label: 'UploadDate',
        },
        {
            id: 'viewCount',
            numeric: true,
            disablePadding: false,
            label: 'Views',
        },
    ];
    
    const EnhancedTableHead = (props) => {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
    
        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <StyledTableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
    
    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };


    // useEffect(() => {
    //   console.log(props);
    //   fetch(`http://localhost:8100/article/list/${props.tag}`)
    //       .then(response => response.json())
    //       .then(data => {
    //           console.log(data);
    //       })
    //       .catch(error => console.error(error))

    // }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = articles.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articles.length) : 0;


    useEffect(() => {
        fetch('http://localhost:8100/article')
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setArticles(response);
            })
            .catch(error => console.error(error))
    }, [])
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        style={{ marginTop: '100px' }}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={articles.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                            {stableSort(articles, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((article, index) => {
                                    const isItemSelected = isSelected(article.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={article.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="article"
                                                padding="5px"
                                                
                                            >
                                                {/* 여기에다가 api 응답 집어넣을것! */}
                                                {article.id}

                                            </TableCell>
                                            <TableCell align="right">
                                                <Link to="article/:id">
                                                    <button onClick={() => {
                                                        setCurBoard(article.id);
                                                        viewCountIncrease(article.id)
                                                    }}>{article.title}
                                                    </button>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">{article.writer}</TableCell>
                                            <TableCell align="right">{article.uploadDate}</TableCell>
                                            <TableCell align="right">{article.viewCount}</TableCell>
                                            {/* 여기에다가 api 응답 집어넣을것! */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={articles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default ListTableTest