 // Display Player name above character
 export async function getOtherPlayers() {
    let otherPlayers = [];
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