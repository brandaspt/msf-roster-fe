import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import { getRoster } from "../api"
import { Character } from "../types"
import CharacterCard from "./CharacterCard"

const MyRoster = () => {
  const [roster, setRoster] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [squads, setSquads] = useState<Character[][]>([])
  const [editingSquad, setEditingSquad] = useState<number>()
  const [sortBy, setSortBy] = useState<string>("power-desc")
  const [search, setSearch] = useState<string>("")

  const handleNewSquad = () => {
    setSquads(prev => [[], ...prev])
    setEditingSquad(0)
  }

  const handleAddCharacterToSquad = (character: Character) => {
    if (squads[editingSquad]?.length < 5) {
      setSquads(prev => {
        const newSquads = prev.map(squad => [...squad])
        newSquads[editingSquad].push(character)
        return newSquads
      })
      setRoster(prev => prev.filter(c => c.id !== character.id))
    }
  }

  const handleRemoveCharacterFromSquad = (
    character: Character,
    squadIndex: number
  ) => {
    setSquads(prev => {
      const newSquad = prev[squadIndex].filter(c => c.id !== character.id)
      const newSquads = prev.map((squad, index) =>
        index === squadIndex ? newSquad : squad
      )

      return newSquads
    })
    setRoster(prev => [...prev, character])
  }

  const handleDeleteSquad = (squadIndex: number) => {
    squads[squadIndex].forEach(character =>
      handleRemoveCharacterFromSquad(character, squadIndex)
    )
    setSquads(prev => prev.filter((_, index) => index !== squadIndex))
  }

  const handleEditSquad = (squadIndex: number) => {
    setEditingSquad(prev => (prev === squadIndex ? undefined : squadIndex))
  }

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
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingRight: 1,
          paddingTop: 1
        }}
      >
        <Grid2 container spacing={2} size={12}>
          <Grid2 size={6}>
            <SortBy
              handleSortBy={(e: SelectChangeEvent<string>) =>
                setSortBy(e.target.value)
              }
              sortBy={sortBy}
            />
          </Grid2>
          <Grid2 size={6}>
            <SearchInput
              handleSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </Grid2>
        </Grid2>
        {roster
          .filter(({ name }) =>
            name.toLowerCase().includes(search?.toLowerCase())
          )
          .sort(sortFns[sortBy])
          .map(character => (
            <Grid2 key={character.id} size={6}>
              <CharacterCard
                key={character.id}
                character={character}
                onAdd={() => handleAddCharacterToSquad(character)}
              />
            </Grid2>
          ))}
      </Grid2>
      <Grid2 container size={8} paddingTop={1} alignContent='start'>
        <Grid2 size={12}>
          <Box display='flex' justifyContent='center'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleNewSquad}
            >
              New Squad
            </Button>
          </Box>
        </Grid2>
        {squads.map((squad, index) => (
          <Grid2 size={12} key={index}>
            <Box display='flex' flexDirection='column' key={index}>
              <Box
                display='flex'
                flexDirection='column'
                gap={2}
                padding={1}
                sx={{ minHeight: 100, border: "1px solid grey" }}
              >
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 2
                  }}
                >
                  {squad.map(character => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      onRemove={() =>
                        handleRemoveCharacterFromSquad(character, index)
                      }
                    />
                  ))}
                </Box>
                <Box
                  display='flex'
                  justifyContent='center'
                  marginTop='auto'
                  gap={2}
                >
                  <Button
                    onClick={() => handleEditSquad(index)}
                    variant='contained'
                    color={editingSquad === index ? "warning" : "primary"}
                  >
                    {editingSquad === index ? "Editing" : "Edit"}
                  </Button>
                  <Button
                    onClick={() => handleDeleteSquad(index)}
                    variant='contained'
                    color='error'
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  )
}

const SortBy = ({ sortBy, handleSortBy }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='sort-select'>Sort</InputLabel>
      <Select
        labelId='sort-select'
        id='sort-select'
        value={sortBy}
        label='Sort'
        onChange={handleSortBy}
      >
        <MenuItem value='power-desc'>Power DESC</MenuItem>
        <MenuItem value='power-asc'>Power ASC</MenuItem>
        <MenuItem value='geartier-desc'>Gear Tear DESC</MenuItem>
        <MenuItem value='geartier-asc'>Gear Tear ASC</MenuItem>
        <MenuItem value='name-desc'>Name DESC</MenuItem>
        <MenuItem value='name-asc'>Name ASC</MenuItem>
      </Select>
    </FormControl>
  )
}

const SearchInput = ({ handleSearch }) => {
  return (
    <TextField
      label='Search'
      onChange={handleSearch}
      id='search-input'
      fullWidth
    />
  )
}

const sortByPowerDesc = (a: Character, b: Character) => {
  return b.power - a.power
}

const sortByPowerAsc = (a: Character, b: Character) => {
  return a.power - b.power
}

const sortByGearTierAsc = (a: Character, b: Character) => {
  return a.gearTier - b.gearTier
}

const sortByGearTierDesc = (a: Character, b: Character) => {
  return b.gearTier - a.gearTier
}

const sortByNameAsc = (a: Character, b: Character) => {
  return a.name.localeCompare(b.name)
}

const sortByNameDesc = (a: Character, b: Character) => {
  return b.name.localeCompare(a.name)
}

const sortFns = {
  "power-asc": sortByPowerAsc,
  "power-desc": sortByPowerDesc,
  "geartier-asc": sortByGearTierAsc,
  "geartier-desc": sortByGearTierDesc,
  "name-asc": sortByNameAsc,
  "name-desc": sortByNameDesc
}

export default MyRoster
