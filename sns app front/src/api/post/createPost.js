export const createPost = async ({ content, image }) => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) {
        formData.append("image", image); // 파일이 있을 때만 추가
      }
  
      return await api.post(API_URL, formData); // ✅ headers 설정 없이 FormData 전송
    } catch (error) {
      console.error("게시물 작성 실패:", error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("게시물 작성에 실패했습니다.");
      }
    }
  };
  