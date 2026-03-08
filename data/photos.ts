export type Photo = {
  id: number;
  title: string;
  category: string;
  image: string;
};

export const photos: Photo[] = [
  { id: 1, title: "Mountain", category: "Landscape", image: "/photos/photo1.jpg" },
  { id: 2, title: "City Light", category: "Urban", image: "/photos/photo2.jpg" },
  { id: 3, title: "Sea Breeze", category: "Seascape", image: "/photos/photo3.jpg" },
  { id: 4, title: "Old Street", category: "Street", image: "/photos/photo4.jpg" },
  { id: 5, title: "Quiet Lake", category: "Nature", image: "/photos/photo5.jpg" },
  { id: 6, title: "Night Train", category: "Travel", image: "/photos/photo6.jpg" },
];
