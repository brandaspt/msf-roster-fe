import { useEffect, useState } from "react"
import { Character } from "../types"
import { getRoster } from "../api"
import { Box, Grid2, Skeleton, Typography } from "@mui/material"
import CharacterCard from "./CharacterCard"
import { useAuth } from "../context/AuthProvider"

const MyRoster = () => {
  const [roster, setRoster] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  console.log("🚀 ~ MyRoster ~ user:", user)

  useEffect(() => {
    const fetchRoster = async () => {
      setLoading(true)
      try {
        const data = await getRoster()
        setLoading(false)
        setRoster(data)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchRoster()
  }, [])

  return loading ? (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      flexWrap='wrap'
      gap={2}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Box key={index} sx={{ width: 300, padding: 1 }}>
          <Skeleton variant='rectangular' width='100%' height={100} />
          <Typography variant='body2'>
            <Skeleton />
          </Typography>
          <Typography variant='body2'>
            <Skeleton />
          </Typography>
          <Typography variant='caption'>
            <Skeleton />
          </Typography>
        </Box>
      ))}
    </Box>
  ) : (
    <Grid2 container spacing={2}>
      <Grid2
        container
        spacing={2}
        size={4}
        sx={{
          borderRight: "1px solid grey",
          maxHeight: "calc(100vh - 80px)",
          overflowY: "auto"
        }}
      >
        {roster.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Grid2>
      <Grid2 size={8}></Grid2>
    </Grid2>
  )
}

export default MyRoster
