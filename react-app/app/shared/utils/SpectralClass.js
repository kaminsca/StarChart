const spectralColors = {
    O: "#9bb0ff",
    B: "#aabfff",
    A: "#cad7ff",
    F: "#f8f7ff",
    G: "#fff4ea",
    K: "#ffd2a1",
    M: "#ffcc6f",
    W: "#ffffff",
  };

  export const getSpectralClass = (fullSpectralType) => {
    if (!fullSpectralType) {
      return spectralColors["G"];
    }

    return spectralColors[fullSpectralType[0]] || spectralColors["G"];
  };