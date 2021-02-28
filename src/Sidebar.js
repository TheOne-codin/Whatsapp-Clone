import {Avatar, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import React from 'react'
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

export default function Sidebar() {
    return (
        <div className="sidebar">
        <div className="sidebar_header">
            <Avatar />
            <div className="sidebar_headerRight">
                <IconButton>
                <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>

        </div>
        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <SearchOutlined />
            <input type="text" placeholder="Search or start a new chat"/>
            </div>
        </div>
        <div className="sidebar_chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
        </div>
        </div>
    )
}
