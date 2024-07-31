export async function fetchClientInfoById({ id }) {
  try {
    const response = await fetch(`http://localhost:3333/clients`);

    const data = await response.json();

    // Find the client with the id
    const client = data.find((client) => client.id === id);

    return client;
  } catch (error) {
    console.error("Error fetching client info", error);
    alert("Não foi possível carregar as informações do cliente");
  }
}
