export const getSubs = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/getsubs?url=${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        resolve(json);
      })
      .catch((error) => {
        console.log(error);
        reject(new Error("Get Subs failed"));
      });
  });
};
