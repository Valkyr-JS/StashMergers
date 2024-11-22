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

/** Fetch all required data for a performer. */
export const fetchPerformerData = async (
  id: Performer["id"]
): Promise<Performer | undefined> => {
  const query = `query FetchSelectedPerformer {
    findPerformer(id: ${id}) {
      id
      alias_list
      birthdate
      career_length
      circumcised
      country
      death_date
      details
      disambiguation
      ethnicity
      eye_color
      fake_tits
      gender
      hair_color
      height_cm
      ignore_auto_tag
      image_path
      name
      measurements
      penis_length
      piercings
      scenes { id }
      stash_ids { endpoint stash_id }
      tags { __typename aliases description favorite id image_path name parents { id name } }
      tattoos
      urls
      weight
    }
  }`;

  const req = await fetchData<{ data: { findPerformer: Performer } }>(query);
  return req?.data.findPerformer;
};
