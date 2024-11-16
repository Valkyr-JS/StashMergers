/** Fetch data from Stash via GQL. */
export const fetchData = async (query: string, variables?: object) => {
  try {
    const res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};
