import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, MenuItem, Menu, NativeSelect, Toolbar, Typography, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CommonContainer from '../containers/Common';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            background: '#f7f7f7',
        },
        navbar: {
            background: 'rgba(20, 153, 196, 1)',
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            marginRight: theme.spacing(2),
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
            zIndex: 100
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
            zIndex: 100
        },
        selector: {
            color: 'white',
            "& option": {
                color: 'rgba(20, 153, 196, 1)',
            }
        }
    }),
);

export default ((props: any) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = useState('tracker');
    const classes = useStyles();
    const commonContainer = CommonContainer.useContainer();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSignOut = async () => {
        try {
            await commonContainer.signOut();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLanguage = async (event: React.ChangeEvent<{ value: unknown }>) => {
        commonContainer.setLanguage(event.target.value as string)
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to="../pages/Profile">{commonContainer.t('Profile')}</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="#">{commonContainer.t('My account')}</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleMobileMenuClose} component={Link} to="../pages/Profile">{commonContainer.t('Profile')}</MenuItem>
            <MenuItem onClick={handleMobileMenuClose} component={Link} to="#">{commonContainer.t('My account')}</MenuItem>
            <MenuItem onClick={handleSignOut}>{commonContainer.t('SignOut')}</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {commonContainer.t('Health Tracker')}
                    </Typography>
                    <div className={classes.grow} />
                    <NativeSelect
                        value={commonContainer.language}
                        onChange={handleLanguage}
                        name="language"
                        className={classes.selector}
                        inputProps={{ 'aria-label': 'language' }}
                    >
                        <option value={'ja'}>日本語</option>
                        <option value={'en'}>English</option>
                        <option value={'cm'}>ちゅま</option>
                    </NativeSelect>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.root}>
                            {/* <BottomNavigationAction
                                component={Link}
                                to="../pages/home"
                                label={`${commonContainer.t('Home')}`}
                                value="home"
                                icon={<HomeIcon />} /> */}
                            <BottomNavigationAction
                                component={Link}
                                to="../pages/bank"
                                label={`${commonContainer.t('Bank')}`}
                                value="bank"
                                icon={<MonetizationOnIcon />} />
                            <BottomNavigationAction
                                component={Link}
                                to="../pages/tracker"
                                label={`${commonContainer.t('Tracker')}`}
                                value="tracker"
                                icon={<AssessmentIcon />} />
                            {/* <BottomNavigationAction
                                component={Link}
                                to="../pages/medicine"
                                label={`${commonContainer.t('Medicine')}`}
                                value="medicine"
                                icon={<ScatterPlotIcon />} /> */}
                            <BottomNavigationAction
                                component={Link}
                                to="../pages/history"
                                label={'振り返り'}
                                value="history"
                                icon={<DateRangeIcon />} />
                        </BottomNavigation>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}) as React.FC;
