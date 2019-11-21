import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Proptypes from "prop-types";
// MUI
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ChatIcon from "@material-ui/icons/Chat"

// Redux
import {connect} from "react-redux"
import {markNotificationsRead} from "../../redux/actions/userAction"

class Notifications extends Component {
    state = {
        anchorEl: null
    }
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target});
    }
    handleClose = () => {
        this.setState({anchorEl: null});
    }

    onMenuOpened = () => {
        let unreadNotificationsId = this.props.notifications.filter(noti => !noti.read).map(noti => noti.notificationId);
        this.props.markNotificationsRead(unreadNotificationsId)
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl
        dayjs.extend(relativeTime)
        let notificationIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(noti => noti.read === false).length > 0
                ? notificationIcon = (
                    <Badge badgeContent={notifications.filter(noti => noti.read === false).length}
                        color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                ) : (
                    notificationIcon = <NotificationsIcon/>
                )
        } else {
            notificationIcon = <NotificationsIcon/>
        }
        let notificationsMarkup = 
            notifications && notifications.length > 0 ? (
                notifications.map(noti => {
                    const verb = noti.type === "like" ? "liked" : "commented on";
                    const time = dayjs(noti.createdAt).fromNow();
                    const iconColor = noti.read ? "primary" : "secondary"
                    const icon = noti.type === "like" ? (
                        <FavoriteIcon color={iconColor} style={{marginRight: 10}}/>
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: 10}}/>
                    )
                    return (
                        <MenuItem key={noti.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                color="textSecondary"
                                variant="body1"
                                to={`/users/${noti.recipient}/scream/${noti.screamId}`}
                                >
                                    {noti.sender} {verb} your post {time}
                                </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications
                </MenuItem>
            )
        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu': undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                        >
                            {notificationIcon}
                        </IconButton>
                </Tooltip>
                <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: Proptypes.func.isRequired,
    notifications: Proptypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)