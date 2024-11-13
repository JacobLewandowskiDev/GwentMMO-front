// List of other players on the server
let otherPlayers = [];

// Get a list of all Players on the server.
 export async function getOtherPlayers() {
    try {
      const response = await fetch("http://localhost:8080/game", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

      if (!response.ok) {
        throw new Error(`Error fetching players: ${response.statusText}`);
      }

      // Process the JSON data
      otherPlayers = await response.json();
      
      return otherPlayers; // Or return if you're calling this from another function 
    } catch (error) {
      console.error("Error:", error);
    }
  }

