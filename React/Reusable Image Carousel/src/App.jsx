import Hello from "./components/Hello";

function App() {
  const images = [
    "https://picsum.photos/id/1015/800/400",
    "https://picsum.photos/id/1016/800/400",
    "https://picsum.photos/id/1018/800/400",
    "https://picsum.photos/id/1020/800/400",
  ];

  return (
    <div>
      <h1>Image Carousel</h1>
      <Hello images={images} />
    </div>
  );
}

export default App;