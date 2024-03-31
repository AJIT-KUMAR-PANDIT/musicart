export const getToken = () => {
  const token = localStorage.getItem("TOKEN");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};
