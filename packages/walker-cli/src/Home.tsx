function Home() {
  return (
    <box
      style={{
        width: "100%",
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <box
        style={{
          width: 8,
          height: 4,
          backgroundColor: "FFF",
        }}
      ></box>
      <ascii-font font="tiny" text="Walker"></ascii-font>
    </box>
  );
}

export default Home;
