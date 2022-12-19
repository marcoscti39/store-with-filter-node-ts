interface ObjectQueryTypes {
  name?: string;
  price?: string;
  sortby?: string;
  company?: string;
}

export const insertSearchParamOnUrl = (
  previousParams: URLSearchParams,
  insertKey: string,
  insertValue: string
) => {
  const newSearchParam = { [insertKey]: insertValue };
  const queryEntries = previousParams.entries();
  const objectQuery: ObjectQueryTypes = {};

  const populateObjectQuery = () => {
    const queryData = queryEntries.next();
    if (queryData.value)
      objectQuery[queryData.value[0] as keyof ObjectQueryTypes] =
        queryData.value[1];
    if (!queryData.done) populateObjectQuery();
  };
  populateObjectQuery();
  return { ...objectQuery, ...newSearchParam };
};
