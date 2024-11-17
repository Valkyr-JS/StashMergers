/** Fetch data from Stash via GQL. */
export const fetchData = async <T>(query: string, variables?: object) => {
  try {
    const res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    return (await res.json()) as T;
  } catch (err) {
    return console.log(err);
  }
};
