const MyRosterButton = () => {
  const handleClick = async () => {
    const resp = await fetch("http://localhost:5001/my-roster", {
      credentials: "include"
    })
    console.log(resp.status)
    const data = await resp.json()
    console.log("🚀 data:", data)
  }

  return <button onClick={handleClick}>My Roster</button>
}

export default MyRosterButton
