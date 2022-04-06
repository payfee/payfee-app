export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = function() {
      resolve();
    };

    script.src = src;

    document.head.appendChild(script);
  });
}
