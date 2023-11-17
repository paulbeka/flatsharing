export const Task = (tname, tdescription, ttype, tflatmates, ticon) => {
  const name = tname;
  const description = tdescription;
  const type = ttype;
  const flatmates = tflatmates;
  const icon = ticon;
  return {
    name, description, type, flatmates, icon
  }
}

