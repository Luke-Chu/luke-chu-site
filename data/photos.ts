export type Photo = {
  id: number;
  title: string;
  category: string;
  image: string;
};

export const photos: Photo[] = [
  { id: 1, title: "山脊线", category: "风光", image: "/photos/photo1.jpg" },
  { id: 2, title: "夜幕城市", category: "城市", image: "/photos/photo2.jpg" },
  { id: 3, title: "海风", category: "海景", image: "/photos/photo3.jpg" },
  { id: 4, title: "旧街", category: "街拍", image: "/photos/photo4.jpg" },
  { id: 5, title: "静湖", category: "自然", image: "/photos/photo5.jpg" },
  { id: 6, title: "归途列车", category: "旅行", image: "/photos/photo6.jpg" },
  { id: 7, title: "晨光", category: "人文", image: "/photos/photo7.jpg" },
];
