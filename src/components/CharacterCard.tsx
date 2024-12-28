import { Box, Card, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { Character } from "../types"
import { useState } from "react"

type Props = {
  character: Character
  onAdd?: (character: Character) => void
  onRemove?: (character: Character) => void
}

const CharacterCard = ({ character, onAdd, onRemove }: Props) => {
  const [hovering, setHovering] = useState(false)

  const actionFn = (onAdd || onRemove) ?? (() => {})
  const ActionIcon = () =>
    onAdd ? (
      <AddIcon
        color='success'
        sx={{ position: "absolute", bottom: 0, right: 0 }}
      />
    ) : onRemove ? (
      <RemoveIcon
        color='error'
        sx={{ position: "absolute", bottom: 0, right: 0 }}
      />
    ) : null

  return (
    <Card
      raised
      onClick={() => actionFn(character)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      sx={{ position: "relative", cursor: "pointer" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          padding: 1
        }}
      >
        <img height='70px' src={character.portrait} alt={character.id} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            color: "black"
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: "bold" }}>
            {character.name}
          </Typography>
          <Typography variant='body2'>Power: {character.power}</Typography>
          <Typography variant='caption'>GT: {character.gearTier}</Typography>
        </Box>
      </Box>
      {hovering && <ActionIcon />}
    </Card>
  )
}

export default CharacterCard
