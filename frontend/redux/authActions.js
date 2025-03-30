export const fetchUserData = async (token, userId, dispatch, setUser) => {
  try {
    const response = await fetch("http://localhost:5000/auth/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "userid": userId,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch user data");
    }

    dispatch(setUser({ user: data, token }));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
