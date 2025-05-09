const API_URL = "http://localhost:8081/api/comments";

export const addComment = async (postId, commentData) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });
  return response.json();
};

export const getComments = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`);
  return response.json();
};
