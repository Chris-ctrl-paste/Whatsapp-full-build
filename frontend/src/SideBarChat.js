import React from 'react'
import "./Sidebarchat.css"
import { Avatar } from '@material-ui/core'



function SideBarChat() {
    return (
        <div className="sidebarChat">
            <Avatar src=" https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b2ba3c3a-7c99-4022-8dd8-ba7185cd85c0/dcman2t-246ff2b9-a3f6-48e2-bd62-6aac4e286aea.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjJiYTNjM2EtN2M5OS00MDIyLThkZDgtYmE3MTg1Y2Q4NWMwXC9kY21hbjJ0LTI0NmZmMmI5LWEzZjYtNDhlMi1iZDYyLTZhYWM0ZTI4NmFlYS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mGOvlqIC8cP9EsobZvl3i5cFnTEIPJgLQALw9Xu-dH4" />
            <div className="sidebarChat_info">
                <h2>Room Name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SideBarChat
