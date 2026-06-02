export default function OverlayLayout({ children }) {
  return (
    <html>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { background: transparent !important; }
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
          @font-face {
            font-family: "DarkestSaturday";
            src: url("/fonts/DarkestSaturday.woff2") format("woff2");
            font-display: swap;
          }
        `}</style>
      </head>
      <body style={{ background: "transparent" }}>
        {children}
      </body>
    </html>
  );
}
