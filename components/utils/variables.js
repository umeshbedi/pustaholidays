export function mobile() {
    if (typeof window !== "undefined") {
      const { innerWidth: width } = window;
      if (width < 991) {
        return true
      } else {
        return false
      }
    }
  
  }