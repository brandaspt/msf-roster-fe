import { Avatar } from "@mui/material"
import { PlayerCard } from "../types"

interface PlayerAvatarProps {
  user: PlayerCard
}

const PlayerAvatar = ({ user }: PlayerAvatarProps) => {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        position: "relative"
      }}
    >
      {/* Icon */}
      <Avatar sx={{ ml: "12px", mt: "12px" }} src={user.icon} alt='User Icon' />

      {/* Frame */}
      <img
        src={user.frame}
        alt='User Frame'
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: -0,
          pointerEvents: "none" // Ensures clicks pass through to the icon if needed
        }}
      />
    </div>
  )
}

export default PlayerAvatar
