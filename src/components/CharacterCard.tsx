import { Box, Card, Typography } from "@mui/material"
import { Character } from "../types"

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Card raised>
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
          <Typography variant='caption'>Level: {character.level}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default CharacterCard
